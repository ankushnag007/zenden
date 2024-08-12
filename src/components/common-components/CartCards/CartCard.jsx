import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { CartContext } from '../../../context'; // Update with correct path to CartContext

const CartCard = ({ item }) => {
    const { updateCartItem, deletCartItem } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState(item.selectedColor);
    const [selectedSize, setSelectedSize] = useState(item.selectedSize);
    const [quantity, setQuantity] = useState(item.quantity);

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateCartItem({ ...item, quantity: newQuantity });
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCartItem({ ...item, quantity: newQuantity });
        }
    };

    const changeColor = (color) => {
        setSelectedColor(color);
        updateCartItem({ ...item, selectedColor: color });
    };

    const changeSize = (size) => {
        setSelectedSize(size);
        updateCartItem({ ...item, selectedSize: size });
    };

    const confirmDelete = () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item from your cart?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deletCartItem(item),
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={[styles.card, { paddingTop: 10 }]}>
            <Image source={{ uri: item?.image }} style={styles.itemImage} />
            <View style={styles.textContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>

                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionText}>
                        Color: {selectedColor}, Size: {selectedSize}, Qty: {quantity}
                    </Text>
                </View>

                <View style={styles.colorOptions}>
                    {['Red', 'Blue', 'Green'].map(color => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.colorButton,
                                { backgroundColor: color.toLowerCase() },
                                selectedColor === color && styles.colorButtonSelected
                            ]}
                            onPress={() => changeColor(color)}
                        >
                            {selectedColor === color && <Text style={styles.selectedText}>✓</Text>}
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.sizeOptions}>
                    {['S', 'M', 'L', 'XL'].map(size => (
                        <TouchableOpacity
                            key={size}
                            style={[
                                styles.sizeButton,
                                selectedSize === size && styles.sizeButtonSelected
                            ]}
                            onPress={() => changeSize(size)}
                        >
                            <Text style={[
                                styles.sizeText,
                                selectedSize === size && styles.sizeTextSelected
                            ]}>
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.trashIcon} onPress={confirmDelete}>
                <FontAwesome6 name={'trash'} color={'red'} size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default CartCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        paddingTop: 10,
        position: 'relative',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
        marginTop: 8,
    },
    selectionContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    selectionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    colorOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    colorButton: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizeOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    sizeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
    },
    sizeButtonSelected: {
        backgroundColor: '#000',
    },
    sizeText: {
        fontSize: 16,
        color: '#333',
    },
    sizeTextSelected: {
        color: '#fff',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
        color: '#333',
    },
    trashIcon: {
        position: 'absolute',
        top: 10,
        right: 5,
    },
});

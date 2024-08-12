import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { CartContext } from '../../context';

const ProductsDetails = ({ navigation }) => {
    const route = useRoute();
    const { itemId } = route.params;
    const { addToCarts } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState('Red');
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);  // State for the modal

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [itemId]);

    if (!product) {
        return <Text>Loading...</Text>;
    }

    const handleAddToCart = () => {
        const productWithDetails = {
            ...product,
            selectedColor,
            selectedSize,
            quantity
        };

        addToCarts(productWithDetails);
        console.log('Added to cart:', productWithDetails);

        // Show the modal
        setModalVisible(true);

        // Hide the modal after 2 seconds
        setTimeout(() => {
            setModalVisible(false);
        }, 2000);
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>

            <View style={styles.optionContainer}>
                <Text style={styles.label}>Choose Color:</Text>
                <View style={styles.colorOptions}>
                    {['Red', 'Blue', 'Green'].map((color, index) => (
                        <TouchableOpacity
                            key={`color-${index}`}  // Ensure key is unique
                            style={[
                                styles.colorButton,
                                { backgroundColor: color.toLowerCase() },
                                selectedColor === color && styles.colorButtonSelected
                            ]}
                            onPress={() => setSelectedColor(color)}
                        >
                            {selectedColor === color && <Text style={styles.selectedText}>✓</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.label}>Choose Size:</Text>
                <View style={styles.sizeOptions}>
                    {['S', 'M', 'L', 'XL'].map((size, index) => (
                        <TouchableOpacity
                            key={`size-${index}`}  // Ensure key is unique
                            style={[
                                styles.sizeButton,
                                selectedSize === size && styles.sizeButtonSelected
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text style={styles.sizeButtonText}>{size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.quantityContainer}>
                <Text style={styles.label}>Quantity:</Text>
                <View style={styles.quantityControls}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={decreaseQuantity}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={increaseQuantity}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>

            {/* Modal for added to cart message */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Added to Cart!</Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default ProductsDetails;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    price: {
        fontSize: 20,
        color: '#333',
        marginVertical: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginVertical: 8,
    },
    optionContainer: {
        marginVertical: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    colorOptions: {
        flexDirection: 'row',
        marginTop: 10,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorButtonSelected: {
        borderWidth: 2,
        borderColor: '#000',
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sizeOptions: {
        flexDirection: 'row',
        marginTop: 10,
        flexWrap: 'wrap',
    },
    sizeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizeButtonSelected: {
        backgroundColor: '#FF5722',
        borderColor: '#FF5722',
    },
    sizeButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    quantityContainer: {
        marginVertical: 16,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#FF5722',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FF5722',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 200,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

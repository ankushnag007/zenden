import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import HeaderScreen from '../../components/unique-components/MainScreen/HeaderScreen';
import CartCard from '../../components/common-components/CartCards/CartCard';
import { CartContext } from '../../context';

const CartScreen = () => {
    const { carts, totalPrice,deletCartItem } = useContext(CartContext);
    console.log(carts, "carts in CartScreen");
    
    const [shipping, setShipping] = useState(5.00);  // Example shipping cost

    const grandTotal = totalPrice + shipping;

    const handleOrderPress = () => {
        // Handle the order action
        console.log('Order button pressed');
    };

    return (
        <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
            <HeaderScreen isCart={true} />
            <FlatList
                data={carts}
                keyExtractor={(item) => item.id.toString()} // Ensure unique key
                renderItem={({ item }) => <CartCard item={item} deletCartItem={deletCartItem} />}
                ListHeaderComponent={
                    <View style={styles.cartContainer}>
                        {/* Other content can go here if needed */}
                    </View>
                }
                ListFooterComponent={
                    <View style={styles.summaryContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Total:</Text>
                            <Text style={styles.value}>${totalPrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Shipping:</Text>
                            <Text style={styles.value}>${shipping.toFixed(2)}</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.row}>
                            <Text style={styles.label}>Grand Total:</Text>
                            <Text style={styles.grandTotal}>${grandTotal.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.orderButton} onPress={handleOrderPress}>
                            <Text style={styles.orderButtonText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </LinearGradient>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    cartContainer: {
        paddingTop: 30,
    },
    summaryContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#888',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
    },
    grandTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6F61',
    },
    orderButton: {
        marginTop: 30,
        paddingVertical: 15,
        backgroundColor: '#FF6F61',
        borderRadius: 8,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

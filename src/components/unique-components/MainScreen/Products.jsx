import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Products = ({ item, handleLike }) => {
    const navigation = useNavigation();

    // Function to handle card press for navigation
    const handleCardPress = () => {
        navigation.navigate('ProductsDetails', { itemId: item.id });
    };

    return (
        <View style={styles.container}>
            {/* TouchableOpacity for card navigation */}
            <TouchableOpacity onPress={handleCardPress} style={styles.card}>
                <Image
                    source={{ uri: item?.image }}
                    style={styles.coverImage}
                />
                <View style={styles.content}>
                    <Text style={styles.itemName}>
                        {item.title ? `${item.title.slice(0, 30)}...` : item.title}
                    </Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
            </TouchableOpacity>
            
            {/* Separate TouchableOpacity for like button */}
            <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.fav}>
                <MaterialCommunityIcons
                    name={'heart'}
                    size={30}
                    color={item.isFav ? 'red' : 'grey'}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Products;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    card: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
    },
    coverImage: {
        height: 256,
        borderRadius: 20,
        width: '100%',
        resizeMode: 'contain',
    },
    itemName: {
        fontSize: 18,
        color: '#444444',
        fontWeight: '600',
    },
    itemPrice: {
        fontSize: 18,
        color: '#9c9c9c',
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    fav: {
        height: 34,
        width: 34,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        right: 10,
    },
});

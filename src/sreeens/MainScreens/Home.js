import { FlatList, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/unique-components/MainScreen/HeaderScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../../components/unique-components/MainScreen/Category';
import Products from '../../components/unique-components/MainScreen/Products';

const Home = () => {
  const categories = ['All', "men's clothing", "jewelery", "electronics", "women's clothing"];
  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const transformedData = data.map(product => ({
          ...product,
          isFav: false,
        }));
        setProductsData(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setLoadingCategory(true);
    setSelectedCategory(category);

    setTimeout(() => {
      setLoadingCategory(false);
    }, 1000);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredProducts = productsData
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  const handleLike = (id) => {
    setProductsData(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, isFav: !product.isFav } : product
      )
    );
  };

  const renderProduct = ({ item }) => (
    <Products
      item={item}
      handleLike={handleLike}
    />
  );

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.linearGradient}>
      <Header />

      <View style={{ padding: 10, flexDirection: 'row', paddingBottom: 50 }}>
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.Header}>Shop more</Text>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Fontisto name={'search'} size={25} color={'#C0C0C0'} />
                </View>
                <TextInput
                  style={styles.TextInput}
                  placeholder='Search'
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
              </View>
              <View style={{ padding: 10 }}>
                <FlatList
                  data={categories}
                  renderItem={({ item }) => (
                    <Category
                      item={item}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={handleCategoryChange}
                    />
                  )}
                  keyExtractor={(item) => item}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </>
          }
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color="#FF6F61" style={styles.loader} />
            ) : (
              <Text style={styles.noProducts}>No products available</Text>
            )
          }
        />
        {loadingCategory && (
          <ActivityIndicator size="large" color="#FF6F61" style={styles.categoryLoader} />
        )}
      </View>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  Header: {
    fontSize: 28,
    color: '#000000',
    backgroundColor: 'transparent',
    paddingLeft: 20,
    marginTop: 25,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  TextInput: {
    flex: 1,
    maxWidth: 250,
    paddingHorizontal: 10,
  },
  iconContainer: {
    marginHorizontal: 20,
  },
  loader: {
    marginTop: 20,
    alignSelf: 'center',
  },
  noProducts: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  categoryLoader: {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

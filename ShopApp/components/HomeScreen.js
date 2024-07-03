import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: '2WIN', price: 120, description: 'reversible angora cardigan', image: require('../assets/dress1.png') },
  { id: '2', name: 'Iame', price: 120, description: 'Reversible angora cardigan', image: require('../assets/dress2.png') },
  { id: '3', name: 'Clutch Wear', price: 120, description: 'reversible angora cardigan', image: require('../assets/dress3.png') },
  { id: '4', name: 'Lamerei', price: 120, description: 'reversible angora cardigan', image: require('../assets/dress4.png') },
  { id: '5', name: 'Office Wear', price: 120, description: 'Office wear for you office', image: require('../assets/dress5.png') },
  { id: '6', name: 'Black', price: 120, description: 'reversible angora cardigan', image: require('../assets/dress6.png') },
  { id: '7', name: '2WIN', price: 120, description: 'Office wear for you office', image: require('../assets/dress7.png') },
  { id: '8', name: 'Black', price: 120, description: 'reversible angora cardigan', image: require('../assets/dress4.png') },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Menu.png')} style={styles.icon} />
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <Image source={require('../assets/Search.png')} style={styles.icon} />
          <Image source={require('../assets/shoppingBag.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.ourStory}>OUR STORY</Text>
        <View style={styles.subHeaderIcons}>
          <Image source={require('../assets/Listview.png')} style={styles.icon} />
          <Image source={require('../assets/Filter.png')} style={styles.icon} />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 50,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  ourStory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeaderIcons: {
    flexDirection: 'row',
  },
  product: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    marginVertical: 8,
  },
  addIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default HomeScreen;

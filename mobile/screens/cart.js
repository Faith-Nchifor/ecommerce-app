import React, { useContext, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Text } from '@rneui/base';
import styles from '../styles/style';
import CartContext from '../utils/cartContext';
import { MakeRequest } from '../utils/makeRequest';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const getCart =()=>{
    MakeRequest({
        
        // method:'get'
    })
  }
  useEffect(()=>{
    console.log('cart:',cart);
  },[])

  const renderItem = ({ item }) => (
    <Card>
      <Text>{item.title}</Text>
      <Text>$ {item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Button title="Remove" onPress={() => removeFromCart(item.id)} />
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Clear Cart" onPress={clearCart} />
    </View>
  );
};

export default Cart;

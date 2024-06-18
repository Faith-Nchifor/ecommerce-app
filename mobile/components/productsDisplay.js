import { useNavigation } from "@react-navigation/native";
import { Button, Card, Text } from "@rneui/base";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import styles from "../styles/style";
import { useContext } from "react";
import CartContext from "../utils/cartContext";

function ProductsDisplay({products}) {
    const navigation = useNavigation()
    const { addToCart,cart,removeFromCart } = useContext(CartContext);
    // const isCartItem = cart.items.filter(item=>item.id==)
    // //
    return ( 
        <FlatList
                    data={products}
                    initialNumToRender={20}
                    keyExtractor={(item) => item.id}
                    //FooterComponent={()=><ActivityIndicator size={74} color={'blue'} />}
                    renderItem={({ item }) => {
                    const isCartItem = cart.items.filter(cartItem=>cartItem.id==item.id)

                        return(

                        <Pressable
                            onPress={() => navigation.navigate('productDetail',
                                {
                                    product: item
                                })}
                        >
                            <Card>
                                <Card.Image
                                    source={{ uri: item.images[0] }}
                                    PlaceholderContent={<ActivityIndicator />}
                                    alt="image"
                                    containerStyle={{ width: '50%', alignSelf: 'center' }}
                                />
                                <Card.Title>{item.title}</Card.Title>
                                <Text style={styles.price}>${item.price}</Text>
                                {
                                    isCartItem.length>0? <Button 
                                    title={'Remove from Cart'} 
                                    buttonStyle={styles.cartBtn} 
                                    color={'blue'}
                                    onPress={()=>{
                                        removeFromCart(item.id)
                                    }}
                                     />:
                                     <Button 
                                     title={'Add to Cart'} 
                                     buttonStyle={styles.cartBtn} 
                                     color={'blue'}
                                     onPress={()=>{
                                         addToCart(item)
                                     }}
                                      />

                                }
                               
                            </Card>
                            <Card.Divider />
                        </Pressable>


                    )}}
                />
     );
}

export default ProductsDisplay;
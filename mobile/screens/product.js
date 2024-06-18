import { View } from "react-native";
import styles from "../styles/style";
import { useEffect, useState } from "react";
import { Button, Card, Icon, Text } from "@rneui/base";
import { ActivityIndicator } from "react-native";

function ProductDetails({route,navigation}) {
    const [productDetails,setProductDetails] = useState(route.params.product || {})

    useEffect(()=>{
        
    },[])
    if(!route.params.product) {
        return navigation.goBack()
    }
    return ( 
        <View style={styles.container}>
            <Card.Image
                                    source={{ uri: productDetails.images[0] }}
                                    PlaceholderContent={<ActivityIndicator />}
                                    alt="image"
                                    containerStyle={styles.productImg}
                                />
            <Text style={styles.productTitle}>{productDetails.title}</Text>
            
            {/* <Text>{productDetails.discountPercentage}</Text> */}
            <Text style={styles.price}>$ {productDetails.price}</Text>
            <Button 
            title='Add to Cart'
             buttonStyle={styles.cartBtn} 
            icon={()=><Icon 
            name="shoppingcart" 
            type='antdesign' 
            color={'white'}/>}
            iconPosition="right"
            />
        </View>
     );
}

export default ProductDetails;
import { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import styles from "../styles/style";
import { Card } from "@rneui/base";
import { MakeRequest } from "../utils/makeRequest";

const categoriesUrl = process.env.GET_CATEGORIES_LIST
function ProductCategories({route,navigation}) {
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)
    async function getCategories() {


        const categoryConfig = {
            url: categoriesUrl,
            method: 'get',
            
        }
        setLoading(true)
        MakeRequest(categoryConfig).then(
            data => {

                if (data) {
                    setCategories(data)
                }
                console.log(data);
            }
        ).catch(e => {
            console.log(e);
        }).finally(() => setLoading(false))
    }
    useEffect(()=>{
      getCategories()  
    },[])
    return ( 
        <View style={styles.container}>
            {categories.length>0 && (
                 <FlatList
                 data={categories}
                 initialNumToRender={20}
                 keyExtractor={(item,index) => index}
                 renderItem={({ item }) => (
                     <Pressable
                     onPress={() => navigation.navigate('products',
                     {
                         category: item
                     })}
                     >
                         <Card>
                             
                             <Card.Title>{item}</Card.Title>
                             
                         </Card>
                    
                     </Pressable>


                 )}
             />
            ) }
        </View>
     );
}

export default ProductCategories;
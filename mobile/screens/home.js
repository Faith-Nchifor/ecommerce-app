import { ActivityIndicator, Dimensions, FlatList, Pressable, View } from "react-native";
import styles from "../styles/style";
import { useEffect, useState } from "react";
import { MakeRequest, MakeTwoRequest } from "../utils/makeRequest";
import Loading from "../components/loading";
import { Card, Icon, Text } from "@rneui/base";
import axios from "axios";
import Carousel from "react-native-reanimated-carousel";
import ProductDisplay from "../components/productsDisplay";
import ProductsDisplay from "../components/productsDisplay";


const productsUrl = process.env.GET_PRODUCTS
const getCategoriesUrl = process.env.GET_CATEGORIES

function Home({ navigation }) {
    const [products, setProducts] = useState([])

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [categoryLoading, setCategoryLoading] = useState(false)
    async function getProducts() {
        setLoading(true)
        const config = {
            url: productsUrl,
            method: 'get',
            params: {
                limit: 10
            }
        }
        MakeRequest(config).then(
            data => {
                // console.log(data); 
                if (data) {
                    setProducts(data.products)
                    const first = data.products[0]
                    console.log(Object.keys(first));
                    console.log('----------');
                    console.log(first.images);
                }
            }
        ).catch(e => {
            console.log(e);
        }).finally(() => setLoading(false))

    }

    async function getCategoriesProducts() {


        const categoryConfig = {
            url: getCategoriesUrl,
            method: 'get',
            params: {
                limit: 5
            }
        }
        setLoading(true)
        MakeRequest(categoryConfig).then(
            data => {

                if (data) {
                    setCategories(data)
                }
            }
        ).catch(e => {
            console.log(e);
        }).finally(() => setLoading(false))
    }
    useEffect(() => {
        console.log('urls:',process.env.GET_PRODUCTS);
        getCategoriesProducts()
        getProducts()
    }, [])
    return (
        <View style={styles.container}>
            <Loading isLoading={loading} />
            {/* display product categories */}
            {categories.length > 0 && (
                <>
                    <Text h3 style={styles.center}>Hot Sales</Text>
                    {/* <Pressable style={{...styles.flexDisplay}} onPress={()=>navigation.navigate('categories')}>

                        <Text>
                            View All Categories

                        </Text>
                        <Icon name="arrow-long-right" type="entypo" />
                    </Pressable> */}
                    <CategoryDisplay categories={categories} navigation={navigation} />

                </>

            )}

            {products.length > 0 && (
               <ProductsDisplay products={products}/>
            )}

        </View>
    );
}


function CategoryDisplay({ categories, navigation }) {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ height: '15%', backgroundColor: 'blue' }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={categories}

                scrollAnimationDuration={2000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <Pressable onPress={()=>navigation.navigate('products',{category:item})} >
                    <Card
                        style={{
                            // flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                            // alignContent:'center'
                        }}
                    >

                        <Card.Title style={{ textAlign: 'center' }}>{item.name}</Card.Title>
                    </Card>
                    </Pressable>
                )}
            />
        </View>
    );
}
export default Home;
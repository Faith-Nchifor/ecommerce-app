import { useEffect, useState } from "react";
import ProductsDisplay from "../components/productsDisplay";
import Loading from "../components/loading";
import { MakeRequest } from "../utils/makeRequest";
import { Text } from "@rneui/base";
import styles from "../styles/style";

function AllProducts({navigation,route}) {
let categoryProductsUrl ;
//= route.params.category?`https://dummyjson.com/products/category/${route.params.category}`:

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState()
    async function getProducts(url) {
        console.log(url);
        setLoading(true)
        const config = {
            url: url,
            method: 'get',
            params: {
                // limit: 10
            }
        }
        MakeRequest(config).then(
            data => {
                // console.log(data); 
                if (data) {
                    setProducts(data.products)
                    // const first = data.products[0]
                   
                }
            }
        ).catch(e => {
            console.log(e);
        }).finally(() => setLoading(false))

    }

    useEffect(()=>{
        if(route.params){
            if(route.params.category){
                categoryProductsUrl=`${process.env.GET_PRODUCTS_BY_CAT}/${route.params.category}`
                setCategory(route.params.category)
            }
            
           
        }
        else categoryProductsUrl= process.env.GET_PRODUCTS;
        getProducts(categoryProductsUrl)
    },[route.params])
    // if(!route.params.category) return navigation.goBack();
    
    return (  
    <>
    {loading && <Loading isLoading={loading}/>}

    {products.length> 0 && (
        <>
        {category && 
        <Text h3 style={styles.center}>{category} </Text>}
        <ProductsDisplay products={products} /></>
    )  
    }
    </>
    );
}

export default AllProducts;
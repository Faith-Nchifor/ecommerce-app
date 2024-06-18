import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayProducts from '@/components/displayProducts';

const ProductsPage = () => {
    const router = useRouter();
    const [category, setCategory] = useState()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const getProducts = (url) => {
        if (router.query)
            axios.get(url).then(
                resp => {

                    setProducts(resp.data.products)
                })
                .catch(ex => {
                    console.log(ex);
                })
    }
    useEffect(() => {
        let url;
        if (router.query.category) {
            url = `${process.env.NEXT_PUBLIC_GET_PRODUCTS_BY_CAT}/${router.query.category}`

        }
        else {
            url = process.env.NEXT_PUBLIC_GET_PRODUCTS
        }

        getProducts(url)
    }, [router.query])
    return (
        <main className={styles.main}>

            {router.query.category && (<h1>{router.query.category}</h1>)}
            {/* <p>Category: {category}</p> */}
            {loading && <h3>Loading...</h3>}
            <div className='row'>
                <DisplayProducts products={products} />
            </div>
        </main>
    );
};

export default ProductsPage
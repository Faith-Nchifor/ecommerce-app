//get product details on this page
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/styles/Home.module.css'
import { useCart } from '@/context/cartContext';
import RemoveFromCartBtn from '@/components/removeFromCartBtn';
import Add2CartBtn from '@/components/addToCartBtn';


const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;
  const {addToCart,cart,removeFromCart } = useCart();
  const isCartItem = cart.filter(cartItem=>cartItem.id==product.id)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <div>
        <Image
          src={product.images[0]}
          width={200}
          height={200}
          alt={product.title}
        />
        <h1>{product.title}</h1>

        <p>Price: ${product.price}</p>
        <p>In Stock: {product.stock}</p>
        {isCartItem.length>0? 
        <RemoveFromCartBtn action={()=>removeFromCart(product)}/>:
        <Add2CartBtn action={()=>addToCart(product)}/>
        }
        <h4>Description:</h4>
        <p>{product.description}</p>
        

      </div>
    </main>
  );
};

// This function gets called at build time
export async function getStaticPaths() {

  const res = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCTS);
  const products = await res.data.products;


  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));


  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_GET_PRODUCTS}/${params.id}`);
  const product = await res.json();

  return { props: { product } };
}

export default ProductDetails;

//this page displays the cart
import { useCart } from "@/context/cartContext";
import { useEffect } from "react";
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import withAuth from '../components/withAuth';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  useEffect(() => {
    console.log('cart:', cart);

  }, [])
  return (
    <main className={styles.main}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (

            <div className={styles.card} key={item.id}>
              <Image src={item.images[0]} width={100} height={100} alt={item.title} />
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
        </>
      )}
    </main>
  );
};

// export default withAuth(Cart);

export default Cart
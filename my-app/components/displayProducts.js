import { useCart } from "@/context/cartContext";
import Image from "next/image";
import styles from '@/styles/Home.module.css'
import Link from "next/link";
import Add2CartBtn from "./addToCartBtn";
import RemoveFromCartBtn from "./removeFromCartBtn";


export default function DisplayProducts({ products }) {
  const { addToCart, cart, removeFromCart } = useCart();

  return (
    <>
      {products.map(product => {
        const isCartItem = cart.filter(cartItem => cartItem.id == product.id)

        return (
          <div className='  col-10 col-md-4 ' key={product.id}>
            <Link href={`/product/${product.id}`} className="text-decoration-none">
              <Image src={product.images[0]}
                width={100}
                height={100}
                alt={product.title} className="img d-block mx-auto" />
              <p className="text-center">{product.title}</p>
              <p className="text-center">$ {product.price}</p>
            </Link>
            {isCartItem.length > 0 ?
              <RemoveFromCartBtn action={() => removeFromCart(product)} /> :
              <Add2CartBtn action={() => addToCart(product)} />
            }

          </div>

        )
      }
      )}
    </>
  );
}

DisplayProducts;
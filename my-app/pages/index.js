import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import axios from "axios";
import DisplayProducts from "@/components/displayProducts";
import ProductCarousel from "@/components/carousel";

// import { useState } from "react";

export default function Home({ products }) {
  useEffect(() => {}, []);
  return (
    <main className={styles.main}>
      <h2>Hot Sales</h2>
      <ProductCarousel products={products} />
      <div className="row">
        <DisplayProducts products={products} />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const res = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCTS, {
    params: {
      limit: 20,
      select: "title,price,images,id,discountPercentage",
    },
  });
  const products = await res.data.products;
  console.log(products);

  return {
    props: {
      products: products,
    },
  };
}

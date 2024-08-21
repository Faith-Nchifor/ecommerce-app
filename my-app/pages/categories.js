//this page displays product categories
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";

// import { useState } from "react";

export default function Categories({ categories }) {
  useEffect(() => {}, []);
  return (
    <main className={styles.main}>
      <h2>Product Categories</h2>
      <div className="row">
        {categories.map((category) => (
          <div className="col-10 col-md-4 col-lg-3">
            <Link
              className="text-decoration-none"
              href={{ pathname: "/products", query: { category: category } }}
            >
              <div className={styles.category}>
                <p>{category}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const res = await axios.get(process.env.NEXT_PUBLIC_GET_CATEGORIES_LIST, {
    params: {
      limit: 20,
    },
  });
  const categories = await res.data;

  return {
    props: {
      categories: categories,
    },
  };
}

import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from 'components/';

function ProductCarousel({ products }) {
  let sortedProducts = products.sort(
    (a, b) => b.discountPercentage - a.discountPercentage
  );
  sortedProducts = sortedProducts.slice(0, 3);
  return (
    <Carousel>
      {products &&
        sortedProducts.map((product) => (
          <Carousel.Item interval={1500} key={product.id}>
            <Image
              className="w-md-50 "
              src={product.images[0]}
              alt="Image One"
              width={400}
              height={400}
            />
            <Link
              href={`/product/${product.id}`}
              className="text-decoration-none"
            >
              <Carousel.Caption className="bg-dark">
                <div className="d-sm-flex justify-content-center">
                  <p className="me-2">$</p>
                  <p className="text-decoration-line-through text-white-50 ">
                    {product.price}
                  </p>
                  <p className="ms-2">
                    {(
                      product.price -
                      (product.discountPercentage / 100) * product.price
                    ).toFixed(2)}
                  </p>
                </div>
                <p>{product.discountPercentage}% off!</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}

      {/* <Carousel.Item interval={500}> 
      <img 
        className="d-block w-100"
src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
        alt="Image Two"
      /> 
      <Carousel.Caption className='bg-dark'> 
        <h3>Label for second slide</h3> 
        <p>Sample Text for Image Two</p> 
      </Carousel.Caption> 
    </Carousel.Item>  */}
    </Carousel>
  );
}

export default ProductCarousel;

"use client";

import Image from "next/image";
import Link from "next/link";
import layout from "../../../app/layout";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <Link href={`../products/${product.id}`}>
      <div className=" border cursor-pointer rounded-md shadow-md">
        <figure>
          <div className="relative " style={{ paddingBottom: "60%" }}>
            <Image
              src={
                product.image ||
                `https://i.ibb.co/ZGCQxbH/osudpotro-default.webp`
              }
              alt="slide"
              layout="fill"
              objectFit="cover"
              className=" rounded-t-md "
            />
          </div>
        </figure>
        <div className="card-body p-2">
          <h2 className="card-title">{product.cardTitle}</h2>
          <p>
            {product.name} {product.measure}
          </p>
          <p>{product.type} </p>
          <h3>
            Best Price:
            <span className="text-green-500 font-medium">
              Tk.{product.price}
            </span>
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

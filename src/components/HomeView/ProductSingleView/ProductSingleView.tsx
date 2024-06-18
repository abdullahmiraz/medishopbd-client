"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../api";

const ProductSingleView = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products`);
        const filteredProduct = res?.data?.find((p) => p.id === productId);
        console.log(filteredProduct);
        setProduct(filteredProduct);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex flex-col container mx-auto   my-12 px-6 ">
      <div className="">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div
            className="relative  col-span-4"
            style={{ paddingBottom: "60%" }}
          >
            <Image
              src={
                product.image ||
                `https://i.ibb.co/ZGCQxbH/osudpotro-default.webp`
              }
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md border"
            />
          </div>
          <div className="info-table grid grid-cols-10 col-span-8 ">
            <div className="col-span-7">
              <h2 className="font-bold text-2xl mb-4">
                {product.name} {product.measure}
              </h2>
              <p>
                <strong>Type:</strong> {product.type}
              </p>
              <p>
                <strong>Generics:</strong>{" "}
                <span className="font-semibold text-cyan-700">
                  {product.generics}
                </span>
              </p>
              <p>
                <strong>Manufacturer:</strong> {product.manufacturer}
              </p>
              {product?.pack_details ? (
                <div>
                  <strong>Pack Details: </strong>
                  <span>Strip Count: {product.pack_details.strip_count}, </span>
                  <span>
                    Strips in Box: {product.pack_details.strip_in_box}
                  </span>
                </div>
              ) : null}

              <div className="price-view">
                <p>
                  <strong> Best Price*: </strong>{" "}
                  <span className="font-bold  text-2xl">
                    Tk. {product.pack_price}
                  </span>
                </p>
              </div>
            </div>
            <div className="extra-infos col-span-3  px-2">
              {/* Extra information content */}
              <h3 className="font-bold text-lg">Extra Information</h3>
              <p>
                {product.prescription_required ? (
                  <p className="text-red-500 font-bold">
                    Prescription required
                  </p>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="indications">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
        labore fugiat quas ab. Veniam, labore sequi commodi mollitia ipsa vero
        quod sint qui alias velit. Architecto iure, sit inventore totam aut
        autem esse suscipit est vel, vitae dolor commodi odio, optio quasi
        magnam? Obcaecati neque quod numquam quo minima nesciunt.
        <ul>
          {product.usage_details?.indications.subtitles.map(
            (subtitle, index) => (
              <li key={index}>{subtitle}Hi</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductSingleView;

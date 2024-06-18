"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../api";

const ProductSingleView = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [stripCount, setStripCount] = useState(1);

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

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      measure: product.measure,
      stripCount: stripCount,
      pricePerStrip: product.unit_price,
      totalPrice: product.unit_price * stripCount,
    };

    const existingCart =
      JSON.parse(localStorage.getItem("medicine_cart")) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === product.id
    );

    if (existingItemIndex > -1) {
      // Update the existing item's strip count and total price
      existingCart[existingItemIndex].stripCount += stripCount;
      existingCart[existingItemIndex].totalPrice += cartItem.totalPrice;
    } else {
      // Add the new item to the cart
      existingCart.push(cartItem);
    }

    localStorage.setItem("medicine_cart", JSON.stringify(existingCart));
    console.log(`Added ${stripCount} strips of ${product.name} to cart`);
  };

  if (!product) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex flex-col container mx-auto my-12 px-6">
      <div className="">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div
            className="relative col-span-4 min-h-52"
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
          <div className="info-table grid grid-cols-10 col-span-8">
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
                  <strong>
                    Pack Details: <br />{" "}
                  </strong>
                  <span>
                    Per Strip: {product?.pack_details?.strip_unit}{" "}
                    {product?.type}
                    <br />
                  </span>
                  <span>Strips: {product?.pack_details?.strip_in_box}</span>
                </div>
              ) : null}

              <div className="price-view">
                <p>
                  <strong> Best Price*: </strong>{" "}
                  <span className="font-bold text-2xl">
                    Tk. {product.unit_price}
                  </span>{" "}
                  / strip
                </p>
              </div>

              <div className="mt-4">
                <label>
                  <strong>Quantity:</strong> (strips)
                </label>
                <div className="flex items-center text-3xl font-bold">
                  <button
                    className="px-2 py-1 border bg-red-400"
                    onClick={() =>
                      setStripCount(stripCount > 1 ? stripCount - 1 : 1)
                    }
                  >
                    -
                  </button>
                  <span className="px-4">{stripCount}</span>
                  <button
                    className="px-2 py-1 border bg-green-400"
                    onClick={() => setStripCount(stripCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <div className="extra-infos col-span-3 px-2">
              {/* Extra information content */}
              <h3 className="font-bold text-lg underline">Extra Information</h3>
              {product.prescription_required ? (
                <p className="text-red-500 font-bold">Prescription required</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="indications mt-4">
        <h3 className="font-bold text-lg">Usage Indications:</h3>
        <ul>
          {product.usage_details?.indications.subtitles.map(
            (subtitle, index) => (
              <li key={index}>{subtitle}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductSingleView;

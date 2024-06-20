// ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../Dashboard/AdminDash/ProductsList/ProductsList";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border cursor-pointer rounded-md shadow-md">
        <figure className="relative" style={{ paddingBottom: "60%" }}>
          <Image
            src={"https://i.ibb.co/ZGCQxbH/osudpotro-default.webp"}
            alt={product.productName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="text-xl font-bold mb-2">
            {product.productName} {product.measure}
          </h2>
          <p className="text-gray-600 mb-2">{product.productType}</p>
          <div className="flex justify-between mb-2">
            <p>Manufacturer: {product.manufacturer}</p>
            <p>Category: {product.primaryCategory}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>
              Price:{" "}
              <span className="text-green-500 font-medium">
                Tk. {product.pricePerUnit}
              </span>
            </p>
            <p>Stock: {product.availableStock}</p>
          </div>
          <p className="text-sm text-gray-500">
            Expiration Date: {product?.expirationDate.slice(0, 10)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

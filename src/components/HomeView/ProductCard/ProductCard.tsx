import Image from "next/image";
import Link from "next/link";
import { placeholderImage } from "../../../../api";

const ProductCard = ({ product }) => {
  console.log(product);
  const currentDate = JSON.stringify(new Date()).substring(1, 11);
  // console.log(currentDate);
  // console.log(product);
  return product.stockDetails[0].expirationDate >= currentDate ? (
    // return (
    <Link href={`/products/${product._id}`}>
      <div className="flex flex-col border cursor-pointer rounded-md shadow-md overflow-hidden h-full text-sm md:text-base">
        <figure className="relative" style={{ paddingBottom: "60%" }}>
          <Image
            src={`${product?.productImage}` || placeholderImage}
            alt={product?.productName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        </figure>
        <div className="card-body p-4 flex justify-between flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2">
            {product?.productName} {product?.measure}
          </h2>
          <div>
            <p className="text-gray-600 mb-2">{product?.productType}</p>

            <div className="flex justify-between mb-2">
              <p>
                Price:{" "}
                <span className="text-green-500 font-medium">
                  Tk. {product?.pricePerUnit}
                </span>
              </p>
              {/* <p>Stock: {product?.availableStock}</p> */}
              <p>Date: {product?.expirationDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : // );
  null;
};

export default ProductCard;

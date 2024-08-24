import Image from "next/image";
import Link from "next/link";
import { placeholderImage } from "../../../../api";



const ProductCard = ({ product }: any) => {
  const currentDate = JSON.stringify(new Date()).substring(1, 11);

  const productUrl = `/products/${product?.productCode}/?pid=${product?._id}`;

  return product?.stockDetails[product?.stockDetails.length - 1]
    ?.expirationDate >= currentDate ? (
    <Link href={productUrl}>
      <div className="flex flex-col border cursor-pointer rounded-md shadow-md group h-full text-sm md:text-base">
        <div className="overflow-hidden">
          <Image
            src={`${product?.productImage}` || placeholderImage}
            alt={product?.productName}
            width={200}
            height={200}
            className="rounded-t-md w-full h-52 object-cover group-hover:scale-125 transition-all duration-500"
          />
        </div>

        <div className="card-body p-4 flex justify-between flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2">
            {product?.productName} {product?.measure}
          </h2>
          <div>
            <p className="text-gray-600 mb-2">{product?.productType}</p>

            <div className="flex flex-col justify-between mb-2">
              <p>
                Price:{" "}
                <span className="text-green-500 font-medium">
                  Tk. {product?.pricePerUnit}
                </span>
              </p>
              {/* <p>Stock: {product?.availableStock}</p> */}
              {/* <p>
                Date:{" "}
                {
                  product?.stockDetails[product?.stockDetails.length - 1]
                    ?.expirationDate
                }
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : null;
};

export default ProductCard;

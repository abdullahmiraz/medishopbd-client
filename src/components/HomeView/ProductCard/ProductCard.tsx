import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <Link href={`/products/${product._id}`}>
      <div className="flex flex-col border cursor-pointer rounded-md shadow-md overflow-hidden h-full text-sm md:text-base">
        <figure className="relative" style={{ paddingBottom: "60%" }}>
          <Image
            src={
              `${product?.productImage}` ||
              `https://i.ibb.co/ZGCQxbH/osudpotro-default.webp`
            }
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
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

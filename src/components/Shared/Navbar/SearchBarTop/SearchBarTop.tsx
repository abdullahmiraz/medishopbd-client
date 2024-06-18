import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaTruck, FaUserCircle } from "react-icons/fa";

const SearchBarTop = () => {
  return (
    <div className="flex items-center justify-between bg-green-100 px-6 py-4">
      <div className="brand-icon flex items-center gap-2">
        <Image
          src={`https://cdn-icons-png.flaticon.com/512/4599/4599153.png`}
          width={40}
          height={20}
          alt="Brand"
        />
        <p className="text-2xl font-extrabold">MediShopBD</p>
      </div>
      <div className="search-bar">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="user-need-section flex items-center gap-6">
        <div className="track-order  flex  items-center gap-2">
          <div className="track-icon">
            <FaTruck size={40} />
          </div>
          <p>
            Track <br /> Order
          </p>
        </div>
        <Link href={"../cart"}>
          <div className="card-top-nav  w-25 flex  items-center gap-2">
            <div className="card-icon-top">
              <FaCartPlus size={40} />
            </div>
            <p>Cart</p>
          </div>
        </Link>{" "}
        <div className="user-section-top flex items-center gap-2">
          <p className="user-name border-l-4 pl-4 border-cyan-800  ">
            User <br />
            Name
          </p>
          <FaUserCircle size={40} />
        </div>
      </div>
    </div>
  );
};

export default SearchBarTop;

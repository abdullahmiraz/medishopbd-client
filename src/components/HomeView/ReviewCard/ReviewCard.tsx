import Image from "next/image";
import React from "react";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";

const rewardList = [
  {
    cardTitle: "Upload Prescription",
    buttonTitle: "Upload Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "Healthcare Products",
    buttonTitle: "Order Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "Help Line",
    buttonTitle: "Call Now",
    imgLink: "https://loremflickr.com/640/340",
  },
];

const ReviewCard = () => {
  return (
    <>
      <TitleStyle
        title={"MedicShopBD: The Leading Online Medicine Sellers in Bangladesh"}
      />
      <div className="flex flex-wrap gap-6 justify-between items-center px-6">
        {rewardList.map((item, index) => (
          <div
            key={index}
            className="card grow card-compact w-80 bg-base-100 shadow-xl"
          >
            <figure>
              <div
                className="relative w-full"
                style={{ paddingBottom: "36.25%" }}
              >
                <Image
                  src={item.imgLink}
                  alt="slide"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.cardTitle}</h2>
              {/* <p>Dynamic content for each card goes here...</p> */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary">{item.buttonTitle}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewCard;

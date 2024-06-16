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
        title={"MedicShopBD: Services"}
      />
      <div className="mt-6 flex  flex-wrap gap-6 justify-between items-center px-6">
        {rewardList.map((item, index) => (
          <div
            key={index}
            className="  grow marker:  flex  w-80 bg-base-100 shadow-xl"
          >
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
            <div className="card-body flex flex-col items-center justify-center text-center">
              <h2 className="card-title">{item.cardTitle}</h2>
              {/* <p>Dynamic content for each card goes here...</p> */}
              <div className="card-actions  ">
                <button className="btn btn-warning p-2">
                  {item.buttonTitle}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewCard;

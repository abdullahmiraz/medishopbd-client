import Image from "next/image";
import React from "react";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";

const rewardList = [
  {
    cardTitle: "COVID Essentials",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Sexual Wellness",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Diabetes Care",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Womens Care",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Natural Food",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Men's Products",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Devices & Equipment",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Herbal",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Family Nutrition",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Health & Beauty",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Laundry & Household",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Surgical",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Health & Dental",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Personal Care Products",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Baby Care",
    imgLink: "https://loremflickr.com/200/200",
  },
  {
    cardTitle: "Beverages",
    imgLink: "https://loremflickr.com/200/200",
  },
];

const CategoryCard = () => {
  return (
    <>
      <TitleStyle
        title={"MedicShopBD: The Leading Online Medicine Sellers in Bangladesh"}
      />
      <div className="flex flex-wrap gap-6 justify-center mt-8 items-center px-6">
        {rewardList.map((item, index) => (
          <div
            key={index}
            className="    card-compact w-40 h-52 bg-base-100 shadow-xl"
          >
            <figure>
              <div
                className="relative w-full"
                style={{ paddingBottom: "85.25%" }}
              >
                <Image
                  src={item.imgLink}
                  alt="slide"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </figure>
            <div className="card-body text-center">
              <h2 className="p-0">{item.cardTitle}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryCard;

import Image from "next/image";
import React from "react";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";
import Link from "next/link";

const categoryList = [
  {
    id: 1,
    cardTitle: "COVID Essentials",
    imgLink: "https://i.ibb.co/G50r0cv/1covid.webp",
  },
  {
    id: 2,
    cardTitle: "Sexual Wellness",
    imgLink: "https://i.ibb.co/t3h5YPQ/2sexual.webp",
  },
  {
    id: 3,
    cardTitle: "Diabetes Care",
    imgLink: "https://i.ibb.co/xmXWZDD/3diabetes.webp",
  },
  {
    id: 4,
    cardTitle: "Womens Care",
    imgLink: "https://i.ibb.co/NW6b54s/4womens.webp",
  },
  {
    id: 5,
    cardTitle: "Natural Food",
    imgLink: "https://i.ibb.co/WPcFMN7/5natural.webp",
  },
  {
    id: 6,
    cardTitle: "Men's Products",
    imgLink: "https://i.ibb.co/MscrMXL/6mens-products.webp",
  },
  {
    id: 7,
    cardTitle: "Devices & Equipment",
    imgLink: "https://i.ibb.co/5vmhFb4/7devices-and.webp",
  },
  {
    id: 8,
    cardTitle: "Herbal",
    imgLink: "https://i.ibb.co/W68VLgT/8herbal.webp",
  },
  {
    id: 9,
    cardTitle: "Family Nutrition",
    imgLink: "https://i.ibb.co/WkBX1ft/9family.webp",
  },
  {
    id: 10,
    cardTitle: "Health & Beauty",
    imgLink: "https://i.ibb.co/JvD0dQb/10health-beauty.webp",
  },
  {
    id: 11,
    cardTitle: "Laundry & Household",
    imgLink: "https://i.ibb.co/1qS5cDT/11laundry-household.webp",
  },
  {
    id: 12,
    cardTitle: "Surgical",
    imgLink: "https://i.ibb.co/HxwtgvB/12surgical.webp",
  },
  {
    id: 13,
    cardTitle: "Health & Dental",
    imgLink: "https://i.ibb.co/LpMs6fW/13health-dental.webp",
  },
  {
    id: 14,
    cardTitle: "Personal Care",
    imgLink: "https://i.ibb.co/r0RBc7P/14personal-Care.webp",
  },
];

const CategoryCard = () => {
  const defaultImgLink = `https://i.ibb.co/ZGCQxbH/osudpotro-default.webp`;
  return (
    <>
      <TitleStyle title={"Shop by Category"} />
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6   mt-8 px-6  ">
          {categoryList.map((item) => (
            <Link href={`/#`} key={item.id}>
              <div className="bg-base-100 min-h-56 shadow-xl flex flex-col cursor-pointer border">
                <figure>
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "75.25%" }}
                  >
                    <Image
                      src={item.imgLink || defaultImgLink}
                      alt={item.cardTitle}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </figure>
                <div className="card-body text-center p-4 font-semibold ">
                  <h2 className="p-0">{item.cardTitle}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryCard;

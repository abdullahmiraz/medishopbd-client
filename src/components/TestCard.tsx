import React from "react";

const TestCard = ({ item }) => {
  return (
    <>
      <img src={item.imgLink} alt="slide" />
      <div className="card-body">
        <h2 className="card-title">{item.cardTitle}</h2>
        {/* <p>Dynamic content for each card goes here...</p> */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">{item.buttonTitle}</button>
        </div>
      </div>
    </>
  );
};

export default TestCard;

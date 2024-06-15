import React from "react";
import styles from "./CardCarousel.module.css";
import Image from "next/image";

const CardCarousel = () => {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
  <div className="grid grid-cols-1 gap-4">
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 1</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 2</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 3</h2>
      </div>
    </div>
  </div>
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide4" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide2" className="btn btn-circle">
      ❯
    </a>
  </div>
</div>

<div id="slide2" className="carousel-item relative w-full">
  <div className="grid grid-cols-1 gap-4">
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 1</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 2</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 3</h2>
      </div>
    </div>
  </div>
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide1" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide3" className="btn btn-circle">
      ❯
    </a>
  </div>
</div>

<div id="slide3" className="carousel-item relative w-full">
  <div className="grid grid-cols-1 gap-4">
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 1</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 2</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 3</h2>
      </div>
    </div>
  </div>
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide2" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide4" className="btn btn-circle">
      ❯
    </a>
  </div>
</div>

<div id="slide4" className="carousel-item relative w-full">
  <div className="grid grid-cols-1 gap-4">
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 1</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 2</h2>
      </div>
    </div>
    <div className="card w-40 h-52 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg">Card 3</h2>
      </div>
    </div>
  </div>
  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <a href="#slide3" className="btn btn-circle">
      ❮
    </a>
    <a href="#slide1" className="btn btn-circle">
      ❯
    </a>
  </div>
</div>

      </div>
    </>
  );
};

export default CardCarousel;

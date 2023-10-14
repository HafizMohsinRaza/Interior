import React from "react";
import Carousels from "./Carousels";
import kitchen from "../assets/Kitchen.jpg";
import bath from "../assets/Bathroom.jpg";
import bedroom from "../assets/Bedroom.jpg";
import living from "../assets/Living.jpg";
import dining from "../assets/Dining.jpg";
import wardrobe from "../assets/Wardrobe.jpg";
import baby from "../assets/Baby.jpg";
import Homeoffice from "../assets/homeOffice.jpg";
import office from "../assets/office.jpg";
import exterior from "../assets/Exterior.jpg";
import garden from "../assets/Garden&Landscape.jpg";
import corridors from "../assets/Corridors.jpg";
import basement from "../assets/Basement.jpg";
import furnitures from "../assets/Furniture.jpg";
import homebar from "../assets/HomeBar.jpg";
import restaurant from "../assets/Restaurant.jpg";
import salon from "../assets/Salon.jpg";
import gymYoga from "../assets/GymYoga.jpg";
import shop from "../assets/Shop.jpg"

const HomeFirst = ({ handleBoxClick }) => {
  const items = [
    {
      img: "https://test.myconcept.website/wordpress/wp-content/uploads/2016/03/012.jpg",
      title: "All",
    },
    {
      img: kitchen,
      title: "Kitchen",
    },
    {
      img: bath,
      title: "Bath",
    },
    {
      img: bedroom,
      title: "Bedroom",
    },
    {
      img: living,
      title: "Living",
    },
    {
      img: dining,
      title: "Dining",
    },
    {
      img: wardrobe,
      title: "Wardrobe",
    },
    {
      img: baby,
      title: "Baby and Kids",
    },
    {
      img: Homeoffice,
      title: "Home Office",
    },
    {
      img: office,
      title: "Office",
    },
    {
      img: exterior,
      title: "Exterior",
    },
    {
      img: garden,
      title: "Garden/Landscape",
    },
    {
      img: corridors,
      title: "Corridors",
    },
    {
      img: basement,
      title: "Basement",
    },
    {
      img: furnitures,
      title: "Furnitures",
    },
    {
      img: homebar,
      title: "Home Bar",
    },
    {
      img: restaurant,
      title: "Restaurant",
    },
    {
      img: salon,
      title: "Salon",
    },
    {
      img: gymYoga,
      title: "Gym and Yoga",
    },
    {
      img: shop,
      title: "Shop",
    },
  ];
  return (
    <div>
      <Carousels items={items} handleBoxClick={handleBoxClick}></Carousels>
    </div>
  );
};

export default HomeFirst;

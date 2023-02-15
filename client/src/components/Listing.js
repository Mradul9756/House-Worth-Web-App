import React, { useEffect } from "react";
import { execute } from "./axios";
import classes from "./listing.module.css";

const Listing = ({ item }) => {
  // const sample = {
  //   land_id: 1494060,
  //   office_Address: "1459 Gonzales Union Suite 419",
  //   land_city: "Spokane",
  //   land_state: "WA",
  //   land_zip: 99208,
  //   Contact_no: "066-571-6597x803",
  //   Email: "vbyrd@example.net",
  //   land_review: "4.05",
  //   Id: 180279,
  //   Address: "15237 Marks Villages",
  //   City: "Spokane",
  //   State: "WA",
  //   Zip: 99260,
  //   Description:
  //     "A new townhouse development that has everything you need and more, all while being situated conveniently near Whitworth University. If you are looking for an affordable place to live that still relatively close to campus, then this 10 -bedroom house may be the one for you!",
  //   no_of_rooms: 30,
  //   no_of_bathrooms: 1,
  //   monthly_rent: 2073,
  //   security_deposit: 310,
  //   landlord_Id: 1494060,
  // };
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <img alt="ww" className={classes.mainImage} src={item.House_url}></img>
      </div>
      <div className={classes.right}>
        <span className={classes.pricing_column}>
          <span> {`$ ${item.monthly_rent}`} </span>/ month{" "}
        </span>

        <div className={classes.description}>
          <span>{item.Description}</span>
        </div>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <img src="https://img.icons8.com/material/96/FFFFFF/bedroom.png" />
            <span>{`${item.no_of_rooms} Bedrooms`} </span>
          </li>
          <li className={classes.li}>
            <img src="https://img.icons8.com/material/96/FFFFFF/bedroom.png" />
            <span>{`${item.no_of_bathrooms} Bath`} </span>
          </li>
          <li className={classes.li}>
            <img src="https://img.icons8.com/material/96/FFFFFF/walking--v1.png" />{" "}
            <span>{`${item.dist_from_campus} Miles`} </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Listing;

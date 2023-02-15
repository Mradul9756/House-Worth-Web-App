import React, { useEffect, useState } from "react";
import classes from "./ListingPage.module.css";
import { useParams } from "react-router";
import axios from "axios";

const ListingPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState([])
  const [landLord, setLandLord] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/listing/?", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res.data[0])
        setItem(res.data[0]);
      });
  }, []);

  useEffect (() => {console.log(item)}, [item])
  
  return (
    <div className={classes.elongatedContainer}>
      <div className={classes.elongated}>
        <div className={classes.container}>
          <div className={classes.left}>
            <img
              alt="ww"
              className={classes.mainImage}
              src={item.House_url}
            ></img>
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
                <img src="https://img.icons8.com/material/96/000000/bedroom.png" />
                <span>{`${item.no_of_rooms} Bedrooms`} </span>
              </li>
              <li className={classes.li}>
                <img src="https://img.icons8.com/material/96/000000/bedroom.png" />
                <span>{`${item.no_of_bathrooms} Bath`} </span>
              </li>
              <li className={classes.li}>
                <img src="https://img.icons8.com/material/96/000000/walking--v1.png" />{" "}
                <span>{`${item.dist_from_campus} Miles`} </span>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.moreImages}>
          <img src={item.Kitchen_url} />
          <img src={item.bedroom_url} />
          <img src={item.Livingroom_url} />
          <img src={item.Bathroom_url} />
        </div>
      </div>
      <div className={classes.landlord}>
        <div className={classes.landLeft}>
          <img src="https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png" />
        </div>
        <div className={classes.landRight}>
          <span className={classes.landName}>{item.name}</span>
          <span className={classes.landReview}>{item.Landlord_reviews} ⭐</span>
          <span className={classes.landAddress}>
            {`${item.Address}, ${item.City}, ${item.State}, ${item.Zip}`}
          </span>
          <span className={classes.landPhone}>{item.Contact_no}</span>
          <span className={classes.landEmail}>{item.Email}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;

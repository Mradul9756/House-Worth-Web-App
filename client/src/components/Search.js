import styles from "./Search.module.css";
import rowStyles from "./SearchRow.module.css";
import axios from "axios";
import { useStateValue } from "../Stateprovider";

import React, { useEffect, useState } from "react";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [term, setTerm] = useState(null);
  const [sort, setSort] = useState(null);
  const [minNumBath, setMinNumBath] = useState(null);
  const [maxNumBath, setMaxNumBath] = useState(null);
  const [minNumBed, setMinNumBed] = useState(null);
  const [maxNumBed, setMaxNumBed] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxMiles, setMaxMiles] = useState(null);
  const [minMiles, setMinMiles] = useState(null);
  const [{ listing_result }, dispatch] = useStateValue();

  const execute = async () => {
    axios
      .get("http://localhost:3001/?", {
        params: {
          max_no_bath: maxNumBath,
          min_no_bath: minNumBath,
          min_no_rooms: minNumBed,
          max_no_rooms: maxNumBed,
          max_rent: maxPrice,
          min_rent: minPrice,
          max_distance: maxMiles,
          min_distance: minMiles,
          term: term,
          sort: sort,
        },
      })
      .then((res) => {
        dispatch({
          type: "UPDATE_LISTING",
          listing_result: res.data,
        });
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    execute()
  }, [sort])

  return (
    <div className={styles.container}>
      <div className={styles.term}>
        <span
          onClick={() => {
            setTerm(3);
          }}
        >
          Fall
        </span>
        <span
          onClick={() => {
            setTerm(2);
          }}
        >
          Spring
        </span>
        <span
          onClick={() => {
            setTerm(4);
          }}
        >
          Jan
        </span>
        <span
          onClick={() => {
            setTerm(1);
          }}
        >
          {" "}
          Full Academic Year
        </span>
      </div>
      {/* <SearchRow /> */}

      <div className={rowStyles.row}>
        <div className={rowStyles.searchOption}>
          <span>Number of Bedrooms</span>
          <input
            type="text"
            placeholder="Min"
            onChange={(e) => {
              if (e.target.value === "") {
                console.log("setting null");
                setMinNumBed(null);
              } else {
              }
              setMinNumBed(e.target.value);
              console.log(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Max"
            onChange={(e) => {
              setMaxNumBed(e.target.value);
            }}
          />
        </div>
        <div className={rowStyles.searchOption}>
          <span>Number of Bathrooms</span>
          <input
            type="text"
            placeholder="Min"
            onChange={(e) => {
              setMinNumBath(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Max"
            onChange={(e) => {
              setMaxNumBath(e.target.value);
            }}
          />
        </div>
        <div className={rowStyles.searchOption}>
          <span>Rent</span>
          <input
            type="text"
            placeholder="Min"
            onChange={(e) => {
              setMinPrice(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Max"
            onChange={(e) => {
              setMaxPrice(e.target.value);
            }}
          />
        </div>
        <div className={rowStyles.searchOption}>
          <span>Distance (Miles)</span>
          <input
            type="text"
            placeholder="Min"
            onChange={(e) => {
              setMaxMiles(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Max"
            onChange={(e) => {
              setMinMiles(e.target.value);
            }}
          />
        </div>
      </div>
      {/* End*/}
      <button type="submit" className={styles.searchButton} onClick={execute}>
        Search
      </button>

      <div className={styles.term}>
        <span
          onClick={() => {
            setSort("monthly_rent");
          }}
        >
          Rent
        </span>
        <span
          onClick={() => {
            setSort("dist_from_campus");
          }}
        >
          Distance
        </span>
        <span
          onClick={() => {
            setSort("no_of_rooms");
          }}
        >
          Bedroom
        </span>
        <span
          onClick={() => {
            setSort("no_of_bathrooms");
          }}
        >
          {" "}
          Bathrooms
        </span>
      </div>
    </div>
  );
};

export default Search;

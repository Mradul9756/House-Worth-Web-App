import Listing from "./components/Listing";
import classes from "./App.module.css";
import Search from "./components/Search";
import Nav from "./components/Nav";
import { useStateValue } from "./Stateprovider";
import { useEffect } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ListingPage from "./components/ListingPage";

function App() {
  const [{ listing_result }, dispatch] = useStateValue();

  useEffect(() => {}, [listing_result]);

  return (
    <BrowserRouter>
      <div className={classes.appContainer}>
        <Nav />
        <div className={classes.App}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Search rental listings around Whitworth </h1>
                  <Search />
                  <div className={classes.container}>
                    {!listing_result && <h1>Welcome</h1>}
                    {listing_result &&
                      listing_result.map((item) => (
                        <Link to={`/listing/${item.Id}`}>
                          <Listing item={item} />
                        </Link>
                      ))}
                  </div>
                </>
              }
            />
            <Route path="/auth" element={<Login />} />
            <Route path="/listing/:id" element={<ListingPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

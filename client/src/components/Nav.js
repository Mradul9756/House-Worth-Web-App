import styles from "./Nav.module.css";
import logo from "./Logo.png";
import { useStateValue } from "../Stateprovider";
import { Link } from "react-router-dom";

const Nav = () => {
  const [{ loggedIn, user }, dispatch] = useStateValue();
  return (
    <div className={styles.nav}>
      <Link to="/">
        <div className={styles.imgCont}>
          <img src={logo} alt=""></img>
        </div>
      </Link>
      <div className={styles.logIn}>
        {!user && (
          <span className={styles.prompt}>
            <Link to="/auth">Log in as landlord</Link>
            <img src="https://img.icons8.com/ios-glyphs/90/null/login-rounded-down.png" />
          </span>
        )}
        {user && (
          <span className={styles.prompt}>
            {user.username || "Hey There"}
            <img src="https://img.icons8.com/ios-glyphs/90/null/login-rounded-down.png" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Nav;

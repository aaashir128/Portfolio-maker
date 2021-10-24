import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../config/firebase";
import { useStateValue } from "../config/StateProvider";
import "./Sidebar.css";

function Sidebar({ navToggle }) {
  const [{ user }, dispatch] = useStateValue();
  const [brandLogo, setBrandLogo] = useState("");

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("brandLogo")
        .onSnapshot((snapshot) =>
          setBrandLogo(snapshot.docs.map((doc) => doc.data().brandLogo))
        );
    }
  }, [user]);

  return (
    <div className={`${navToggle ? "nav-toggler" : "sidebar"} `}>
      <Link to={!user ? "/login" : "/admin"}>
        <div className="sidebar__image">
          <img className="sidebar__imageLogo" src={brandLogo} alt="" />
        </div>
      </Link>

      <hr className="sidebar__hr" />
      <div className="sidebar__center">
        <Link to="/">
          <h5 className="sidebar__centerLinks">Home</h5>
        </Link>
        <Link to="/about">
          <h5 className="sidebar__centerLinks">About</h5>
        </Link>
        <Link to="/resume">
          <h5 className="sidebar__centerLinks">Resume</h5>
        </Link>
        <Link to="/portfolios">
          <h5 className="sidebar__centerLinks">Portfolio</h5>
        </Link>
        <Link to="/contact">
          <h5 className="sidebar__centerLinks">Contact</h5>
        </Link>
      </div>
      <hr className="sidebar__hr" />

      <div className="sidebar__footer">
        <h2>© 2021 Portfolio Website</h2>
      </div>
    </div>
  );
}

export default Sidebar;

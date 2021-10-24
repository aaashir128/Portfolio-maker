import React, { useState, useEffect } from "react";
import "./PortfolioItem.css";
import { useStateValue } from "../config/StateProvider";
import PortfolioWork from "./PortfolioWork";
import db from "../config/firebase";

function PortfolioItem() {
  const [portfolios, setPortfolios] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("portfolio")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPortfolios(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
  }, [portfolios]);

  return (
    <div className="portfolioItem">
      {portfolios.map((v, i) => (
        <PortfolioWork
          key={i}
          image={v.data.image}
          title={v.data.title}
          details={v.data.details}
          githubURL={v.data.githubURL}
          webURL={v.data.webURL}
          timestamp={v.data.timestamp}
        />
      ))}
    </div>
  );
}

export default PortfolioItem;

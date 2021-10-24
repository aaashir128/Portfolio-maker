import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import "./ServicesSection.css";
import Title from "./Title";
import backEnd from "../Gallery/backEnd.svg";
import frontEnd from "../Gallery/frontEnd.svg";
import webDesign from "../Gallery/webDesign.svg";
import { useStateValue } from "../config/StateProvider";
import db from "../config/firebase";

function ServicesSection() {
  const [{ user }, dispatch] = useStateValue();
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("services")
        .onSnapshot((snapshot) =>
          setServices(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, []);


  return (
    <div className="servicesSection">
      <Title title="Services" span="Services" />
      <div className="servicesSection__services">
        {services.map((v, index) =>
          v.data.services.map((v, i) => (
            <ServiceCard image={frontEnd} title={v.title} details={v.detail} />
          ))
        )}
      </div>
    </div>
  );
}

export default ServicesSection;

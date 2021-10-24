import React, { useEffect, useState } from "react";
import ImageSection from "../components/ImageSection";
import ServicesSection from "../components/ServicesSection";
import Title from "../components/Title";
import db from "../config/firebase";
import { useStateValue } from "../config/StateProvider";
import "./AboutPage.css";

function AboutPage({
  firstName,
  lastName,
  tagline,
  age,
  services,
  languages,
  phoneNumber,
  location,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [cvFile, setCvFile] = useState("");

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("cv")
        .onSnapshot((snapshot) =>
          setCvFile(snapshot.docs.map((doc) => doc.data().url))
        );
    }
  }, []);

  return (
    <div className="aboutPage">
      <Title title="About Me" span="About Me" />
      <ImageSection
        firstName={firstName}
        tagline={tagline}
        services={services}
        age={age}
        lastName={lastName}
        languages={languages}
        phoneNumber={phoneNumber}
        location={location}
        cvFile={cvFile}
      />

      <ServicesSection />
    </div>
  );
}

export default AboutPage;

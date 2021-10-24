import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ImageSection.css";
import cv from "../Gallery/Ashir K Resume-updated.pdf";
import { useStateValue } from "../config/StateProvider";
import moment from "moment";
import db from "../config/firebase";
import { IconButton } from "@mui/material";
import { AssignmentInd, GitHub } from "@mui/icons-material";

function ImageSection({
  firstName,
  lastName,
  tagline,
  age,
  services,
  languages,
  location,
  cvFile,
}) {
  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="imageSection">
      {user.photoURL === "" && (
        <div className="imageSection__left">
          <img src={user?.photoURL} alt="" />
        </div>
      )}
      <div className="imageSection__right">
        <div className="subTitle">
          <h4>
            I am{" "}
            <span className="highlight">
              {firstName} {""}
              {lastName}
            </span>
          </h4>

          <IconButton>
            <a href={cvFile} target="_blank">
              <AssignmentInd />
            </a>
          </IconButton>
        </div>
        <p className="aboutDetails">
          {tagline}
          {/* <span className="specialization">Web Development</span> ,
          <span className="specialization">Hybrid App development</span>,{" "}
          <span className="specialization">bug fixing</span> ,{" "}
          <span className="specialization">Database Integration</span> or{" "}
          <span className="specialization">User Authentication </span>
          do <span className="highlight">CONTACT ME</span> */}
        </p>
        <div className="aboutInfo">
          <div className="aboutInfo__infoTitle">
            <p>Full name:</p>
            <h5>
              {firstName} {""}
              {lastName}
            </h5>
          </div>
          <div className="aboutInfo__infoTitle">
            <p>Age:</p>
            <h5>{moment().diff(moment(age, "YYYYMMDD"), "years")}</h5>
          </div>
          <div className="aboutInfo__infoTitle">
            <p>Nationality:</p> <h5>{location}</h5>
          </div>
          <div className="aboutInfo__infoTitle">
            <p>Languages:</p>
            <h5>{languages}</h5>
          </div>
          <div className="aboutInfo__infoTitle">
            <p>Services:</p>
            <h5>{services}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSection;

import { GitHub, Language } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import "./PortfolioWork.css";

function PortfolioWork({
  image,
  title,
  details,
  githubURL,
  webURL,
  timestamp,
}) {
  return (
    <div className="portfolioWork">
      <div className="portfolioWork__container">
        <div className="portfolioWork__containerMain">
          <img
            className="portfolioWork__containerImage"
            src={image}
            alt={image}
          />
          <div className="IconButton">
            <IconButton>
              <a href={githubURL} target="_blank">
                <GitHub />
              </a>
            </IconButton>
            <IconButton>
              <a href={webURL} target="_blank">
                <Language />
              </a>
            </IconButton>
          </div>
        </div>
        <h3>{title}</h3>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default PortfolioWork;

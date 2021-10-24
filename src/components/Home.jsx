import { Facebook, GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Particles from "react-particles-js";
import db from "../config/firebase";

import { useStateValue } from "../config/StateProvider";
import "./Home.css";

function Home({ firstName, tagline }) {
  const [{ user }, dispatch] = useStateValue();
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("socialLinks")
        .onSnapshot((snapshot) =>
          setUserLinks(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, []);

  return (
    <div className="home">
      <Particles
        className="home__particles"
        params={{
          particles: {
            number: {
              value: 250,
              density: {
                enable: false,
              },
            },

            size: {
              value: 3,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: "top",
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
      <div className="home__details">
        <div className="home__detailsText">
          {user?.displayName && (
            <h1>
              Hi I'm <span>{user.displayName} </span>{" "}
            </h1>
          )}
          <p>{tagline && tagline}</p>

          {userLinks.map((v, i) => (
            <div className="home__icons">
              {v.data.gitHubUrl && (
                <IconButton>
                  <a href={v.data.gitHubUrl} target="_blank">
                    <GitHub />
                  </a>
                </IconButton>
              )}
              {v.data.fbUrl && (
                <IconButton>
                  <a href={v.data.fbUrl} target="_blank">
                    <Facebook />
                  </a>
                </IconButton>
              )}
              {v.data.linkedInUrl && (
                <IconButton>
                  <a href={v.data.linkedInUrl} target="_blank">
                    <LinkedIn />
                  </a>
                </IconButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

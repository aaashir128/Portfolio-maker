import { Close, Edit } from "@mui/icons-material";
import { Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import db from "../config/firebase";
import "./AdminPortfolio.css";
import { useStateValue } from "../config/StateProvider";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function AdminPortfolio({
  image,
  title,
  details,
  githubURL,
  webURL,
  timestamp,
  id,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDetails, setNewDetails] = useState(details);
  const [newGithubURL, setNewGithubURL] = useState(githubURL);
  const [newWebURL, setNewWebURL] = useState(webURL);
  const [{ user }, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editItem = () => {
    if (user) {
      db.collection("users").doc(user.uid).collection("portfolio").doc(id).set({
        image: image,
        timestamp: timestamp,
        title: newTitle,
        details: newDetails,
        githubURL: newGithubURL,
        webURL: newWebURL,
      });
    }
  };

  const deleteItem = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("portfolio")
        .doc(id)
        .delete();
    }
  };

  return (
    <div className="adminPortfolio">
      <div className="adminPortfolio__container">
        <div className="adminPortfolio__containerTop">
          <IconButton onClick={handleOpen}>
            <Edit />
          </IconButton>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <h5>Title:</h5>
              <input
                defaultValue={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <h5>Details:</h5>
              <input
                defaultValue={details}
                onChange={(e) => setNewDetails(e.target.value)}
              />
              <h5>Github URL:</h5>
              <input
                defaultValue={githubURL}
                onChange={(e) => setNewGithubURL(e.target.value)}
              />
              <h5>Website URL:</h5>
              <input
                defaultValue={webURL}
                onChange={(e) => setNewWebURL(e.target.value)}
              />
              <Button onClick={editItem}>Edit and Update</Button>
            </Box>
          </Modal>

          <IconButton onClick={deleteItem}>
            <Close />
          </IconButton>
        </div>
        <div className="adminPortfolio__containerImg">
          <img src={image} alt={image} />
        </div>
        <div className="adminPortfolio__containertxt">
          <div className="adminPortfolio__containertxtHead">
            <h4>{title}</h4>
            <small>{new Date(timestamp?.toDate()).toDateString()}</small>
          </div>
          <div className="adminPortfolio__containertxtDetails">
            <p>{details}</p>
          </div>
          <div className="adminPortfolio__containertxtUrl">
            <h5>GitHub URL: </h5>
            <p>{githubURL}</p>
            <h5>Website URL: </h5>
            <p>{webURL}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPortfolio;

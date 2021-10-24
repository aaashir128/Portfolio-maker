import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Title from "../components/Title";
import db, {  storage } from "../config/firebase";
import { useStateValue } from "../config/StateProvider";
import "./SocialLinks.css";

function SocialLinks() {
  const [{ user }, dispatch] = useStateValue();
  const [cvFile, setCvFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fbUrl, setFbUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const history = useHistory();

  // input file CV upload function
  const cvHandler = (e) => {
    if (e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
    console.log(" this is Updated Value >>>", cvFile);
  };
  // input file CV function

  // CV upload function
  const uploadCV = (e) => {
    const uploadTask = storage.ref(`cv/${cvFile.name}`).put(cvFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("cv")
          .child(cvFile.name)
          .getDownloadURL()
          .then((url) => {
            //  post image inside db
            db.collection("users").doc(user.uid).collection("cv").add({
              url,
            });

            setCvFile(null);
            setProgress(0);
          });
      }
    );
    alert("Your CV has been uploaded sucessfully.");
  };
  // CV upload function

  const uploadLinks = (e) => {
    e.preventDefault();

    if (user) {
      db.collection("users").doc(user.uid).collection("socialLinks").add({
        fbUrl: fbUrl,
        linkedInUrl: linkedInUrl,
        gitHubUrl: gitHubUrl,
      });
      alert("Your links has been successfully updated.");
      setFbUrl("");
      setGitHubUrl("");
      setLinkedInUrl("");
      history.push("/create-profile/");
    }
  };

  return (
    <div className="socialLinks">
      <Title title="Social Links & CV" span="Social Links & CV" />
      <div className="socialLinks__cv">
        <h4>Upload your CV</h4>
        <input type="file" onChange={cvHandler} />
        <progress value={progress} max="100" />
        <button disabled={!cvFile} onClick={uploadCV}>
          Upload CV
        </button>
      </div>

      <div className="socialLinks__links">
        <form>
          <h5>Facebook Link</h5>
          <TextField value={fbUrl} onChange={(e) => setFbUrl(e.target.value)} />
          <h5>Linkedin Link</h5>
          <TextField
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
          />
          <h5>Github Link</h5>
          <TextField
            value={gitHubUrl}
            onChange={(e) => setGitHubUrl(e.target.value)}
          />
          <button onClick={uploadLinks}>Upload Links</button>
        </form>
      </div>
    </div>
  );
}

export default SocialLinks;

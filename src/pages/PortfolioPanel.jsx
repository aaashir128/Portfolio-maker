import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import db, { storage } from "../config/firebase";
import "./PortfolioPanel.css";
import firebase from "firebase";
import AdminPortfolio from "../components/AdminPortfolio";
import { useStateValue } from "../config/StateProvider";

function PortfolioPanel() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [webURL, setWebURL] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const [progress, setProgress] = useState(0);
  const [portfolios, setPortfolios] = useState([]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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

  const uploadPortfolio = () => {
    // e.preventDefault();

    // Image uploading function
    const uploadTask = storage
      .ref(`users/${user.uid}/images/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      // Image uploading function
      () => {
        storage
          .ref(`users/${user.uid}/images`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("users").doc(user.uid).collection("portfolio").add({
              image: url,
              title: title,
              details: details,
              githubURL: githubURL,
              webURL: webURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setImage(null);
            setTitle("");
            setDetails("");
            setGithubURL("");
            setWebURL("");
            setProgress(0);
          });
      }
    );
  };

  return (
    <div className="portfolioPanel">
      <Title title="Portfolio Panel" span="Portfolio Panel" />

      <div className="portfolioPanel__container">
        <Title title="Recently Added" />
        <div className="portfolioPanel__previous">
          {portfolios.map((v) => (
            <AdminPortfolio
              key={v.id}
              id={v.id}
              image={v.data.image}
              title={v.data.title}
              details={v.data.details}
              githubURL={v.data.githubURL}
              webURL={v.data.webURL}
              timestamp={v.data.timestamp}
            />
          ))}
        </div>

        <Title title="Add New" />
        <div className="portfolioPanel__addNew">
          <form>
            <h5 className="portfolioPanel__addNewItem">
              Enter Portfolio Title
            </h5>
            <input
              placeholder="Project Title here..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h5 className="portfolioPanel__addNewItem">
              Enter Portfolio Details
            </h5>
            <input
              placeholder="Project Details here..."
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <h5 className="portfolioPanel__addNewItem">Enter Github URL</h5>
            <input
              placeholder="Project Github URL here..."
              type="text"
              value={githubURL}
              onChange={(e) => setGithubURL(e.target.value)}
            />
            <h5 className="portfolioPanel__addNewItem">Enter Website URL</h5>
            <input
              placeholder="Project Website URL here..."
              value={webURL}
              onChange={(e) => setWebURL(e.target.value)}
            />
            <h5 className="portfolioPanel__addNewItem">Enter Github URL</h5>
            <input type="file" onChange={handleChange} />
          </form>
          <progress value={progress} max="100" />
          <button color="primary" variant="contained" onClick={uploadPortfolio}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPanel;

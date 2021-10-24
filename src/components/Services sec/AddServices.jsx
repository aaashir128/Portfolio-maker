import { Add, DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, {  useState } from "react";
import db, { storage } from "../../config/firebase";
import { useStateValue } from "../../config/StateProvider";
import Title from "../Title";
import "./AddServices.css";

function AddServices() {
  const [brandLogo, setBrandLogo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [services, setServices] = useState([
    {
      title: "Front End",
      detail: "I am a Front-End developer",
    },
  ]);
  const [{ user }, dispatch] = useStateValue();

  const handleChangeInput = (index, event) => {
    const values = [...services];
    values[index][event.target.name] = event.target.value;
    setServices(values);
  };

  const brandLogoChange = (e) => {
    if (e.target.files[0]) setBrandLogo(e.target.files[0]);
  };

  // Skills input add
  const addFields = () => {
    setServices([...services, { title: "", detail: "" }]);
  };
  // Skills input add

  // Skills input Remove
  const removeFields = (index) => {
    const values = [...services];
    values.splice(index, 1);
    setServices(values);
  };

  // Skills input Remove

  const uploadBrandLogo = (e) => {
    e.preventDefault();

    const uploadTask = storage
      .ref(`brandLogo/${brandLogo.name}`)
      .put(brandLogo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.random(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
        console.log(error);
      },
      () => {
        storage
          .ref(`brandLogo`)
          .child(brandLogo.name)
          .getDownloadURL()
          .then((url) => {
            if (user) {
              db.collection("users").doc(user.uid).collection("brandLogo").add({
                brandLogo: url,
              });
            }
            setBrandLogo(null);
            setProgress(0);
            alert("Brand logo updated Successfully");
          });
      }
    );
  };

  const uploadServices = (e) => {
    e.preventDefault();
    if (user) {
      db.collection("users").doc(user.uid).collection("services").add({
        services,
      });
      alert("Services has been successfully updated.");
    }
  };

  return (
    <div className="addServices">
      <Title title="Add Servics" span="Add Servics" />

      <div className="addServices__brandLogo">
        <h5>Upload your Brand Logo</h5>
        <input type="file" onChange={brandLogoChange} />
        <progress value={progress} />
        <button onClick={uploadBrandLogo}>Upload Logo</button>
      </div>

      <div className="addServices__services">
        {services.map((service, index) => (
          <div key={index} className="addServices__servicesText">
            <form>
              <h5>Title</h5>
              <input
                className="textField"
                name="title"
                label="Title"
                value={service.title}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <h5>Details</h5>
              <textarea
                type="text"
                // placeholder="10%"
                name="detail"
                label="Details"
                value={service.detail}
                onChange={(event) => handleChangeInput(index, event)}
              />

              <div className="IconButtons">
                <IconButton onClick={() => removeFields(index)}>
                  <DeleteForever />
                </IconButton>

                <IconButton onClick={() => addFields()}>
                  <Add />
                </IconButton>
              </div>
            </form>
          </div>
        ))}
        <button onClick={uploadServices}>Upload Services</button>
      </div>
    </div>
  );
}

export default AddServices;

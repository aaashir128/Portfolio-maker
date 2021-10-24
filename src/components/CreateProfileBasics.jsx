import React, { useState } from "react";
import db, { storage } from "../config/firebase";
import { useStateValue } from "../config/StateProvider";
import "./CreateProfileBasics.css";

function CreateProfileBasics() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastname, setUserLastName] = useState("");
  const [userTagline, setUserTagline] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userLanguages, setUserLanguages] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userServices, setUserServices] = useState("");
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  const [progress, setProgress] = useState(0);

  const imageHandle = (e) => {
    if (e.target.files[0]) {
      setUserProfileImage(e.target.files[0]);
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();

    const uploadTask = storage
      .ref(`users/${user.uid}/images/${userProfileImage.name}`)
      .put(userProfileImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.random(
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
          .ref(`users/${user.uid}/images`)
          .child(userProfileImage.name)
          .getDownloadURL()
          .then((url) => {
            if (
              !userFirstName ||
              !userLastname ||
              !userPhoneNumber ||
              !userAge ||
              !userLanguages ||
              !userServices ||
              !userLocation ||
              !userProfileImage
            ) {
              alert("Please fill all the fields");
            } else {
              db.collection("users")
                .doc(user.uid)
                .collection("profile")
                .add({
                  firstName: userFirstName,
                  lastName: userLastname,
                  tagline: userTagline,
                  phoneNumber: userPhoneNumber,
                  age: userAge,
                  languages: userLanguages,
                  location: userLocation,
                  services: userServices,
                  profileImage: url,
                })
                .then(() =>
                  user.updateProfile({
                    displayName: userFirstName,
                    photoURL: url,
                    phoneNumber: userPhoneNumber,
                  })
                );
              setUserFirstName("");
              setUserLastName("");
              setUserTagline("");
              setUserPhoneNumber("");
              setUserAge("");
              setUserLanguages("");
              setUserLocation("");
              setUserServices("");
              setUserProfileImage(null);

              alert("Profile updated Successfully");
            }
          });
      }
    );
  };

  return (
    <div className="createProfileBasics">
      <div className="createProfileBasics__container">
        <h3 className="createProfileBasics__containerMainHeading">
          Basic Profile
        </h3>
        <form>
          <h5>First Name</h5>
          <input
            type="text"
            placeholder="John"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
          />

          <h5>Last Name</h5>
          <input
            type="text"
            placeholder="Doe"
            value={userLastname}
            onChange={(e) => setUserLastName(e.target.value)}
          />

          <h5>Bio / Tagline</h5>
          <input
            type="text"
            placeholder="Full-Stack Developer. I love to solve problems and eager to learn new things"
            value={userTagline}
            onChange={(e) => setUserTagline(e.target.value)}
          />

          <h5>Phone Number</h5>
          <input
            type="number"
            placeholder="+92 123 456789"
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
          />

          <h5>Location</h5>
          <input
            type="text"
            placeholder="Karachi - Pakistan"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
          />

          <h5>Age</h5>
          <input
            type="date"
            // value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
          />

          <h5>Location</h5>
          <input
            type="country"
            // value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
          />

          <h5>Languages</h5>
          <input
            type="text"
            placeholder="English / Urdu"
            value={userLanguages}
            onChange={(e) => setUserLanguages(e.target.value)}
          />

          <h5>Services</h5>
          <input
            type="text"
            placeholder="Programmer / Developer"
            value={userServices}
            onChange={(e) => setUserServices(e.target.value)}
          />

          <h5>Profile Image</h5>
          <input type="file" onChange={imageHandle} />

          <button onClick={updateProfile}>Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfileBasics;

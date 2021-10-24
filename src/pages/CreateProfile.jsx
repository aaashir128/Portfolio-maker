import React, { useEffect, useState } from "react";
import "./CreateProfile.css";
import Title from "../components/Title";
import CreateProfileBasics from "../components/CreateProfileBasics";
import CreateProfileAdv from "./CreateProfileAdv";
import { useStateValue } from "../config/StateProvider";

function CreateProfile() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user?.displayName);

  return (
    <div className="createProfile">
      <Title title="Create Profile" span="Create Profile" />
      {!user?.displayName ? <CreateProfileBasics /> : <CreateProfileAdv />}
    </div>
  );
}

export default CreateProfile;

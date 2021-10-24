import "./CreateProfileAdv.css";
import React, { useState } from "react";
import db from "../config/firebase";
import { useStateValue } from "../config/StateProvider";
import {  IconButton, TextField } from "@mui/material";
import { Add, DeleteForever } from "@mui/icons-material";
import { Link } from "react-router-dom";

function CreateProfileAdv() {
  const [userSkills, setUserSkills] = useState([
    { skill: "Javascript", proficiency: "80" },
    { skill: "Python", proficiency: "30" },
  ]);
  const [userWork, setUserWork] = useState([
    {
      yearStarted: null,
      yearEnded: null,
      title: "",
      technology: "",
      details: "",
    },
  ]);

  const [{ user }, dispatch] = useStateValue();

  // Skills input handler
  const handleChangeInput = (index, event) => {
    const values = [...userSkills];
    values[index][event.target.name] = event.target.value;
    setUserSkills(values);
  };
  // Skills input handler

  // Work input handler
  const handleChangeInputWork = (index, event) => {
    const values = [...userWork];
    values[index][event.target.name] = event.target.value;
    setUserWork(values);
  };
  // Work input handler

  // Skills input add
  const addFields = () => {
    setUserSkills([...userSkills, { skill: "", proficiency: "" }]);
  };
  // Skills input add

  // Skills input Remove
  const removeFields = (index) => {
    const values = [...userSkills];
    values.splice(index, 1);
    setUserSkills(values);
  };

  // Skills input Remove

  // Work input Remover
  const removeFieldsInput = (index) => {
    const values = [...userWork];
    values.splice(index, 1);
    setUserWork(values);
  };
  // Work input Remover

  // Work input Adder
  const addFieldsInput = () => {
    setUserWork([
      ...userWork,
      {
        title: "",
        technology: "",
        details: "",
        yearStarted: "",
        yearEnded: "",
      },
    ]);
  };
  // Work input Adder

  // Update Skill function, addded to firebase database.
  const updateSkills = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).collection("skills").add({
      userSkills,
    });

    alert("Your Skills has been updated sucessfully.");
  };
  // Update Skill function, addded to firebase database.

  // Update Work function, addded to firebase database.
  const updateWork = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).collection("workExp").add({
      userWork,
    });

    alert("Your Working Experience has been updated sucessfully.");
  };
  // Update Work function, addded to firebase database.

  return (
    <div className="createProfileAdv">
      <div className="createProfileAdv__container">
        <div className="createProfileAdv__containerSkills">
          <h3 className="createProfileAdv__containerMainHeading">Add Skills</h3>
          <form>
            {userSkills.map((userSkill, index) => (
              <div key={index} className="mainContent">
                <TextField
                  className="textField"
                  name="skill"
                  label="Skill"
                  value={userSkill.skill}
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <div className="progressBar">
                  <TextField
                    type="range"
                    placeholder="10%"
                    name="proficiency"
                    label="proficiency"
                    value={userSkill.proficiency}
                    onChange={(event) => handleChangeInput(index, event)}
                  />
                </div>

                <div className="IconButtons">
                  <IconButton onClick={() => removeFields(index)}>
                    <DeleteForever />
                  </IconButton>

                  <IconButton onClick={() => addFields()}>
                    <Add />
                  </IconButton>
                </div>
              </div>
            ))}

            <button onClick={updateSkills}>Update Skills</button>
          </form>

          <div className="createProfileAdv__containerWork">
            <h3 className="createProfileAdv__containerMainHeading">
              Add Work experience
            </h3>

          

            <form>
              {userWork.map((work, index) => (
                <div key={index} className="mainContent">
                  <div className="textFieldsInputs">
                    <TextField
                      className="textField"
                      placeholder="Full stack Developer"
                      name="title"
                      label="Title"
                      value={work.title}
                      onChange={(event) => handleChangeInputWork(index, event)}
                    />

                    <TextField
                      type="text"
                      placeholder="MongoDB, ExpressJS, ReactJS, NodeJS"
                      name="technology"
                      label="Framework and technology"
                      value={work.technology}
                      onChange={(event) => handleChangeInputWork(index, event)}
                    />

                    <TextField
                      type="text"
                      placeholder="Working as a full stack Developer remotely since 2019."
                      name="details"
                      label="Details"
                      value={work.details}
                      onChange={(event) => handleChangeInputWork(index, event)}
                    />
                    <TextField
                      type="date"
                      placeholder="Started on"
                      name="yearStarted"
                      label="Started Date"
                      value={work.yearStarted}
                      onChange={(event) => handleChangeInputWork(index, event)}
                    />
                    <TextField
                      type="date"
                      placeholder=""
                      name="yearEnded"
                      label="Till date"
                      value={work.yearEnded}
                      onChange={(event) => handleChangeInputWork(index, event)}
                    />

                    {/* checkbox value feature is not working yet */}
                    {/* <input
                      type="checkbox"
                      value={work.checkBox}
                      onChange={() => checkboxHandler}
                    /> */}
                    {/* checkbox value feature is not working yet */}
                  </div>

                  <div className="IconButtons">
                    <IconButton onClick={() => removeFieldsInput(index)}>
                      <DeleteForever />
                    </IconButton>

                    <IconButton onClick={() => addFieldsInput()}>
                      <Add />
                    </IconButton>
                  </div>
                </div>
              ))}

              <button onClick={updateWork}>Update Profile</button>
            </form>

            <div className='moveToURL'>
              <Link to='/create-profile/social-links'>
                <button>Add your Social Links </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfileAdv;

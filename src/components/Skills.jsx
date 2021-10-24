import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import "./Skills.css";
import Title from "../components/Title";
import db, { auth, storage } from "../config/firebase";
import { useStateValue } from "../config/StateProvider";

function Skills() {
  const [skillSet, setSkillSet] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("skills")
        .onSnapshot((snapshot) =>
          setSkillSet(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, []);

  return (
    <div className="skills">
      <Title title="Skills" span="Skills" />
      {skillSet.map((v, i) =>
        v.data.userSkills.map((v, i) => (
          <ProgressBar
            title={v.skill}
            progress={v.proficiency}
            figure={v.proficiency}
            key={i}
          />
        ))
      )}
    </div>
  );
}

export default Skills;

import { BusinessCenter} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import db from "../config/firebase";
import ResumeItem from "../components/ResumeItem";
import Skills from "../components/Skills";
import Title from "../components/Title";
import "./ResumePage.css";
import { useStateValue } from "../config/StateProvider";

function ResumePage() {
  const [workingExperience, setWorkingExperience] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("workExp")
        // .orderBy("yearEnded", "desc")
        .onSnapshot((snapshot) =>
          setWorkingExperience(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, []);

  return (
    <div className="resumePage">
      <div className="resumePage__skills">
        <Skills />
      </div>
      <Title title="Resume" span="Resume" />
      <div className="resume__details">
        <div className="resume__detailsIcon">
          <BusinessCenter />
          <h1>Work Experience</h1>
        </div>
        {workingExperience.map((v, i) =>
          v.data.userWork.map((v, i) => (
            <ResumeItem
              key={i}
              dateStarted={v.yearStarted}
              dateEnded={v.yearEnded}
              title={v.title}
              subTitle={v.technology}
              details={v.details}
            />
          ))
        )}
    

        {/* <div className="resume__detailsIcon">
          <School />
          <h1>STUDIES</h1>
        </div>

        <ResumeItem
          date={"2017 - 2020"}
          title={"Master Of Commerce "}
          subTitle={"University Of Karachi"}
          details={
            "I've done M.Com From Karachi Univeristy, Specialization in Finance and Accounting."
          }
        />

        <ResumeItem
          date={"2014 - 2016"}
          title={"Bachelor Of Commerce "}
          subTitle={"University Of Karachi"}
          details={
            "I've done B.Com From Karachi Univeristy ,Completed Banking, Statistics and Accounting as major subjects."
          }
        /> */}
      </div>
    </div>
  );
}

export default ResumePage;

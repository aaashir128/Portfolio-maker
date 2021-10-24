import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminPanelBox from "../components/AdminPanelBox";
import Title from "../components/Title";
import { auth } from "../config/firebase";
import { useStateValue } from "../config/StateProvider";
import "./AdminPage.css";
import { useParams } from "react-router-dom";

function AdminPage() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  const signOut = () => {
    auth.signOut();
    history.push("/login");
  };

  return (
    <div className="adminPage">
      <Title title="Admin Panel" span="Admin Panel" />
      <button onClick={signOut}>Sign out</button>
      <div className="adminPage__panels">
        <Link to="/message-panel">
          <AdminPanelBox
            image="https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFpbGJveGVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
            title="Message Panel"
            details="Check out the Mail Box"
          />
        </Link>
        <Link to="/portfolio-panel">
          <AdminPanelBox
            image="https://st.depositphotos.com/1209701/2781/v/950/depositphotos_27813381-stock-illustration-profile-of-young-man-in.jpg"
            title="Portfolio Panel"
            details="Manager your Portfolio, Add new, Edit and Delete Stuff"
          />
        </Link>
        <Link to="/create-profile/">
          <AdminPanelBox
            image="https://media.istockphoto.com/vectors/update-system-icon-vector-modern-flat-design-vector-illustration-of-vector-id940231468?k=20&m=940231468&s=612x612&w=0&h=hzy2FgKgpK9Bo0Jjsznhi3C4odfStBRLCecYbHeBi74="
            title="Create Porfile"
            details="Make your Profile, Add name, skills and details about you."
          />
        </Link>
        <Link to="/create-profile/add-services">
          <AdminPanelBox
            image="https://media.istockphoto.com/photos/computer-service-work-tool-icon-picture-id815594930?k=20&m=815594930&s=612x612&w=0&h=5s1bALUiJRyYm72Of3MXTfr1EZLN9Dc-RJS0LUzoeHc="
            title="Add Services"
            details="Add your Services you want to provide, Add your Brand Logo."
          />
        </Link>
      </div>
      <div className="adminPage__portfolio"></div>
    </div>
  );
}

export default AdminPage;

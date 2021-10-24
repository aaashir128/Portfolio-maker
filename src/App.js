import { Brightness4, MenuOutlined } from "@mui/icons-material";
import { IconButton, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch as Switching,
  Route,
  Link,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddServices from "./components/Services sec/AddServices";
import Sidebar from "./components/Sidebar";
import db, { auth } from "./config/firebase";
import { useStateValue } from "./config/StateProvider";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import CreateProfile from "./pages/CreateProfile";
import Login from "./pages/Login";
import MessagePanel from "./pages/MessagePanel";
import PortfolioPage from "./pages/PortfolioPage";
import PortfolioPanel from "./pages/PortfolioPanel";
import ResumePage from "./pages/ResumePage";
import SocialLinks from "./pages/SocialLinks";

function App() {
  const [profileBasic, setProfileBasic] = useState([]);

  const [{ user }, dispatch] = useStateValue();
  const [theme, setTheme] = useState("dark-theme");
  const [checked, setChecked] = useState(false);
  const [navToggle, setNavToggle] = useState(false);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("profile")
        .onSnapshot((snapshot) =>
          setProfileBasic(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
    // console.log(user.uid)
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const themeToggler = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
      setChecked(false);
    } else {
      setTheme("light-theme");
      setChecked(true);
    }
  };

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <div className="sidebar__hamburgerMenu ">
            <IconButton onClick={() => setNavToggle(!navToggle)}>
              <MenuOutlined />
            </IconButton>
          </div>
          <div className="lightDarkMode">
            <div className="leftContent">
              <Brightness4 />
            </div>
            <div className="RightContent">
              <Switch
                value=""
                checked={checked}
                onChange={themeToggler}
                inputProps={{ "aria-label": "" }}
                size="medium"
              />
            </div>
          </div>
          <Sidebar navToggle={navToggle} />

          <Switching>
            <Route exact path="/portfolio-panel">
              <PortfolioPanel />
            </Route>
            <Route exact path="/create-profile/">
              <CreateProfile />
            </Route>
            <Route exact path="/create-profile/add-services">
              <AddServices />
            </Route>
            <Route exact path="/create-profile/social-links/">
              <SocialLinks />
            </Route>
            <Route exact path="/message-panel">
              <MessagePanel />
            </Route>
            <Route exact path="/login">
              {user ? <PortfolioPage /> : <Login />}
            </Route>
            <Route exact path="/admin">
              <AdminPage />
            </Route>
            <Route exact path="/about">
              {profileBasic.map((v, i) => (
                <AboutPage
                  firstName={v.data.firstName}
                  lastName={v.data.lastName}
                  tagline={v.data.tagline}
                  age={v.data.age}
                  services={v.data.services}
                  languages={v.data.languages}
                  location={v.data.location}
                  phoneNumber={v.data.phoneNumber}
                  key={i}
                />
              ))}
            </Route>
            <Route exact path="/resume">
              <ResumePage />
            </Route>
            <Route exact path="/portfolios">
              <PortfolioPage />
            </Route>
            <Route exact path="/contact">
              {profileBasic.map((v, i) => (
                <ContactPage
                  key={i}
                  phoneNumber={v.data.phoneNumber}
                  location={v.data.location}
                />
              ))}
            </Route>
            <Route path="/">
              {profileBasic.map((v, i) => (
                <Home
                  firstName={v.data.firstName}
                  tagline={v.data.tagline}
                  githubUrl={v.data.githubUrl}
                  key={i}
                />
              ))}
            </Route>
          </Switching>
        </Router>
      )}
    </div>
  );
}

export default App;

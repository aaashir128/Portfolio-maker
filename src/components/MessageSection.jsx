import React from "react";
import "./MessageSection.css";

function MessageSection({ name, email, subject, message, timestamp }) {
  return (
    <div className="messageSection">
      <div className="messageSection__left">
        <h5>{email}</h5>
      </div>
      <div className="messageSection__right">
        <div className="messageSection__rightTop">
          <h2>{name}</h2> <small>{new Date(timestamp?.toDate()).toUTCString()}</small>
        </div>
        <div className="messageSection__rightMid">
          <h5>{email}</h5>
        </div>
        <div className='messageSection__rightMidSub'>

          <p>Subject:</p><h5>{subject}</h5>
        </div>
        <div className="messageSection__rightBottom">
          <p>
           {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageSection;

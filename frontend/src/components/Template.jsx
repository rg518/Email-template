import React from "react";
import axios from "axios";
import "./Template.css"; // Import your CSS file

const Template = (props) => {
  const { tname, subject, maillist, body } = props.template;
  const id = props.id;

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      // send axios request.
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/sendmail",
        { senderEmail: "", receiverEmail: maillist, subject, body },
        config
      );
      alert(res.data);
    } catch (error) {
      // Handle any errors that occur during the Axios request
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="template-container">
      <h3>{tname}</h3>
      <div className="template-info">
        {/* <div>Template name:{name}</div> */}
        <div>Subject: {subject}</div>
        <div>Mail List: {maillist}</div>
        <div>Mail Body: {body}</div>
      </div>
      {/* <button type="button" className="edit-button">
        Edit template
      </button> */}
      <button type="button" className="send-email-button" onClick={sendEmail}>
        Send Email
      </button>
    </div>
  );
};

export default Template;

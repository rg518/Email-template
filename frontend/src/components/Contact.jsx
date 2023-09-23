import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// npm i @emailjs/browser

const Contact = () => {
  const [formData, setFormData] = useState({
    tname: "",
    receiverEmail: "",
    subject: "",
    body: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/sendmail",
        formData,
        config
      );
      handleSave();
      setFormData({
        tname: "",
        senderEmail: "",
        receiverEmail: "",
        subject: "",
        body: "",
      });

      alert(res.data);
    } catch (error) {
      // Handle any errors that occur during the Axios request
      console.error("Error sending email:", error);
    }
  };
  const handleSave = () => {
    let newTemplate = {
      tname: formData.tname,
      subject: formData.subject,
      maillist: formData.receiverEmail,
      body: formData.body,
    };
    if (localStorage.getItem("templates")) {
      let localtemplates = localStorage.getItem("templates");
      localtemplates = JSON.parse(localtemplates);
      localtemplates.push(newTemplate);
      localtemplates = JSON.stringify(localtemplates);
      localStorage.setItem("templates", localtemplates);
    } else {
      let newTemplatearr = [];
      newTemplatearr.push(newTemplate);
      console.log(newTemplate);
      newTemplatearr = JSON.stringify(newTemplatearr);
      localStorage.setItem("templates", newTemplatearr);
    }

    setFormData({
      tname: "",
      senderEmail: "",
      receiverEmail: "",
      subject: "",
      body: "",
      // tname: "",
    });
    window.location.reload(false);
  };

  return (
    <StyledContactForm>
      <div
        className="mail-template-form-container"
        style={{ width: "50vh", display: "inline-block" }}
      >
        <h2>Create Email Template</h2>
        <form className="mail-template-form" onSubmit={sendEmail}>
          {/* <div className="form-group">
            <label htmlFor="senderEmail">Sender's Email:</label>
            <input
              type="email"
              id="senderEmail"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="tname">Template Name:</label>
            <input
              type="text"
              id="tname"
              name="tname"
              value={formData.tname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiverEmail">Receivers Email List:</label>
            <textarea
              id="receiverEmail"
              name="receiverEmail"
              value={formData.receiverEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Email Body:</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              margin: "5px 0px",
              justifyContent: "space-between",
              fontSize: "16px",
            }}
          >
            <button
              type="submit"
              className="submit-button"
              style={{ marginRight: "50px" }}
            >
              Send Email
            </button>
            <br />
            <button type="button" className="" onClick={handleSave}>
              Save template
            </button>
          </div>
        </form>
      </div>
    </StyledContactForm>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;
  border: solid black 2px;
  margin: 70px;
  padding-left: 36px;
  padding-bottom: 16px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;

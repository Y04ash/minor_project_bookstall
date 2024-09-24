import React, { useState } from "react";
import "../css/Form.css"; // Ensure the CSS file is imported

function Form() {
  // State for all input fields
  const [formData, setFormData] = useState({
    title: "",
    sellerName: "",
    address: "",
    date: "",
    startTime: "",
    endTime: "",
    occasion: "",
  });

  // Handler for text, date, and time changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setFormData({
      ...formData,
      [name]: value, // Update the corresponding state field
    });

    console.log(name, value); // Log the name and value of the field
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="form-container">
      {/* <div className="column1"> */}
    <div className="form_heading">
      <h1>
        Campaign Details
        </h1>
    </div>
      <div className="twin_input">

      <div className="input_field">
        <h1 className="heading">Campaign Title</h1>
        <input
          className="form-control"
          onChange={onChangeHandler}
          name="title"
          value={formData.title}
          placeholder="Campaign Title"
        />
      </div>

      <div className="input_field">
        <h1 className="heading">CDate:</h1>
        <input
          className="form-control"
          type="date"
          onChange={onChangeHandler}
          name="date"
          value={formData.date}
        />
      </div>
    
      </div>
    
      <div className="twin_input">


      <div className="input_field">
        <h1 className="heading">Seller's Name</h1>
        <input
          className="form-control"
          onChange={onChangeHandler}
          name="sellerName"
          value={formData.sellerName}
          placeholder="Seller's Name"
        />

      </div>

      <div className="input_field">
        <h1 className="heading">Start Time:</h1>
        <input
          className="form-control"
          type="time"
          onChange={onChangeHandler}
          name="startTime"
          value={formData.startTime}
        />
      </div>
   
      </div>

      <div className="twin_input">

      <div className="input_field">
        <h1 className="heading">Occasion</h1>
        <input
          className="form-control"
          onChange={onChangeHandler}
          name="address"
          value={formData.occasion}
          placeholder="Occassion"
        />
      </div>
      <div className="input_field">
        <h1 className="heading">End Time:</h1>
        <input
          className="form-control"
          type="time"
          onChange={onChangeHandler}
          name="endTime"
          value={formData.endTime}
        />
      </div>

      </div>

      <div className="twin_input">

      <div className="input_field">
        <h1 className="heading">Address</h1>
        <textarea
          rows={4}
          type="text-area"
          className="form-control"
          onChange={onChangeHandler}
          name="address"
          value={formData.address}
          placeholder="Address"
        />
      </div>
      <div className="input_field">

      <button className="submit-btn" onClick={onSubmitHandler}>
        Next
      </button>
      </div>
      </div>
  

      <br />

    </div>
  );
}

export default Form;

import React, { useState } from "react";
import "../css/Form.css"; // Ensure the CSS file is imported
import GeneralDetails from "./GeneralDetails";
import BooksForm from "./BooksForm";

function Form() {
  // State for all input fields
  const [isBooksForm, setIsBooksForm]=useState(false)

  const [formData, setFormData] = useState({
    title: "",
    sellerName: "",
    address: "",
    date: "",
    startTime: "",
    occasion: "",
    endTime: "",
    
  });



  return (
    <div className="form-container">
      {
        isBooksForm ? 
        <BooksForm formData={formData} setFormData={setFormData} isBooksForm={isBooksForm} setIsBooksForm={setIsBooksForm} /> 
        : <GeneralDetails formData={formData} setFormData={setFormData} isBooksForm={isBooksForm} setIsBooksForm={setIsBooksForm} /> 
      }
      
    </div>
  );
}

export default Form;

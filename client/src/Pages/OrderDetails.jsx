// TODO:
// form validations to be done
// form is gettig submitted after hitting enter
// cash or upi option remaining

import React, { useEffect, useRef,useState } from "react";
import "../css/individualPostContainer.css";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
const OrderDetails = ({
  orderColumns,
  inventory,
  setCustomerOrder,
  sales,
  setSales,
  grandTotal,
  error,
}) => {
  const nameRef = useRef("");
  const addRef = useRef("");
  const mailRef = useRef("");
  const phoneRef = useRef(0);
  const { campaignId } = useParams();
  const [toRefresh,setToRefresh] = useState(false)

  const  handleSubmitOrder = async(event) => {
    event.preventDefault();

    const temp =inventory.filter((row)=> row.order>0)
    
    // final customer data with books , customer, total details
    const finalCustomerOrder = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      custAdd: addRef.current.value,
      mail: mailRef.current.value,
      books: temp,
      totalAmount: grandTotal,
    };

    console.log("final customer order",finalCustomerOrder)
    // sending data to server
    const response = await fetch(`http://localhost:5000/Campaign/${campaignId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalCustomerOrder),
  });
  
    // updating sales
    const newSales = [...sales, finalCustomerOrder];
    setSales(newSales);


    // setting customer books array to null
    setCustomerOrder([]);

    // setting input field value to none
    nameRef.current.value = "";
    phoneRef.current.value = "";
    mailRef.current.value = "";
    addRef.current.value = "";
    
    
  };
  useEffect(() => {
    console.log("sales from use effect", sales);
  }, [sales]);

  return (
    <div className="order_detials_container">
      <h1>Order Details</h1>
      <div className="customer_form_container">
        <form className="customer_form" onSubmit={handleSubmitOrder}>
          <div className="gen_details_container">
            <div>
            <label htmlFor="name">Name<span style={{color:"red", fontFamily: "sans-serif"}}>*</span>:  </label>
            <input
              type="text"
              name="name"
              ref={nameRef}
              className="cust_name"
            />
            </div>

              <div>

              
            <label htmlFor="phone">Contact Number<span style={{color:"red", fontFamily: "sans-serif"}}>*</span>:  </label>
            <input
              type="number"
              name="phone"
              ref={phoneRef}
              className="cust_phone"
            />
              </div>

              <div>
            <label htmlFor="gmail" className="gmail">
              Mail<span style={{color:"red", fontFamily: "sans-serif"}}>*</span>:  
            </label>
            <input
              type="mail"
              ref={mailRef}
              name="mail"
              className="cust_gmail"
            />
            </div>
            <br />
            <div>
            <label htmlFor="cust_add">Address<span style={{color:"red", fontFamily: "sans-serif"}}>*</span>:  </label>
            <textarea
              type="text"
              className="cust_add"
              ref={addRef}
              name="custAdd"
            />
            </div>
          </div>
          <div className="error_div">{error}</div>
          <div className="inventory_data_table_outer">
            <DataTable
              columns={orderColumns}
              data={inventory}
              fixedHeader:true
              selectableRows
              pagination
              // onSelectedRowsChange={handleRowSelected}
            />
          </div>
          <div className="submit_order_outer">

          <button className="submit_order" onClick={handleSubmitOrder}>
            Submit
          </button>
          <div className="total_amt">Total: {grandTotal}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetails;

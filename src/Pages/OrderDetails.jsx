// form validations to be done
// form is gettig submitted after hitting enter
// cash or upi option remaining

import React, { useEffect, useRef } from "react";
import "../css/individualPostContainer.css";
import DataTable from "react-data-table-component";
const OrderDetails = ({
  orderColumns,
  inventory,
  setInventory,
  handleRowSelected,
  customerData,
  setCustomerData,
  sales,
  setSales,
  grandTotal,
  salesId,
  setSalesId,
  error,
  setError,
}) => {
  const nameRef = useRef("");
  const addRef = useRef("");
  const mailRef = useRef("");
  const phoneRef = useRef(0);

  const handleSubmitOrder = (event) => {
    event.preventDefault();

    // final customer data with books , customer, total details
    const finalCustomerOrder = {
      salesId: salesId,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      custAdd: addRef.current.value,
      mail: mailRef.current.value,
      books: customerData,
      totalAmount: grandTotal,
    };
    // updating sales
    const newSales = [...sales, finalCustomerOrder];
    setSales(newSales);

    // updating inventory because stocks will be reduced
    const updatedInventory = inventory.map((row) =>
      customerData.some((r) => r.id === row.id)
        ? {
            ...row,
            stock:
              inventory.find((x) => x.id === row.id).stock -
              customerData.find((x) => x.id === row.id).quantity,
            total: 0,
          }
        : row
    );
    setInventory(updatedInventory);

    setSalesId((prev) => prev + 1);

    // setting customer books array to null
    setCustomerData([]);

    // setting input field value to none
    nameRef.current.value = "";
    phoneRef.current.value = "";
    mailRef.current.value = "";
    addRef.current.value = "";
  };
  // useEffect(() => {
  //   console.log(grandTotal);
  // }, [grandTotal]);
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              ref={nameRef}
              className="cust_name"
            />
            </div>

              <div>

              
            <label htmlFor="phone">Contact Number</label>
            <input
              type="number"
              name="phone"
              ref={phoneRef}
              className="cust_phone"
            />
              </div>

              <div>
            <label htmlFor="gmail" className="gmail">
              Mail
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
            <label htmlFor="cust_add">Address</label>
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
              onSelectedRowsChange={handleRowSelected}
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

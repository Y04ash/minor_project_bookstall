
import React from "react";
import "../css/individualPostContainer.css";

import DataTable from "react-data-table-component";
const Customers = ({ orderColumns, inventory, sales }) => {
  const custHistoryColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
  ];
  return (
    <div className="customers_container">
      <h1>Customer Details</h1>

      {
        sales.length===0 
        ? <h2>No customer Records yet</h2>
        : <div className="customer_details_outer">
        {sales.map((sale) => {
          return (
            <div className="customer_order">
              <div className="history_cust_general">
                <div className="history_cust_heading">
                  <h3 className="sales_id">Sales Id: {sale.salesId}</h3>
                  
                  <h3><span className="name_span">Name</span>: {sale.name}</h3>
                </div>
                <p className="history_cust_add">Address: {sale.custAdd} </p>
                <div className="cust_other_details">
                  <p className="history_cust_phone">Phone Number: {sale.phone}</p>
                  <p className="history_cust_mail">Mail: {sale.mail}</p>
                  <p className="history_cust_total">Total Amount: {sale.totalAmount}</p>
                </div>
              </div>
              <div className="cust_books_details">
                <DataTable
                  columns={custHistoryColumns}
                  data={sale.books}
                  pagination
                />
              </div>
            </div>
          );
        })}
      </div>
      }
      
    </div>
  );
};

export default Customers;

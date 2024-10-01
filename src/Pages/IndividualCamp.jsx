import React, { useEffect, useState } from "react";

import Inventory from "./Inventory";
import Customers from "./Customers";
import OrderDetails from "./OrderDetails";
import "../css/individualPostContainer.css";
const IndividuaPost = () => {
  const initialInventory = [
    {
      id: 1,
      title: "Upanishad Ganga",
      stock: 30,
      quantity: 0,
      price: 10,
      total: 0,
    },
    {
      id: 2,
      title: "Bhagwat Gita",
      stock: 20,
      quantity: 0,
      price: 25,
      total: 0,
    },
    {
      id: 3,
      title: "Vishnu Puran",
      stock: 20,
      quantity: 0,
      price: 15,
      total: 0,
    },
    { id: 4, title: "Shiv Puran", stock: 20, quantity: 0, price: 60, total: 0 },
    { id: 5, title: "Ashwamedh", stock: 10, quantity: 0, price: 30, total: 0 },
  ];

  const [individualPage, setIndividualPage] = useState("orderDetails");
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState(initialInventory);
  const [customerData, setCustomerData] = useState([]); // Only selected rows with input
  const [grandTotal, setGrandTotal] = useState(0);
  const [salesId, setSalesId] = useState(1);
  const [error, setError] = useState("");
  const [campEnded,setCampEnded]=useState(false)
  // if row is selected then flag it
  const isRowSelected = (rowId) => {
    return customerData.some((row) => row.id === rowId);
  };

  // handling row selection
  const handleRowSelected = (state) => {
    // adding all sected row in 'selected' variable
    const selected = state.selectedRows.map((row) => ({
      ...row,
      quantity: customerData.find((item) => item.id === row.id)?.quantity || 0,
      total: customerData.find((item) => item.id === row.id)?.total || 0,
    }));

    // updating the customerData : adding all rows that are selected
    setCustomerData(selected);

    // setting total and quantity to 0 if row is deselected
    const temp = inventory.map((row) =>
      state.selectedRows.some((r) => r.id == row.id)
        ? row
        : { ...row, quantity: 0, total: 0 }
    );
    setInventory(temp);

    // setting err as "" if 1st qunt exceed and then the row is deselected
    if (
      customerData.some(
        (x) => x.quantity >= inventory.find((r) => r.id === x.id).stock
      )
    ) {
      setError("Order exceeds stock");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    console.log("in after de ", inventory);
  }, [inventory]);
  // Handle input change
  const handleInputChange = async (event, rowId) => {
    const value = Number(event.target.value);

    if (customerData.find((x) => x.id == rowId).stock >= value) {
      setError("");

      // updating qunatity and total of each row
      const updatedSelectedRows = customerData.map((row) =>
        row.id === rowId
          ? { ...row, quantity: value, total: row.price * value }
          : row
      );

      setCustomerData(updatedSelectedRows);

      // updating inventory  setting its quant and total
      setInventory((prevData) =>
        prevData.map((r) =>
          r.id == rowId ? { ...r, quantity: value, total: r.price * value } : r
        )
      );
    } else {
      setError("quantity greater than stock");
    }
  };
  useEffect(() => {
    // setting the total
    setGrandTotal(customerData.reduce((sum, obj) => sum + obj.total, 0));
  }, [inventory, customerData]);

  const orderColumns = [
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
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Quantity",
      cell: (row) =>
        isRowSelected(row.id) ? (
          <input
            type="text"
            // value={row.quantity || ""}
            onChange={(event) => handleInputChange(event, row.id)}
            placeholder="Enter quantity"
          />
        ) : (
          0
        ),
      ignoreRowClick: true,
      allowOverflow: true,
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
  const handleEndCamp = () => {
    setCampEnded(true)
  };
  const handleInventory = () => {
    setIndividualPage("inventory");
  };
  const handleCustomers = () => {
    setIndividualPage("customers");
  };
  const handleOrder = () => {
    setIndividualPage("orderDetails");
  };
  return (
    <div className="individual_post_container">
      <div className="individual_btn">
        <button className="end_camp" onClick={handleEndCamp}>
          End Campaign
        </button>
        <button className="camp_btn inventory" onClick={handleInventory}>
          Inventory
        </button>
        <button className="camp_btn customer_list" onClick={handleCustomers}>
          Customers{" "}
        </button>
        { !campEnded &&( <button className="camp_btn order_details" onClick={handleOrder}>
          Order Details
        </button> )}
        
      </div>

      {individualPage == "inventory" && (
        <Inventory
          orderColumns={orderColumns}
          inventory={inventory}
          sales={sales}
          setSales={setSales}
        />
      )}
      {individualPage == "customers" && (
        <Customers
          orderColumns={orderColumns}
          inventory={inventory}
          sales={sales}
          setSales={setSales}
          grandTotal={grandTotal}
        />
      )}
      {individualPage == "orderDetails" && (
        <OrderDetails
          orderColumns={orderColumns}
          inventory={inventory}
          setInventory={setInventory}
          sales={sales}
          setSales={setSales}
          handleRowSelected={handleRowSelected}
          customerData={customerData}
          setCustomerData={setCustomerData}
          grandTotal={grandTotal}
          salesId={salesId}
          setSalesId={setSalesId}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};

export default IndividuaPost;

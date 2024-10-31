import React, { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import "../css/individualPostContainer.css";
import { useParams } from "react-router-dom";const Inventory = ({ orderColumns, inventory, newPurchase, setNewPurchase,purchase }) => {
  const [revenue,setRevenue] = useState(0)
  const [totalSale,setTotalSale] = useState(0)
  const [totalPurchase,setTotalPurchase] = useState(purchase)
  const { campaignId } = useParams();
const parsedCampaignId = Number(campaignId);


  useEffect(() => {
    const campaignPurchases = purchase.filter((p) =>  p.campaignId === parsedCampaignId );
    setTotalPurchase(campaignPurchases)

    console.log(totalPurchase)
  }, [ purchase]);

  const inventoryColumns = [
    {
      name: "ID",
      selector: (row) => row.bookId,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.quantity,
      sortable: true,
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const calculateRevenueAndSales = (totalPurchase) => {
    const rev = totalPurchase.reduce((acc, r) => acc + r.totalAmount, 0);
  
    // Calculate total sales by summing orders across all books in each purchase
    const sales = totalPurchase.reduce((acc, r) => {
      const bookSales = r.books.reduce((bookAcc, book) => bookAcc + book.order, 0);
      return acc + bookSales;
    }, 0);
  
    return { rev, sales };
  };
  


  return (
    <div className="inventory">
      <h1>Inventory for today</h1>
      <div className="total_revenue">
        <h3 className="revenue_title">Total Revenue: Rs. <span className="revenue"> {calculateRevenueAndSales(totalPurchase).rev}</span> </h3>
        
      </div>
      <div className="total_sales">
        <h3 className="revenue_sales">Total Books Sold: <span className="revenue"> {calculateRevenueAndSales(totalPurchase).sales}</span> </h3>
        
      </div>

      <div className="inventory_data_table_outer">
        <DataTable
          // title="Book List with Stock and Input"
          columns={inventoryColumns}
          data={inventory}
          // selectableRows
          fixedHeader:true
          pagination
        />
      </div>
    </div>
  );
};

export default Inventory;

import React from "react";
import DataTable from "react-data-table-component";
import "../css/individualPostContainer.css";
const Inventory = ({ orderColumns, inventory }) => {
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
  return (
    <div className="inventory">
      <h1>Inventory for today</h1>
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

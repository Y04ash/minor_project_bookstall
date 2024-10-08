import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { IoChevronBack } from "react-icons/io5";
const BooksForm = ({ formData, setFormData, isBooksForm, setIsBooksForm }) => {
  const initialData = [
    { id: 1, title: "Upanishad Ganga", stock: 100, quantity: 0 },
    { id: 2, title: "Bhagwat Gita", stock: 65, quantity: 0 },
    { id: 3, title: "Vishnu Puran", stock: 36, quantity: 0 },
    { id: 4, title: "Shiv Puran", stock: 32, quantity: 0 },
    { id: 5, title: "Ashwamedh", stock: 58, quantity: 0 },
    { id: 6, title: "Ganesh puran", stock: 71, quantity: 0 },
    { id: 7, title: "Bhajan book", stock: 62, quantity: 0 },
    { id: 8, title: "Art of meditation", stock: 98, quantity: 0 },
    { id: 9, title: "science of learning", stock: 12, quantity: 0 },
    { id: 10, title: "spirituality", stock: 98, quantity: 0 },
    { id: 11, title: "law of attraction", stock: 44, quantity: 0 },
    { id: 12, title: "Ramakrishna biography", stock: 82, quantity: 0 },
    { id: 13, title: "sharada devi biography", stock: 98, quantity: 0 },
  ];

  const [data, setData] = useState(initialData); // All rows data
  const [selectedRows, setSelectedRows] = useState([]); // Only selected rows with input
  const [records, setRecords] = useState(data);
  const [error, setError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  //handle filter
  const handleFilter = (event) => {
    const newData = data.filter((row) =>
      row.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  // Handle input change
  const handleInputChange = (event, rowId) => {
    const value = Number(event.target.value);

    if (selectedRows.find((x) => x.id == rowId).stock >= value) {
      setError("");
      // Update input in the data array
      const updatedData = data.map((row) =>
        row.id === rowId ? { ...row, quantity: value } : row
      );
      setData(updatedData);

      // Update input in the selectedRows array
      const updatedSelectedRows = selectedRows.map((row) =>
        row.id === rowId ? { ...row, quantity: value } : row
      );
      setSelectedRows(updatedSelectedRows);
      

      // console.log("q is ",(selectedRows.map((x)=> x.quantity)))
      // console.log("s is",(selectedRows.map((x)=> x.quantity)))
    } else {
      setError("Not enough in stock!");
    }
  };

  // Handle row selection
  const handleRowSelected = (state) => {
    const selected = state.selectedRows.map((row) => ({
      ...row,
      quantity: data.find((item) => item.id === row.id)?.quantity || 0,
    }));
    setSelectedRows(selected); // Update selectedRows with the corresponding input values
  };

  useEffect(() => {
    console.log("Selected Rows with Inputs:", selectedRows);
  }, [selectedRows]);

  // Check if the row is selected
  const isRowSelected = (rowId) => {
    return selectedRows.some((row) => row.id === rowId);
  };

  const columns = [
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
        ) : null,
      ignoreRowClick: true,
      allowOverflow: true,
      sortable: true,
    },
  ];

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
      selector: (row) => row.quantity,
      sortable: true,
    },
  ];

  const handleSubmitClick = () => {
    setIsSubmitClicked(true);
  };

  return (
    <div className="books_form">
      <IoChevronBack
        className="back_btn"
        onClick={() => setIsBooksForm(false)}
      />
      <div className="books_form_title">
        <h1>Select books</h1>
      </div>
      <div className="secondary_message">
        <span className="error_div">{error}</span>
        <div className="text-end">
          <input
            type="text"
            placeholder="Search Books..."
            onChange={handleFilter}
          />
        </div>
      </div>
      <DataTable
        title="Book List with Stock and Input"
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
        onSelectedRowsChange={handleRowSelected}
      />
      <div className="summary_title">
        <h1>Order Summary</h1>
      </div>
      <DataTable title="Order" columns={orderColumns} data={selectedRows} />
      {isSubmitClicked && (
        <div className="success_div">
          <h1 className="success">Success!</h1>
          <button className="ok_btn" ><a href="/campaign">OK</a></button>
        </div>
      )}

      <div className="genral_details_inbooks_form">
        <div className="twin_input">
          <div className="input_field">
            <h1 className="heading">Campaign Title</h1>

            <p>{formData.title}</p>
          </div>

          <div className="input_field">
            <h1 className="heading">CDate:</h1>

            <p>{formData.date}</p>
          </div>
        </div>

        <div className="twin_input">
          <div className="input_field">
            <h1 className="heading">Seller's Name</h1>

            <p>{formData.sellerName}</p>
          </div>

          <div className="input_field">
            <h1 className="heading">Start Time:</h1>

            <p>{formData.startTime}</p>
          </div>
        </div>

        <div className="twin_input">
          <div className="input_field">
            <h1 className="heading">Occasion</h1>

            <p>{formData.occasion}</p>
          </div>
          <div className="input_field">
            <h1 className="heading">End Time:</h1>

            <p>{formData.endTime}</p>
          </div>
        </div>

        <div className="twin_input">
          <div className="input_field">
            <h1 className="heading">Address</h1>

            <p>{formData.address}</p>
          </div>
          <div className="input_field">
            <button className="final-submit-btn" onClick={handleSubmitClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksForm;

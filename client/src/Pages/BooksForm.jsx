// TODO:
// INPUTS VALUE ARE CHANGING AUTOMATICALLY AFTER FEW SEC OF SEARCH OR EITHER FIX IT
// ROWS ARE GETTING DESELECTED AFTER FILTER BUT AS LONG AS FINAL ARRAY IS FINE IT WILL WORK
// SINCE THE CATEGORY, SUBCATEGORY, BOOK TITLE WHICH ARE STATIC FIELD THAT ARE ALSO GETTING ADDED IN CAMPAIGN TABLE , ITS ALTERNATIVE IS TO RENDER IT FROM BOOKS TABLE TO AVOID REDUNDANCY
import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { IoChevronBack } from "react-icons/io5";
import { ImCross } from "react-icons/im";
const MemoizedDataTable = React.memo(DataTable);

const BooksForm = ({ formData, setFormData, isBooksForm, setIsBooksForm, data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [records, setRecords] = useState(data);
  const [error, setError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(()=>{
    const temp = data.map((r)=> 
      {
        return {...r,quantity:0}
      } )
    setRecords(temp)
  },[data])
  // Filter data
  // const handleFilter = useCallback((event) => {
  //   const searchText = event.target.value.toLowerCase();
  //   const filteredData = records.filter((row) => row.title.toLowerCase().includes(searchText));
  //   setRecords(filteredData);
  // }, [records]);

  useEffect(()=>{
    console.log(records)
  },[records])
  // Handle input change
  const handleInputChange = (event, rowId) => {
      const value = Number(event.target.value);
      const row = records.find((r) => r.bookId === rowId);

      if (row && row.stockQuantity >= value) {
        setError("");
        const updatedRecords = records.map((rec)=> rec.bookId == rowId ? {...rec,quantity: value} : rec)
        setRecords(updatedRecords)
      } else {
        setError("Not enough in stock!");
      }

    }
    
  

  // Update selected rows when quantity changes
  // useEffect(() => {
  //   const updatedSelectedRows = selectedRows.map((row) => ({
  //     ...row,
  //     quantity: quantities[row.bookId] || 0,
  //   }));
  //   setSelectedRows(updatedSelectedRows);
  // }, [quantities]); // Update only when quantities change

  // Handle row selection
  // const handleRowSelected = useCallback(
  //   (state) => {
  //     const selected = state.selectedRows.map((row) => ({
  //       ...row,
  //       quantity: quantities[row.bookId] || 0, // Ensure quantity is fetched from the state
  //     }));
  //     setSelectedRows(selected);
  //   },
  //   [quantities] // Include quantities to ensure selected rows have correct quantities
  // );

  // Table columns
  const columns = [
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
      selector: (row) => row.stockQuantity,
      sortable: true,
    },
    {
      name: "Quantity",
      cell: (row) =>(

        <input
          type="number"
          // value={order[row.bookId] || ""}
          onChange={(event) => handleInputChange(event, row.bookId)}
          placeholder="Enter quantity"
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];
  const summaryColumns = [
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
      selector: (row) => row.stockQuantity,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) =>row.quantity,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const handleOrderSummary = (recs)=> recs.filter((r)=> r.quantity>0)
  // handle submit button 
  const handleSubmitButton = async ()=>{
    try {
      
      const temp = records.filter((r)=>r.quantity>0)
      setSelectedRows(temp)
      const newCamp = { ...formData, books: temp }; // Adjusted to include selected rows
      console.log("newCamp",newCamp);
      const response = await fetch("http://localhost:5000/Add-campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCamp),
      });
      
      setIsSubmitClicked(true);
      
    } catch (error) {
      console.log("Error occurred while submitting:", error);
    }
      
    }
    
    // handle cross click
    
    const handleCorssClick = ()=>{
    setIsSubmitClicked(false);

  }

  return (
    <div className="books_form">
      <IoChevronBack className="back_btn" onClick={() => setIsBooksForm(false)} />
      <div className="books_form_title">
        <h1>Select books</h1>
      </div>
      <div className="secondary_message">
        <span className="error_div">{error}</span>
        {/* <div className="text-end">
          <input type="text" placeholder="Search Books..." onChange={handleFilter} />
        </div> */}
      </div>
      <MemoizedDataTable
        title="Book List with Stock and Input"
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
        // onSelectedRowsChange={handleRowSelected}
      />
      <div className="summary_title">
        <h1>Order Summary</h1>
      </div>
      <MemoizedDataTable title="Order" columns={summaryColumns} data={handleOrderSummary(records)} />
      {isSubmitClicked && (
        <div className="success_div">
          <ImCross className='cross' onClick={handleCorssClick}/>
          <h1 className="success">Success!</h1>
          <button className="ok_btn" >
            <a href="/Add-campaign">OK</a>
          </button>
        </div>
      )}
      <div className="genral_details_inbooks_form">
        <button className="final-submit-btn" onClick={handleSubmitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default BooksForm;

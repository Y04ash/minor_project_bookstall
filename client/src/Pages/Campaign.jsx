// search filter in camapign page

import React, { useState,useEffect } from "react";
import "../css/campaign.css";
import { Link } from 'react-router-dom';

const Campaign = () => {
  const [campaignList,setCampaignList] = useState([])
  // const campaignList = [
  //   {
  //     id:1,
  //     camp_title: "Campaign 1",
  //     occasion: "Chembur Fest",
  //     address: "Gandhi Maidan, near Chembur station road",
  //     date: "20/02/2023",
  //   },
  //   {
  //     id:2,
  //     camp_title: "Campaign 2",
  //     occasion: "Shivaji Park",
  //     address: "Dadar West, Mumbai, Maharashtra 400028",
  //     date: "02/02/2023",
  //   },
  //   {
  //     id:3,
  //     camp_title: "Campaign 3",
  //     occasion: "Public event",
  //     address: "Mahatma Gandhi Road, Mumbai, Maharashtra 400001",
  //     date: "22/05/2023",
  //   },
  //   {
  //     id:4,
  //     camp_title: "Campaign 4",
  //     occasion: "Cultural event",
  //     address: " Horniman Circle, Fort, Mumbai, Maharashtra 400001",
  //     date: "20/01/2023",
  //   },
  //   {
  //     id:5,
  //     camp_title: "Campaign 5",
  //     occasion: "Book Fair",
  //     address: " NESCO Complex,  Mumbai, Maharashtra 400063",
  //     date: "20/02/2023",
  //   },
  // ];

  useEffect(()=>{
    const fetchWarehouseData= async ()=>{
      try {
        console.log("inside fetch data in react campaign")
        const response = await fetch('http://localhost:5000/Campaign', {method:'GET'})
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Result:", result);

      // Check if the status is "ok" before updating the state
      if (result.status === "ok") {
          setCampaignList(result.data);
      } else {
          console.error('Unexpected response format:', result);
      }
      } catch (error) {
        console.log(error)
      }
    }
    console.log("inside useeffect")
    fetchWarehouseData()
  },[])


  // format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}


  return (
    <div className="campaign_section">
      <h2 className="campaign_title">Campaign History</h2>
      <div className="search_section">
        <form action="" className="search_form">
          {/* <input type="text" placeholder="Search..." className="search_bar" /> */}
        </form>
      </div>
      
      <div className="campaign_history">
        {campaignList.map((camp) => {
          return (
            <Link to={`/Campaign/${camp.campaignId}`} key={camp.campaignId}>
            <a  className="camp_post" >
              <div className="camp_title">
                <h3>{camp.campaignName}</h3>
              </div>
              <div className="camp_body">
                <ul> 
                  <li className="occasion">Camp ID:{camp.campaignId}</li>
                  <li className="address">Address: {camp.location}</li>
                  <li className="camp_date">Date: {formatDate(camp.startDate)}</li>
                </ul>
              <button className="read_more"  >
                <a href='/individual-camp'>Read More</a>
              </button>
              </div>
            </a>
            </Link>
          );
        })}


      </div>
    </div>
  );
};

export default Campaign;

// search filter in camapign page

import React from "react";
import "../css/campaign.css";
const Campaign = () => {
  const campaignList = [
    {
      id:1,
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      id:2,
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      id:3,
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      id:4,
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      id:5,
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
  ];


  return (
    <div className="campaign_section">
      <h2 className="campaign_title">Campaign History</h2>
      <div className="search_section">
        <form action="" className="search_form">
          <input type="text" placeholder="Search..." className="search_bar" />
        </form>
      </div>
      
      <div className="campaign_history">
        {campaignList.map((camp) => {
          return (
            
            <a href="/individual-camp" className="camp_post">
              <div className="camp_title">
                <h3>{camp.occasion}</h3>
              </div>
              <div className="camp_body">
                <ul> 
                  <li className="occasion">Occasion:{camp.occasion}</li>
                  <li className="address">Address: {camp.address}</li>
                  <li className="camp_date">Date: {camp.date}</li>
                </ul>
              <button className="read_more"  >
                <a href="/individual-camp">Read More</a>
              </button>
              </div>
            </a>
          );
        })}


      </div>
    </div>
  );
};

export default Campaign;

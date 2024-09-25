import React from "react";
import "../css/campaign.css";
const Campaign = () => {
  const campaignList = [
    {
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
    {
      camp_title: "Campaign 1",
      occasion: "Chembur Fest",
      address: "Gandhi Maidan, near Chembur station road",
      date: "20/02/2023",
    },
  ];
  return (
    <div className="campaign_section">
      <div className="search_section">
        <form action="" className="search_form">
          <input type="text" placeholder="Search..." className="search_bar" />
        </form>
      </div>
      <h2 className="campaign_title">Campaign History</h2>
      <div className="campaign_history">
        {campaignList.map((camp) => {
          return (
            <div className="camp_post">
              <div className="camp_title">
                <h3>{camp.occasion}</h3>
              </div>
              <div className="camp_body">
                <ul> 
                  <li className="occasion">Occasion:{camp.occasion}</li>
                  <li className="address">Address: {camp.address}</li>
                  <li className="camp_date">Date: {camp.date}</li>
                </ul>
              <button className="read_more">
                Read More
              </button>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default Campaign;

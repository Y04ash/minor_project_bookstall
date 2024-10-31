import React, { useState,useEffect } from "react";
import "../css/home.css";
import { MdCampaign } from "react-icons/md";
import AddCampaignButton from "../Components/AddCampaignButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
const Home = () => {
  const [recentCamps, setRecentCamps] = useState([])
  useState(()=>{
    const recent= async ()=>{
      try {
        const response = await fetch('http://localhost:5000/', {method:'GET'})
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("Result:", result);

      // Check if the status is "ok" before updating the state
      if (result.status === "ok") {
        setRecentCamps(result.data);
      } else {
          console.error('Unexpected response format:', result);
      }
      } catch (error) {
        console.log(error)
      }
    }
    // console.log("inside useeffect")
    recent()
  })


  return (
    <section className="home" id="home">
      <div className="home_title">
        <h1 className="home_title_h1">
          Welcome to <span className="bookstock">BookStockPro!</span> <br />{" "}
          Your bookstore, Your way! Managed perfectly!
        </h1>
      </div>
      {/* <div className="home_campaign_wrapper"> */}

      <h1 className="latest_campaign_title">Recent Campaigns</h1>
      <div className="campaign_cover">
        {/* <Slider {...settings}> */}
        {recentCamps.map((camp) => {
          return (
            <Link to={`/Campaign/${camp.campaignId}`} key={camp.campaignId}>
            <div className="latest_campaign">
              <p>{camp.campaignName}</p>
              <p>{camp.campagnId}</p>
              <p>Location: {camp.location}</p>

              <button className="repo_btn">Read More</button>
            </div>
            </Link>
          );
        })}
        {/* </Slider> */}
      </div>
      {/* </div> */}

      <div className="add_campaign_wrapper">
        <h1 className="add_campaign_title">Start your new campaign now</h1>
        <p className="add_campaign_para">Want to start your latest idea? Start building a campaign tailored to your goals. Click the 'Add Campaign' button to get started.</p>

        <AddCampaignButton />
      </div>
    </section>
  );
};

export default Home;

import React from "react";
import "../css/home.css";
import { MdCampaign } from "react-icons/md";
import AddCampaignButton from "../Components/AddCampaignButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
  const campaign = [
    {
      title:"Campaign Title",
      Location: "Shivaji Park, Dadar",
      occasion: "Books Fair",
      books_sold: "20",
    },
    {
      title:"Campaign Title",
      Location: "Shivaji Park, Dadar",
      occasion: "Books Fair",
      books_sold: "20",
    },
    {
      title:"Campaign Title",
      Location: "Shivaji Park, Dadar",
      occasion: "Books Fair",
      books_sold: "20",
    },

  ];
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

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
        {campaign.map((camp) => {
          return (
            <div className="latest_campaign">
              <p>{camp.title}</p>
              <p>Location: {camp.Location}</p>
              <p>Occasion: {camp.occasion}</p>
              <p>Books Sold: {camp.books_sold}</p>
              <button className="repo_btn">Report</button>
            </div>
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

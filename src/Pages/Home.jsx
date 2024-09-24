import React from 'react'
import '../css/home.css'
import { MdCampaign } from "react-icons/md";
import AddCampaignButton from '../Components/AddCampaignButton';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
    const campaign=[{
        Location:"Shivaji Park, Dadar",
        Seller: "Shreya",
        Total_books:"20"
    },
    {
        Location:"Shivaji Park, Dadar",
        Seller: "Shreya",
        Total_books:"20"
    },
    {
        Location:"Shivaji Park, Dadar",
        Seller: "Shreya",
        Total_books:"20"
    },
    {
        Location:"Shivaji Park, Dadar",
        Seller: "Shreya",
        Total_books:"20"
    },
   
]
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
        <h1>Welcome to BookStockPro!</h1>
        <p>With our advanced features, you can effortlessly connect with inventory management experts, optimize stock levels, and generate insightful reports to drive your book sales success.</p>
        </div>
        <div className="home_campaign_wrapper">
            <h1 className="recent_camp_title">
                Recent Campaign
            </h1>
        <Slider {...settings}>
        

            {
                campaign.map((camp)=>{
                    return(
                    <div className="latest_campaign">
                    <p>Location: {camp.Location}</p>
                    <p>Book Seller: {camp.Seller}</p>
                    <p>Total Books: {camp.Total_books}</p>
                    <button className="repo_btn">Report</button>
                </div>)
                })
            }
            </Slider>

  
        </div>
        
        <div className="add_campaign_wrapper">
            <h1>
            Easily create and manage campaigns to boost your book sales and track their performance all in one place.
            </h1>
            <AddCampaignButton />
            
        </div>
    </section>
  )
}

export default Home
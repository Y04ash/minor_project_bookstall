import React from 'react'
import '../css/home.css'
import { MdCampaign } from "react-icons/md";
const Home = () => {
  return (
    <section className="home" id="home">
        <div className="home_title">
        <h1>Welcome to BookStockPro!</h1>
        <p>With our advanced features, you can effortlessly connect with inventory management experts, optimize stock levels, and generate insightful reports to drive your book sales success.</p>
        </div>
        <div className="home_campaign_wrapper">
            
            <div className="first_box">
                <div className="campaign">
                    <h2>Latest <br /> Campaign</h2>
                </div>
            </div>
            <div className="latest_campaign">
                <p>Location: Park</p>
                <p>Book Seller: Shreya</p>
                <p>Total Books: 20</p>
                <button className="repo_btn">Report</button>
            </div>
            <div className="latest_campaign">
                <p>Location: Park</p>
                <p>Book Seller: Shreya</p>
                <p>Total Books: 20</p>
                <button className="repo_btn">Report</button>
            </div>
            <div className="latest_campaign">
                <p>Location: Park</p>
                <p>Book Seller: Shreya</p>
                <p>Total Books: 20</p>
                <button className="repo_btn">Report</button>
            </div>

        </div>
        
        <div className="add_campaign_wrapper">
            <h1>
            Easily create and manage campaigns to boost your book sales and track their performance all in one place.
            </h1>
            <button className="add_campaign_btn">
            Add Campaign
            </button>
            
        </div>
    </section>
  )
}

export default Home
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import '../css/footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer1">
        <ul className="footer_links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Campaign">Campaign</a>
          </li>
          <li>
            <a href="/Report">Report</a>
          </li>
        </ul>

        <div className="contact">Contact Us: +91 XXXXX XXXXX</div>
        <div className="mail">Email: test@test.com</div>
      </div>
      <div className="footer2">
      <FaInstagram />
      <FaTwitter />
      <FaFacebookF />
      </div>
    </footer>
  );
};

export default Footer;

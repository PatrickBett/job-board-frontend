import React from 'react'
import "./footer.css";
import { Link } from "react-router-dom";
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailIcon from '@mui/icons-material/Email';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
function Footer() {
  return (
    <div className="row text-white pt-5 pb-5 mt-5" id='footer'>
        <div className="col-md-4">
            <h5>Terms And Conditions</h5>
            <Link to='#' id='terms'>Terms and conditions of Use</Link>
        </div>

        <div className="col-md-4">
            <h5>Privacy Policy</h5>
            <CopyrightIcon />2024 - All Rights Reserved
        </div>

        <div className="col-md-4">
            <h5>Contact Us</h5>
            <LocalPhoneIcon />0791474737
            
            <br/>
            <EmailIcon /> patrickbett018@gmail.com
            
        </div>
    </div>
  )
}

export default Footer
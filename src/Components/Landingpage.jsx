import React, { useEffect } from 'react';
import './landingpage.css';
import { Link } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Landingpage() {
  
  // Add animation on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className="hero-section" id='landingpage'>
        <div className="hero-content">
          <h1 className='hero-title'>Bring top talent to your business, <strong>your way</strong></h1>
          <h5 className='hero-subtitle'>Build your dream team, fill skill gaps, and scale with our full-service, customizable Enterprise platform.</h5>
          <button className='hero-cta'>
            <Link to="/register" className='hero-cta-link'>
              Start Hiring Today <ArrowForwardIcon className="arrow-icon" />
            </Link>
          </button>
        </div>
        <div className="overlay"></div>
      </div>
      
      <div className="value-proposition">
        <div className="text-center">
          <h2 className="value-title animate-on-scroll">The #1 Job Site to Find Remote Jobs</h2>
          <p className="value-subtitle animate-on-scroll">No Ads, No Scams, Just Quality Opportunities</p>
        </div>
        
        <div className="features-container animate-on-scroll">
          <div className="feature-card">
            <div className="feature-icon">
              <CheckCircleIcon />
            </div>
            <div className="feature-content">
              <h3 className='feature-title'>Unlimited Job Search Resources</h3>
              <p className='feature-description'>Full access to all features including unlimited jobs, articles, and webinars to help you with your remote job search.</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <CheckCircleIcon />
            </div>
            <div className="feature-content">
              <h3 className='feature-title'>Higher Quality Listings</h3>
              <p className='feature-description'>Only legit jobs. No ads, scams, or junk to sift through. Our team spends 200+ hours/day verifying every job.</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <CheckCircleIcon />
            </div>
            <div className="feature-content">
              <h3 className='feature-title'>Save Time</h3>
              <p className='feature-description'>Go straight from job listings to applications. No more hopping from one job board to the next.</p>
            </div>
          </div>
        </div>
        
        <div className="cta-container">
          <button type='button' className='cta-button animate-on-scroll'>
            <Link to="/register" className='cta-link'>
              Get Started
            </Link>
          </button>
          <p className="cta-subtext animate-on-scroll">Join thousands of professionals who've found their dream remote jobs</p>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
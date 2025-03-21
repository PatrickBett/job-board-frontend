import React, { useState, useEffect } from 'react';
import api from '../api';
import './userprofile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/user/profile/");
      setProfile(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to load profile data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-container loading-container">
        <div className="loader"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container error-container">
        <div className="error-icon">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button className="retry-button" onClick={fetchProfile}>
          Try Again
        </button>
      </div>
    );
  }

  // Assuming the profile data structure from response.data
  // Adjust according to your actual API response structure
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover-photo"></div>
        <div className="profile-info-summary">
          <div className="profile-avatar">
            <img 
              src={profile?.avatar_url || "https://via.placeholder.com/150"} 
              alt="Profile avatar" 
            />
          </div>
          <div className="profile-name-info">
            <h1>{profile?.firstname} {profile?.lastname}</h1>
            <p className="username">@{profile?.username}</p>
            <p className="headline">{profile?.headline || "Job seeker at Mega-Jobs"}</p>
          </div>
          <button className="edit-profile-button">
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main-info">
          <div className="profile-section">
            <h2>About Me</h2>
            <p>{profile?.bio || "No bio information added yet."}</p>
          </div>

          <div className="profile-section">
            <h2>Contact Information</h2>
            <div className="profile-info-list">
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <span className="label">Email</span>
                  <span className="value">{profile?.email}</span>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <span className="label">Phone</span>
                  <span className="value">{profile?.phone || "Not provided"}</span>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <span className="label">Location</span>
                  <span className="value">{profile?.location || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Work Experience</h2>
            {profile?.experiences && profile.experiences.length > 0 ? (
              <div className="profile-experience-list">
                {profile.experiences.map((exp, index) => (
                  <div className="experience-item" key={index}>
                    <div className="experience-logo">
                      <img src={exp.company_logo || "https://via.placeholder.com/50"} alt={exp.company} />
                    </div>
                    <div className="experience-details">
                      <h3>{exp.title}</h3>
                      <p className="company">{exp.company}</p>
                      <p className="date">{exp.start_date} - {exp.end_date || "Present"}</p>
                      <p className="description">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data-message">No work experience added yet.</p>
            )}
          </div>

          <div className="profile-section">
            <h2>Education</h2>
            {profile?.education && profile.education.length > 0 ? (
              <div className="profile-education-list">
                {profile.education.map((edu, index) => (
                  <div className="education-item" key={index}>
                    <div className="education-logo">
                      <img src={edu.school_logo || "https://via.placeholder.com/50"} alt={edu.school} />
                    </div>
                    <div className="education-details">
                      <h3>{edu.degree}</h3>
                      <p className="school">{edu.school}</p>
                      <p className="date">{edu.start_year} - {edu.end_year || "Present"}</p>
                      <p className="field">{edu.field_of_study}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data-message">No education details added yet.</p>
            )}
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="profile-section skills-section">
            <h2>Skills</h2>
            {profile?.skills && profile.skills.length > 0 ? (
              <div className="skills-list">
                {profile.skills.map((skill, index) => (
                  <span className="skill-tag" key={index}>{skill}</span>
                ))}
              </div>
            ) : (
              <p className="no-data-message">No skills added yet.</p>
            )}
          </div>

          <div className="profile-section">
            <h2>Languages</h2>
            {profile?.languages && profile.languages.length > 0 ? (
              <ul className="languages-list">
                {profile.languages.map((lang, index) => (
                  <li key={index}>
                    <span className="language-name">{lang.name}</span>
                    <span className="language-level">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data-message">No languages added yet.</p>
            )}
          </div>

          <div className="profile-section">
            <h2>Job Interests</h2>
            {profile?.job_preferences ? (
              <div className="job-preferences">
                <p><strong>Job Types:</strong> {profile.job_preferences.job_types?.join(", ") || "Not specified"}</p>
                <p><strong>Work Locations:</strong> {profile.job_preferences.work_locations?.join(", ") || "Not specified"}</p>
                <p><strong>Preferred Industries:</strong> {profile.job_preferences.industries?.join(", ") || "Not specified"}</p>
              </div>
            ) : (
              <p className="no-data-message">No job preferences added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
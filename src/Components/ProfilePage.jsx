// ProfilePage.js - Main profile component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./userprofile.css";

function ProfilePage() {
  const [profile, setProfile] = useState({
    bio: "",
    location: "",
    birth_date: "",
    skills: [],
    languages: [],
    education: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  
  // New skill/language/education states
  const [newSkill, setNewSkill] = useState({ name: "", proficiency: "beginner" });
  const [newLanguage, setNewLanguage] = useState({ name: "", proficiency: "basic" });
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    current: false
  });



  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/profiles/me/");
      setProfile(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // If profile doesn't exist yet, create one
      if (error.response && error.response.status === 404) {
        try {
          await api.post("/api/profiles/", {});
          fetchProfile();
        } catch (createError) {
          console.error("Error creating profile:", createError);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  };




  useEffect(() => {
    fetchProfile();
  }, []);

  

  const handleUpdateProfile = async () => {
    try {
      await api.put(`/api/profiles/${profile.id}/`, {
        bio: profile.bio,
        location: profile.location,
        birth_date: profile.birth_date
      });
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Skills functions
  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/skills/", newSkill);
      setNewSkill({ name: "", proficiency: "beginner" });
      fetchProfile();
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await api.delete(`/api/skills/${skillId}/`);
      fetchProfile();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Languages functions
  const handleAddLanguage = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/languages/", newLanguage);
      setNewLanguage({ name: "", proficiency: "basic" });
      fetchProfile();
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  const handleDeleteLanguage = async (languageId) => {
    try {
      await api.delete(`/api/languages/${languageId}/`);
      fetchProfile();
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  // Education functions
  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/education/", newEducation);
      setNewEducation({
        institution: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        current: false
      });
      fetchProfile();
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  const handleDeleteEducation = async (educationId) => {
    try {
      await api.delete(`/api/education/${educationId}/`);
      fetchProfile();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar">
          <img src="/api/placeholder/150/150" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>Your Name</h2>
          <p className="profile-location">{profile.location || "Add your location"}</p>
        </div>
        <button 
          className="edit-profile-btn" 
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button 
          className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
        <button 
          className={`tab-btn ${activeTab === "languages" ? "active" : ""}`}
          onClick={() => setActiveTab("languages")}
        >
          Languages
        </button>
        <button 
          className={`tab-btn ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
      </div>

      <div className="profile-content">
        {/* About Tab */}
        {activeTab === "about" && (
          <div className="profile-about">
            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    placeholder="Tell us about yourself"
                    rows="5"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profile.location || ""}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    placeholder="City, Country"
                  />
                </div>
                <div className="form-group">
                  <label>Birth Date</label>
                  <input
                    type="date"
                    value={profile.birth_date || ""}
                    onChange={(e) => setProfile({...profile, birth_date: e.target.value})}
                  />
                </div>
                <button className="save-btn" onClick={handleUpdateProfile}>Save Changes</button>
              </div>
            ) : (
              <div className="bio-section">
                <h3>About Me</h3>
                <p>{profile.bio || "No bio added yet."}</p>
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="profile-skills">
            <h3>Skills</h3>
            
            <div className="skills-list">
              {profile.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill) => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className={`proficiency-badge ${skill.proficiency}`}>
                        {skill.proficiency}
                      </span>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-message">No skills added yet.</p>
              )}
            </div>
            
            <div className="add-form">
              <h4>Add New Skill</h4>
              <form onSubmit={handleAddSkill}>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                    required
                  />
                  <select
                    value={newSkill.proficiency}
                    onChange={(e) => setNewSkill({...newSkill, proficiency: e.target.value})}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <button type="submit" className="add-btn">Add Skill</button>
              </form>
            </div>
          </div>
        )}

        {/* Languages Tab */}
        {activeTab === "languages" && (
          <div className="profile-languages">
            <h3>Languages</h3>
            
            <div className="languages-list">
              {profile.languages && profile.languages.length > 0 ? (
                profile.languages.map((language) => (
                  <div key={language.id} className="language-item">
                    <div className="language-info">
                      <span className="language-name">{language.name}</span>
                      <span className={`proficiency-badge ${language.proficiency}`}>
                        {language.proficiency}
                      </span>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteLanguage(language.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-message">No languages added yet.</p>
              )}
            </div>
            
            <div className="add-form">
              <h4>Add New Language</h4>
              <form onSubmit={handleAddLanguage}>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Language name"
                    value={newLanguage.name}
                    onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
                    required
                  />
                  <select
                    value={newLanguage.proficiency}
                    onChange={(e) => setNewLanguage({...newLanguage, proficiency: e.target.value})}
                  >
                    <option value="basic">Basic</option>
                    <option value="conversational">Conversational</option>
                    <option value="fluent">Fluent</option>
                    <option value="native">Native</option>
                  </select>
                </div>
                <button type="submit" className="add-btn">Add Language</button>
              </form>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="profile-education">
            <h3>Education</h3>
            
            <div className="education-list">
              {profile.education && profile.education.length > 0 ? (
                profile.education.map((edu) => (
                  <div key={edu.id} className="education-item">
                    <div className="education-info">
                      <h4>{edu.institution}</h4>
                      <p>{edu.degree} • {edu.field_of_study}</p>
                      <p className="edu-dates">
                        {new Date(edu.start_date).getFullYear()} - {
                          edu.current ? 
                          'Present' : 
                          (edu.end_date ? new Date(edu.end_date).getFullYear() : '')
                        }
                      </p>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteEducation(edu.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-message">No education history added yet.</p>
              )}
            </div>
            
            <div className="add-form">
              <h4>Add Education</h4>
              <form onSubmit={handleAddEducation}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Degree (e.g. Bachelor's)"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={newEducation.field_of_study}
                    onChange={(e) => setNewEducation({...newEducation, field_of_study: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={newEducation.start_date}
                      onChange={(e) => setNewEducation({...newEducation, start_date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={newEducation.end_date}
                      onChange={(e) => setNewEducation({...newEducation, end_date: e.target.value})}
                      disabled={newEducation.current}
                    />
                  </div>
                </div>
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="current-education"
                    checked={newEducation.current}
                    onChange={(e) => setNewEducation({...newEducation, current: e.target.checked})}
                  />
                  <label htmlFor="current-education">I currently study here</label>
                </div>
                <button type="submit" className="add-btn">Add Education</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
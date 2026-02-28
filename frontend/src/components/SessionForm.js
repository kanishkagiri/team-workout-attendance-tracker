import React, { useState } from "react";
import API from "../services/api";

function SessionForm({ fetchSessions, goToDashboard }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sessions", formData);
      setFormData({ title: "", date: "", description: "" });
      fetchSessions();
      goToDashboard();
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to create session. Please try again.");
    }
  };

  return (
    <section className="card form-card">
      <h2>Create Session</h2>
      <form onSubmit={handleSubmit} className="member-form">
        <label htmlFor="title">Session Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="e.g. Morning Workout"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">Session Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="e.g. Leg day"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary">
          Save Session
        </button>
      </form>
    </section>
  );
}

export default SessionForm;
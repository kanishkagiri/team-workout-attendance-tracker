import React, { useEffect, useState } from "react";
import API from "../services/api";

function EditModal({ member, close, fetchMembers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
      });
    }
  }, [member]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/members/${member._id}`, formData);
      fetchMembers();
      close();
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Member</h2>

        <form onSubmit={handleSave} className="member-form">
          <label htmlFor="edit-name">Name</label>
          <input
            id="edit-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="edit-email">Email</label>
          <input
            id="edit-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="edit-phone">Phone</label>
          <input
            id="edit-phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-cancel" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;

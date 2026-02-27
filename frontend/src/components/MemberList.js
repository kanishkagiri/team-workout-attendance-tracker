import React from "react";
import API from "../services/api";

function MemberList({ members, fetchMembers, openEdit }) {
  const safeMembers = Array.isArray(members) ? members : [];

  const handleDelete = async (id) => {
    try {
      await API.delete(`/members/${id}`);
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member. Please try again.");
    }
  };

  return (
    <section className="card">
      {safeMembers.length === 0 ? (
        <p className="status-text">No members found.</p>
      ) : (
        <div className="member-list">
          {safeMembers.map((member) => (
            <div key={member._id} className="member-row">
              <span className="member-name">{member.name}</span>

              <div className="row-actions">
                <button
                  type="button"
                  className="btn btn-edit"
                  onClick={() => openEdit(member)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => handleDelete(member._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MemberList;

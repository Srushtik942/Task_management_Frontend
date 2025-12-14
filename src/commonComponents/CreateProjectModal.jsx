import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateProjectModal = ({ isOpen, onClose, onSuccess }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create project");
        return;
      }

      toast.success("Project created successfully");
      onSuccess?.();
      onClose();

      setName("");
      setDescription("");
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 text-black flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[420px] rounded-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Project Name"
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Project Description"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;

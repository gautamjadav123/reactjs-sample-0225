import React, { useState, useEffect } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const TaskModal = ({ isOpen, onClose, editingTask = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens or editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask, isOpen]);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      if (editingTask) {
        console.log("Updating task:", editingTask.id);
        const taskRef = doc(db, "tasks", editingTask.id);
        await updateDoc(taskRef, {
          title,
          description,
        });
        console.log("Update successful");
      } else {
        console.log("Adding new task...");
        await addDoc(collection(db, "tasks"), {
          title,
          description,
          status: "todo",
        });
        console.log("Add successful");
      }

      // Reset form & close modal
      setTitle("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Error saving task:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : editingTask ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

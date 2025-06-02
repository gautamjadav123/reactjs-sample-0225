// src/components/TaskCard.js
import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const TaskCard = ({ task, onEdit }) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const handleMove = async (direction) => {
    const newStatus =
      direction === "forward"
        ? task.status === "todo"
          ? "inprogress"
          : "done"
        : task.status === "done"
        ? "inprogress"
        : "todo";

    await updateDoc(doc(db, "tasks", task.id), {
      status: newStatus,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-2">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p>{task.description}</p>
      <div className="flex justify-between mt-2">
        <div className="space-x-2">
          {task.status !== "todo" && (
            <button
              onClick={() => handleMove("backward")}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              ◀
            </button>
          )}
          {task.status !== "done" && (
            <button
              onClick={() => handleMove("forward")}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              ▶
            </button>
          )}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="bg-blue-600 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

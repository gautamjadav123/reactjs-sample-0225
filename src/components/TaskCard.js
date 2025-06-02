// src/components/TaskCard.js
import React from "react";

const TaskCard = ({ task }) => (
  <div className="bg-white shadow-md rounded p-4 mb-4">
    <h3 className="text-lg font-bold">{task.title}</h3>
    <p>{task.description}</p>
    <p className="text-sm text-gray-500 mt-2">Status: {task.status}</p>
  </div>
);

export default TaskCard;

// src/pages/Board.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = (status) =>
    tasks.filter((task) => task.status === status);

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            setEditingTask(null);
            setModalOpen(true);
          }}
        >
          + Add Task
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["todo", "inprogress", "done"].map((status) => (
            <div key={status} className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-bold capitalize mb-2">{status}</h2>
              {filteredTasks(status).map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEdit} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={handleCloseModal} // you already have this function
        editingTask={editingTask} // pass editingTask here
      />
    </div>
  );
};

export default Board;

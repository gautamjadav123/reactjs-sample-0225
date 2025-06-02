// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
    <h1 className="text-4xl font-bold mb-6">Welcome to TaskBoard</h1>
    <Link to="/board" className="bg-blue-600 text-white px-6 py-3 rounded">
      Go to Board
    </Link>
  </div>
);

export default Home;

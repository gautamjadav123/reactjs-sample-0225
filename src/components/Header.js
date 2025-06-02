// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
    <h1 className="text-xl font-bold">TaskBoard</h1>
    <div className="space-x-4">
      <Link to="/board">Board</Link>
      <Link to="/profile">Profile</Link>
    </div>
  </div>
);

export default Header;

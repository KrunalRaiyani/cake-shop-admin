import React from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../contexts/AuthContext.jsx";

const Navbar = () => {
  const { token, logout } = useAppContext();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-teal-600">
          <NavLink to="/">MyDashboard</NavLink>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-teal-600 font-semibold" : "text-gray-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-teal-600 font-semibold" : "text-gray-600"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "text-teal-600 font-semibold" : "text-gray-600"
            }
          >
            Orders
          </NavLink>
          {token && (
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

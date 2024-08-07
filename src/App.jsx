import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import { useAppContext } from "./contexts/AuthContext";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const PrivateRoute = () => {
    const { token } = useAppContext();
    return token ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <main className="p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;

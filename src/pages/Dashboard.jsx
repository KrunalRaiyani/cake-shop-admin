import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AuthContext.jsx";
import { getDashboardData } from "../services/api";

const Dashboard = () => {
  const { token } = useAppContext();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  function formatName(name) {
    let formattedName = name.replace(/_/g, " ");
    formattedName = formattedName.replace(/([a-z])([A-Z])/g, "$1 $2");
    formattedName = formattedName.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );

    return formattedName;
  }
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData(token);
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen text-black">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
          Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Skeleton for Total Products */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-6 bg-gray-300 rounded w-2/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>

          {/* Skeleton for Low Stock Products */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-6 bg-gray-300 rounded w-2/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>

          {/* Skeleton for Total Revenue */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-6 bg-gray-300 rounded w-2/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Skeleton for Products By Category */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Skeleton for Orders By Status */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Skeleton for Recent Orders with Images */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-md mr-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Products */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Total Products</h3>
          <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Low Stock Products</h3>
          <p className="text-2xl font-bold">{dashboardData.lowStockProducts}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
          <p className="text-2xl font-bold">₹{dashboardData.totalRevenue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Products By Category */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Products By Category</h3>
          <ul>
            {dashboardData.productsByCategory.map((category) => (
              <li key={category.category} className="flex justify-between mb-2">
                <span className="font-medium capitalize">
                  {formatName(category.category)}:
                </span>
                <span>{category.orders}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Orders By Status */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Orders By Status</h3>
          <ul>
            {Object.entries(dashboardData.ordersByStatus).map(
              ([status, count]) => (
                <li key={status} className="flex justify-between mb-2">
                  <span className="font-medium capitalize">
                    {formatName(status)}:
                  </span>
                  <span>{count}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Recent Orders with Images */}
      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold p-4">Recent Orders</h3>
        <div className="p-4">
          {dashboardData.recentOrders.map((order) => (
            <div key={order._id} className="mb-6">
              <h4 className="text-sm mb-2">Order ID: {order._id}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <img
                      src={
                        item.product?.image || "https://via.placeholder.com/96"
                      }
                      alt={item.product?.name || "Product Image"}
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="font-medium text-lg">
                        {item.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">
                        Price: ₹{item.product?.price || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

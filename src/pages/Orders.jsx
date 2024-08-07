import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AuthContext.jsx";
import { getOrders, getOrderById, updateOrderStatus } from "../services/api";
import Modal from "../components/Modal";

const Orders = () => {
  const { token } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, [token]);

  const handleViewOrder = async (orderId) => {
    try {
      const order = await getOrderById(orderId, token);
      setSelectedOrder(order);
      setStatus(order.status); // Set initial status in the dropdown
      setUpdateId(orderId); // Set the ID to update
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch order:", error);
    }
  };

  const handleUpdateOrderStatus = async () => {
    try {
      await updateOrderStatus(updateId, { status }, token);
      const data = await getOrders(token);
      setOrders(data);
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const resetModal = () => {
    setStatus("");
    setUpdateId(null);
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
        Order Management
      </h2>
      {/* Order Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          resetModal();
        }}
      >
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>
        {selectedOrder && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold">Order ID:</h4>
              <p>{selectedOrder._id}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">User:</h4>
              <p>
                {selectedOrder.user.name} ({selectedOrder.user.email})
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Items:</h4>
              <ul>
                {selectedOrder.items.map((item) => (
                  <li key={item._id}>
                    {item.product ? item.product.name : "Unknown Product"} -
                    Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Total Price:</h4>
              <p>₹{selectedOrder.totalAmount}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Current Status:</h4>
              <p>{selectedOrder.status}</p>
            </div>
            <div className="mt-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
              >
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="complete">Complete</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleUpdateOrderStatus}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
              >
                Update Status
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  resetModal();
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
      <div className="bg-white rounded-lg shadow-md mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Total Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="py-3 px-6">{order._id}</td>
                <td className="py-3 px-6">{order.user.name}</td>
                <td className="py-3 px-6">₹{order.totalAmount}</td>
                <td className="py-3 px-6">{order.status}</td>
                <td className="py-3 px-6">
                  <div className="flex h-full w-full items-center">
                    <button
                      onClick={() => handleViewOrder(order._id)}
                      className="bg-teal-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

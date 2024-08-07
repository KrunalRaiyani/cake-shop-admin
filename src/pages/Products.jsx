import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AuthContext.jsx";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import Modal from "../components/Modal";

const Products = () => {
  const { token } = useAppContext();
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(token);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  const handleAddOrUpdateProduct = async () => {
    try {
      const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        stock: productStock,
        category: productCategory,
        image: productImage,
      };
      if (updateId) {
        await updateProduct(updateId, productData, token);
      } else {
        await createProduct(productData, token);
      }
      resetForm();
      const data = await getProducts(token);
      setProducts(data);
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleUpdateProduct = (product) => {
    setUpdateId(product._id);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setProductStock(product.stock);
    setProductCategory(product.category);
    setProductImage(product.image);
    setModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(confirmDeleteId, token);
      const data = await getProducts(token);
      setProducts(data);
      setConfirmModalOpen(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductStock("");
    setProductCategory("");
    setProductImage("");
    setUpdateId(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
        Product Management
      </h2>
      <button
        onClick={() => {
          resetForm();
          setModalOpen(true);
        }}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
      >
        Add New Product
      </button>
      {/* Product Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">
          {updateId ? "Update Product" : "Add New Product"}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            placeholder="Stock Quantity"
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            placeholder="Product Category"
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder="Product Image URL"
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleAddOrUpdateProduct}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
            >
              {updateId ? "Update Product" : "Add Product"}
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-4">Are you sure you want to delete this product?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleDeleteProduct}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => setConfirmModalOpen(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className="bg-white rounded-lg shadow-md mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-3 px-6">
                  <img
                    src={product.image}
                    alt={product.name}  
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">{product.description}</td>
                <td className="py-3 px-6">₹{product.price}</td>
                <td className="py-3 px-6">{product.stock}</td>
                <td className="py-3 px-6">{product.category}</td>
                <td className="py-3 px-6">
                  <div className="flex h-full w-full items-center">
                    <button
                      onClick={() => handleUpdateProduct(product)}
                      className="bg-teal-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setConfirmDeleteId(product._id);
                        setConfirmModalOpen(true);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700 transition duration-200 ml-2"
                    >
                      Delete
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

export default Products;

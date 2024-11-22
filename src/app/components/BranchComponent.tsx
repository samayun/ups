"use client";

import React, { useState, useEffect, useRef } from "react";

interface Branch {
  _id: string;
  name: string;
  address: string;
  status: "active" | "inactive";
}

interface BranchFormData {
  name: string;
  address: string;
  status: "active" | "inactive";
}

const initialFormData: BranchFormData = {
  name: "",
  address: "",
  status: "active",
};

const BranchComponent = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [formData, setFormData] = useState<BranchFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBranches(); // Read operation
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await fetch("/api/branches");
      if (!res.ok) throw new Error("Failed to fetch branches");
      const data = await res.json();
      setBranches(data || []);
    } catch (error: any) {
      console.log("Error fetching branches:", error.message);
      setBranches([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleStatus = () => {
    setFormData({
      ...formData,
      status: formData.status === "active" ? "inactive" : "active",
    });
  };

  const saveBranch = async () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/branches/${editingId}` : "/api/branches";

    await fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    setFormData(initialFormData);
    setEditingId(null);
    setIsModalOpen(false);
    fetchBranches(); // Refresh list after save
  };

  const handleEditBranch = (branch: Branch) => {
    setFormData({
      name: branch.name,
      address: branch.address,
      status: branch.status,
    });
    setEditingId(branch._id);
    setIsModalOpen(true);
  };

  const handleDeleteBranch = (id: string) => {
    setBranchToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteBranch = async () => {
    if (branchToDelete) {
      await fetch(`/api/branch/${branchToDelete}`, { method: "DELETE" }); // Delete operation
      setBranchToDelete(null);
      setIsDeleteConfirmOpen(false);
      fetchBranches(); // Refresh list after delete
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-cover bg-center">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">
        Branch Management
      </h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-blue-600 p-2 rounded hover:bg-gray-200 mb-4"
      >
        Add Branch
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Branch" : "Add Branch"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Branch Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center mb-2">
              <span className="mr-2">Status:</span>
              <button
                onClick={toggleStatus}
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
                  formData.status === "active" ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                    formData.status === "active" ? "translate-x-6" : ""
                  }`}
                ></div>
              </button>
              <span className="ml-2">{formData.status}</span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={saveBranch}
                className="bg-green-600 text-white p-2 rounded mr-2 hover:bg-green-700"
              >
                {editingId ? "Update Branch" : "Add Branch"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this branch?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmDeleteBranch}
                className="bg-red-600 text-white p-2 rounded mr-2 hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchComponent;

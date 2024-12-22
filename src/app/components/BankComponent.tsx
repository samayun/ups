/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Bank {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
  logo: string;
  website: string;
}

interface BankFormData {
  name: string;
  address: string;
  status: 'active' | 'inactive';
  logo: string;
  website: string;
}

const initialFormData: BankFormData = {
  name: '',
  address: '',
  status: 'active',
  logo: '',
  website: '',
};

const BankComponent = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [formData, setFormData] = useState<BankFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);
  const [bankToDelete, setBankToDelete] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBanks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const fetchBanks = async () => {
    try {
      const res = await fetch('/api/bank');
      if (!res.ok) throw new Error('Failed to fetch banks');
      const data = await res.json();
      setBanks(data || []);
    } catch (error: any) {
      console.log('Error fetching banks:', error.message);
      setBanks([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (result.startsWith('data:image')) {
          setFormData({ ...formData, logo: result });
        } else {
          alert('Invalid image format. Please upload a valid image file.');
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleStatus = () => {
    setFormData({
      ...formData,
      status: formData.status === 'active' ? 'inactive' : 'active',
    });
  };

  const saveBank = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/bank/${editingId}` : '/api/bank';

    await fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    setFormData(initialFormData);
    setEditingId(null);
    setIsModalOpen(false);
    fetchBanks();
  };

  const handleEditBank = (bank: Bank) => {
    setFormData({
      name: bank.name,
      address: bank.address,
      status: bank.status,
      logo: bank.logo,
      website: bank.website,
    });
    setEditingId(bank.id);
    setIsModalOpen(true);
  };

  const handleDeleteBank = (id: string) => {
    setBankToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteBank = async () => {
    if (bankToDelete) {
      await fetch(`/api/bank/${bankToDelete}`, { method: 'DELETE' });
      setBankToDelete(null);
      setIsDeleteConfirmOpen(false);
      fetchBanks();
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://example.com/wildlife-background.jpg')",
      }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-white">
        Bank Management
      </h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-blue-600 p-2 rounded hover:bg-gray-200 mb-4"
      >
        Add Bank
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Bank' : 'Add Bank'}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Bank Name"
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
                  formData.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                    formData.status === 'active' ? 'translate-x-6' : ''
                  }`}
                ></div>
              </button>
              <span className="ml-2">{formData.status}</span>
            </div>
            <input
              type="url"
              name="website"
              placeholder="Website URL"
              value={formData.website}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Logo URL
              </label>
              <input
                type="url"
                name="logo"
                placeholder="Logo URL"
                value={formData.logo}
                onChange={handleInputChange}
                className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Or Upload Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Preview"
                className="w-32 h-32 object-cover mb-2 mx-auto opacity-90"
              />
            )}
            <div className="flex justify-end">
              <button
                onClick={saveBank}
                className="bg-green-600 text-white p-2 rounded mr-2 hover:bg-green-700"
              >
                {editingId ? 'Update Bank' : 'Add Bank'}
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
            <p>Are you sure you want to delete this bank?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmDeleteBank}
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

      <ul className="mt-4 space-y-2">
        {banks.map((bank) => (
          <li
            key={bank.id}
            className="flex items-center justify-between p-4 border rounded shadow-sm bg-white bg-opacity-90"
          >
            <div className="flex items-center">
              <img
                src={bank.logo}
                alt={`${bank.name} logo`}
                className="w-16 h-16 object-cover mr-4 opacity-90"
              />
              <div>
                <strong className="text-lg">{bank.name}</strong> -{' '}
                {bank.address}
                <br />
                <a
                  href={bank.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {bank.website}
                </a>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleEditBank(bank)}
                className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBank(bank.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankComponent;

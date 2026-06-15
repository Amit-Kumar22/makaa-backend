'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiTrash2, FiCheck } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  productRequirement: string;
  message: string;
  contacted: boolean;
  createdAt: string;
}

export default function EnquiryManagement() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin-login');
      return;
    }
    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/enquiry`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(response.data);
    } catch (error) {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkContacted = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.patch(`${API_URL}/api/enquiry/${id}`, { contacted: true }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Enquiry marked as contacted');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to update enquiry');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/enquiry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Enquiry deleted successfully');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Enquiries Management</h1>
        <p className="text-dark-600 mt-2">Manage customer enquiries</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-dark-600">Loading enquiries...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="text-center py-12 bg-dark-50 rounded-lg">
          <p className="text-dark-600">No enquiries found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-dark-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <motion.tr
                  key={enquiry._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b hover:bg-dark-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-dark-900">{enquiry.name}</td>
                  <td className="px-6 py-4 text-sm text-dark-600">{enquiry.email}</td>
                  <td className="px-6 py-4 text-sm text-dark-600">{enquiry.phone}</td>
                  <td className="px-6 py-4 text-sm text-dark-600">
                    {enquiry.productRequirement}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        enquiry.contacted
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {enquiry.contacted ? 'Contacted' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    {!enquiry.contacted && (
                      <button
                        onClick={() => handleMarkContacted(enquiry._id)}
                        className="bg-green-500 hover:bg-primary-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition"
                      >
                        <FiCheck size={14} /> Mark Contacted
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(enquiry._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

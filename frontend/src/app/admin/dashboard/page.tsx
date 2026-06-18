'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiPackage, FiMessageSquare, FiUsers, FiEye } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface DashboardStats {
  totalProducts: number;
  totalEnquiries: number;
  totalVisitors: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalEnquiries: 0,
    totalVisitors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ComponentType<any>;
    label: string;
    value: number;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${color} rounded-xl p-6 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-5xl opacity-20" />
      </div>
    </motion.div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Dashboard Overview</h1>
        <p className="text-dark-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-dark-600">Loading stats...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={FiPackage}
            label="Total Products"
            value={stats.totalProducts}
            color="bg-primary-600"
          />
          <StatCard
            icon={FiMessageSquare}
            label="Total Enquiries"
            value={stats.totalEnquiries}
            color="bg-accent-500"
          />
          <StatCard
            icon={FiEye}
            label="Total Visitors"
            value={stats.totalVisitors}
            color="bg-blue-600"
          />
        </div>
      )}
    </div>
  );
}

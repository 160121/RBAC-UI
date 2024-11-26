import React from 'react';
import { Users, Shield, AlertTriangle } from 'lucide-react';
import { useAdminStore } from '../store';

export function Dashboard() {
  const { users, roles } = useAdminStore();
  const inactiveUsers = users.filter((user) => user.status === 'inactive').length;

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Roles',
      value: roles.length,
      icon: Shield,
      color: 'bg-green-500',
    },
    {
      title: 'Inactive Users',
      value: inactiveUsers,
      icon: AlertTriangle,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div >
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-md p-6 flex items-center"
          >
            <div
              className={`${stat.color} p-4 rounded-lg text-white mr-4`}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
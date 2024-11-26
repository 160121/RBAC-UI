import React, { useState } from 'react';
import { Users, Shield, Home } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'roles', icon: Shield, label: 'Roles' },
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-indigo-600 p-2 rounded"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? 'X' : '☰'}
      </button>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 bg-gray-900 w-64 p-4 z-50 transition-transform transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:relative md:translate-x-0 md:block'
        )}
        role="navigation"
        aria-label="Sidebar"
      >
        {/* Sidebar Header */}
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-indigo-500" />
          <span className="text-white text-xl font-bold">Admin Panel</span>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                closeSidebar();
              }}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                activeTab === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

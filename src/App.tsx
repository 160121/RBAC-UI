import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UserTable } from './components/UserTable';
import { RoleTable } from './components/RoleTable';
import { useAdminStore } from './store';

const queryClient = new QueryClient();

// Mock initial data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    roleId: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    roleId: 'editor',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const mockRoles = [
  {
    id: 'admin',
    name: 'Administrator',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    description: 'Full system access',
  },
  {
    id: 'editor',
    name: 'Editor',
    permissions: ['read', 'write'],
    description: 'Can edit content',
  },
];

function App() {
  const { setUsers, setRoles, users, roles } = useAdminStore();

  useEffect(() => {
    // Initialize with mock data
    setUsers(mockUsers);
    setRoles(mockRoles);
  }, [setUsers, setRoles]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar
          onTabChange={scrollToSection}
          items={[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'users', label: 'Users' },
            { id: 'roles', label: 'Roles' },
          ]}
        />

        
        <main className="flex-1 overflow-auto">
          <section id="dashboard" className="py-16 px-6 bg-white">
            <Dashboard />
          </section>
          <section id="users" className="py-16 px-6 bg-gray-50">
            
            <UserTable users={users} />
          </section>
          <section id="roles" className="py-16 px-6 bg-white">
            
            <RoleTable roles={roles} />
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;

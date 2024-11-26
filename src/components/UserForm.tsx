import React from 'react';
import { X } from 'lucide-react';
import { useAdminStore } from '../store';
import type { User, Role } from '../types';

interface UserFormProps {
  user?: User;
  onClose: () => void;
}

export function UserForm({ user, onClose }: UserFormProps) {
  const { roles, addUser, updateUser } = useAdminStore();
  const [formData, setFormData] = React.useState<Partial<User>>(
    user ?? {
      name: '',
      email: '',
      roleId: roles[0]?.id || '',
      status: 'active',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email?.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (user) {
      updateUser(user.id, formData);
    } else {
      addUser({
        ...formData,
        id: crypto.randomUUID(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          formData.name ?? ''
        )}`,
        createdAt: new Date().toISOString(),
      } as User);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="user-form-title"
      aria-describedby="user-form-description"
    >
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="user-form-title" className="text-xl font-semibold">
            {user ? 'Edit User' : 'Create User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name ?? ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email ?? ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={formData.roleId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, roleId: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as 'active' | 'inactive',
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              aria-label={user ? 'Update user' : 'Create user'}
            >
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

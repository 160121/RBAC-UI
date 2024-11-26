import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAdminStore } from '../store';
import type { Role, Permission } from '../types';

interface RoleFormProps {
  role?: Role;
  onClose: () => void;
}

const ALL_PERMISSIONS: Permission[] = [
  'read',
  'write',
  'delete',
  'manage_users',
  'manage_roles',
];

export function RoleForm({ role, onClose }: RoleFormProps) {
  const { addRole, updateRole } = useAdminStore();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = React.useState<Partial<Role>>(
    role ?? {
      name: '',
      description: '',
      permissions: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      updateRole(role.id, formData);
    } else {
      addRole({
        ...formData,
        id: crypto.randomUUID(),
      } as Role);
    }
    onClose();
  };

  const togglePermission = (permission: Permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions?.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...(prev.permissions ?? []), permission],
    }));
  };

  // Trap focus within the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-labelledby="role-form-title"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md sm:max-w-lg p-4 shadow-lg"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="role-form-title" className="text-xl font-semibold">
            {role ? 'Edit Role' : 'Create Role'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Role Name */}
          <div>
            <label
              htmlFor="role-name"
              className="block text-sm font-medium text-gray-700"
            >
              Role Name
            </label>
            <input
              id="role-name"
              type="text"
              value={formData.name ?? ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="role-description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="role-description"
              value={formData.description ?? ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_PERMISSIONS.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions?.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">
                    {permission.replace('_', ' ').toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              {role ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

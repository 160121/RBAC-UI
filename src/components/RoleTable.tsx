import React, { useState } from 'react';
import { Edit2, Trash2, ShieldPlus } from 'lucide-react';
import type { Role } from '../types';
import { RoleForm } from './RoleForm';
import { useAdminStore } from '../store';

interface RoleTableProps {
  roles: Role[];
}

export function RoleTable({ roles }: RoleTableProps) {
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { deleteRole } = useAdminStore();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold mb-6">Role Management</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg space-x-2 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          aria-label="Add a new role"
        >
          <ShieldPlus className="h-5 w-5" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Permissions
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {role.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {role.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
                      >
                        {permission.replace('_', ' ').toUpperCase()}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingRole(role)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Edit role ${role.name}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Delete role ${role.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Form Modal */}
      {(editingRole || isCreating) && (
        <RoleForm
          role={editingRole ?? undefined}
          onClose={() => {
            setEditingRole(null);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
}

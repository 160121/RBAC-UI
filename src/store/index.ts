import { create } from 'zustand';
import type { Role, User } from '../types';

interface AdminStore {
  users: User[];
  roles: Role[];
  setUsers: (users: User[]) => void;
  setRoles: (roles: Role[]) => void;
  addUser: (user: User) => void;
  addRole: (role: Role) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  updateRole: (id: string, data: Partial<Role>) => void;
  deleteUser: (id: string) => void;
  deleteRole: (id: string) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  users: [],
  roles: [],
  setUsers: (users) => set({ users }),
  setRoles: (roles) => set({ roles }),
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  addRole: (role) =>
    set((state) => ({
      roles: [...state.roles, role],
    })),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...data } : user
      ),
    })),
  updateRole: (id, data) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...data } : role
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));
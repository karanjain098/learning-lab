import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Edit, Trash2 } from "lucide-react";

export default function ManageUsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Writer" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-b py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Manage Users</h1>
            <p className="text-slate-600">Control user access and roles</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-slate-900">Name</th>
                  <th className="px-6 py-3 text-left font-bold text-slate-900">Email</th>
                  <th className="px-6 py-3 text-left font-bold text-slate-900">Role</th>
                  <th className="px-6 py-3 text-left font-bold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-900 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="p-2 hover:bg-slate-200 rounded-lg">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

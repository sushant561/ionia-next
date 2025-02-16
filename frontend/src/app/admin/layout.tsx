// admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <nav style={{ background: "linear-gradient(to bottom, #22c55e,rgb(15, 100, 46))" }} className="mygreen w-64 bg-green-700 text-white h-screen p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li>
            <Link href="/admin/questions" className="block py-2 px-4 hover:bg-green-600 rounded">
              Manage Questions
            </Link>
          </li>
          <li>
            <Link href="/admin/tests" className="block py-2 px-4 hover:bg-green-600 rounded">
              Manage Tests
            </Link>
          </li>
          {/* Additional links */}
          <li>
            <Link href="/admin/tests/create" className="block py-2 px-4 hover:bg-green-600 rounded">
              Create Test Series
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="mygray flex-1 p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="mytxtdim text-3xl font-semibold text-primary">Test Series Management</h1>
          <div>
            {/* Log Out Button */}
            <button className="px-4 py-2 bg-primary mytxtgreen rounded-md">
              Log Out
            </button>
          </div>
        </div>

        {/* Render children (pages content like the tests list, test creation form, etc.) */}
        {children}
      </div>
    </div>
  );
}

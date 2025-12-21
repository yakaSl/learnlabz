'use client';

import { useAuth } from '@/hooks/useAuth';

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Welcome, {user?.firstName || user?.username}!</h2>
              <p className="text-gray-600">Teacher Portal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">User Info</h3>
                <div className="mt-2 text-sm space-y-1">
                  <p><span className="font-medium">Username:</span> {user?.username}</p>
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">Role:</span> {user?.primaryRole.categoryName}</p>
                </div>
              </div>

              {user?.availableInstitutes && user.availableInstitutes.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">Your Institute</h3>
                  <div className="mt-2 text-sm space-y-1">
                    <p><span className="font-medium">Name:</span> {user.availableInstitutes[0].instituteName}</p>
                    <p><span className="font-medium">Code:</span> {user.availableInstitutes[0].instituteCode}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-500">
                This is a placeholder dashboard. Implement your teacher features here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

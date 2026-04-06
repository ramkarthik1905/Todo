import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">App Logo</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">Hello, {user?.username}</span>
                        <button 
                            onClick={logout} 
                            className="px-4 py-2 bg-rose-50 text-rose-600 font-semibold rounded-lg hover:bg-rose-100 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Dashboard Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Account Identity</h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{user?.userId?.substring(0,8)}...</p>
                        </div>
                        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Graduation Year</h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{user?.year}</p>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                            <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Department</h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{user?.Department}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

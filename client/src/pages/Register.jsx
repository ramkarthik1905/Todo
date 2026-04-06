import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', year: '', Department: '', Age: ''
    });
    const [status, setStatus] = useState({ loading: false, error: null, errors: [] });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, errors: [] });
        
        const processedData = {
            ...formData,
            year: Number(formData.year),
            Age: Number(formData.Age)
        };

        const result = await register(processedData);
        if (result.success) {
            navigate('/login');
        } else {
            if (Array.isArray(result.error)) {
                setStatus({ loading: false, error: null, errors: result.error });
            } else {
                setStatus({ loading: false, error: result.error, errors: [] });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-10">
                <div className="mb-8 text-center border-b pb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Create an Account</h1>
                </div>

                {status.error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm font-medium">
                        {status.error}
                    </div>
                )}
                {status.errors && status.errors.length > 0 && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm">
                        <ul className="list-disc pl-5">
                            {status.errors.map((err, idx) => <li key={idx}>{err.msg}</li>)}
                        </ul>
                    </div>
                )}

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input type="text" name="Department" value={formData.Department} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input type="number" name="Age" value={formData.Age} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button type="submit" disabled={status.loading} className={`w-full py-4 px-4 rounded-xl shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${status.loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {status.loading ? 'Creating...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

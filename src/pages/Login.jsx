import React, { useState } from 'react'
import { LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    if (data.token) {
        // Login successful, set token in local storage
        localStorage.setItem('token', data.token)
        navigate('/books')  // Redirect to books page
    }
    if (response.ok) {
        // Handle successful login
        console.log('Login successful')
    } else {
        // Handle login error
        console.error('Login failed')
    }
    } catch (error) {
    console.error('Error:', error)
    }
}

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
        <LogIn className="mr-2" />
        Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>
        <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
            Login
        </button>
        </form>
    </div>
    </div>
)
}
import React from 'react'
import { Link } from 'react-router-dom'
import { LogIn, UserPlus, BookOpen } from 'lucide-react'

export default function Home() {
return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-8">Welcome to BookApp</h1>
    <div className="space-y-4">
        <Link to="/login" className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        <LogIn className="mr-2" />
        Login
        </Link>
        <Link to="/register" className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
        <UserPlus className="mr-2" />
        Register
        </Link>
        <Link to="/books" className="flex items-center justify-center bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors">
        <BookOpen className="mr-2" />
        View Books
        </Link>
    </div>
    </div>
)
}
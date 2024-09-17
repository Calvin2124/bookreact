import React, { useState } from 'react'
import { UserPlus, X } from 'lucide-react'

function AuthorForm({ onClose }) {
const [name, setName] = useState('')
const [birthYear, setBirthYear] = useState('') // On garde l'année ici
const [message, setMessage] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault()

    // Vérification basique que l'année est valide (4 chiffres et nombre)
    if (!/^\d{4}$/.test(birthYear)) {
    setMessage('Please enter a valid year.')
    return
    }

    try {
    const response = await fetch('http://localhost:3000/api/authors/add', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, birthYear }),
    })

    if (response.ok) {
        setMessage('Author added successfully!')
        setName('')
        setBirthYear('') // Réinitialiser l'année
        setTimeout(() => {
        onClose()
        }, 2000)
    } else {
        setMessage('Failed to add author. Please try again.')
    }
    } catch (error) {
    console.error('Error:', error)
    setMessage('An error occurred. Please try again.')
    }
}

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
        <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
        <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
        <UserPlus className="mr-2" />
        Add New Author
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
            </label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
        </div>
        <div>
            <label htmlFor="birthYear" className="block text-gray-700 font-bold mb-2">
            Birth Year
            </label>
            <input
            type="text"
            id="birthYear"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)} // Changer l'année ici
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="YYYY" // Indication du format
            required
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Add Author
        </button>
        </form>
        {message && (
        <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
        </p>
        )}
    </div>
    </div>
)
}

export default AuthorForm
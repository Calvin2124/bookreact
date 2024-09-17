import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

function BookForm({ book, onSubmit, onClose }) {
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [isbn, setIsbn] = useState('')
const [publishedYear, setPublishedYear] = useState('')

useEffect(() => {
    if (book) {
    setTitle(book.title)
    setAuthor(book.author)
    setIsbn(book.isbn)
    setPublishedYear(book.publishedYear)
    }
}, [book])

const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ id: book ? book.id : null, title, author, isbn, publishedYear })
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
        <h2 className="text-2xl font-bold mb-4">
        {book ? 'Edit Book' : 'Add New Book'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="title" className="block mb-1">
            Title
            </label>
            <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>
        <div>
            <label htmlFor="author" className="block mb-1">
            Author
            </label>
            <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            />
        </div>
        <div>
            <label htmlFor="isbn" className="block mb-1">
            ISBN
            </label>
            <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>
        <div>
            <label htmlFor="year" className="block mb-1">
            Year
            </label>
            <input
            type="number"
            id="year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}

            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
            {book ? 'Update Book' : 'Add Book'}
        </button>
        </form>
    </div>
    </div>
)
}

export default BookForm
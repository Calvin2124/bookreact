import React, { useState, useEffect } from 'react'
import { Book, Plus, Edit, Trash2, UserPlus } from 'lucide-react'
import BookForm from '../components/BookForm'
import AuthorForm from '../components/AuthorForm'

function BookList() {
const [books, setBooks] = useState([])
const [isBookFormOpen, setIsBookFormOpen] = useState(false)
const [isAuthorFormOpen, setIsAuthorFormOpen] = useState(false)
const [editingBook, setEditingBook] = useState(null)

useEffect(() => {
    fetchBooks()
}, [])

const fetchBooks = async () => {
    try {
    const response = await fetch('http://localhost:3000/api/books')
    if (response.ok) {
        const data = await response.json()
        setBooks(data)
    } else {
        console.error('Failed to fetch books')
    }
    } catch (error) {
    console.error('Error:', error)
    }
}

const handleAddBook = async (newBook) => {
    try {
    const response = await fetch('http://localhost:3000/api/books/add', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newBook),
    })
    if (response.ok) {
        fetchBooks()
        setIsBookFormOpen(false)
    } else {
        console.error('Failed to add book')
    }
    } catch (error) {
    console.error('Error:', error)
    }
}

const handleUpdateBook = async (updatedBook) => {
    console.log(updatedBook.id)
    try {
    const response = await fetch(`http://localhost:3000/api/books/update/${updatedBook.id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedBook),
    })
    if (response.ok) {
        fetchBooks()
        setIsBookFormOpen(false)
        setEditingBook(null)
    } else {
        console.error('Failed to update book')
    }
    } catch (error) {
    console.error('Error:', error)
    }
}

const handleDeleteBook = async (bookId) => {
    try {
    const response = await fetch(`http://localhost:3000/api/books/delete/${bookId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        fetchBooks()
    } else {
        console.error('Failed to delete book')
    }
    } catch (error) {
    console.error('Error:', error)
    }
}

return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
        <Book className="mr-2" />
        Book List
    </h2>
    <div className="flex justify-between mb-4">
        <button
        onClick={() => setIsBookFormOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
        >
        <Plus className="mr-2" />
        Add Book
        </button>
        <button
        onClick={() => setIsAuthorFormOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
        <UserPlus className="mr-2" />
        Add Author
        </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
        <div key={book.isbn} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-1">Author: {book.author}</p>
            <p className="text-gray-600 mb-1">ISBN: {book.isbn}</p>
            <p className="text-gray-600 mb-4">Year: {book.publishedYear}</p>
            <div className="flex justify-end space-x-2">
            <button
                onClick={() => {
                setEditingBook(book)
                setIsBookFormOpen(true)
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors"
            >
                <Edit size={16} />
            </button>
            <button
                onClick={() => handleDeleteBook(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
            >
                <Trash2 size={16} />
            </button>
            </div>
        </div>
        ))}
    </div>
    {isBookFormOpen && (
        <BookForm
        book={editingBook}
        onSubmit={editingBook ? handleUpdateBook : handleAddBook}
        onClose={() => {
            setIsBookFormOpen(false)
            setEditingBook(null)
        }}
        />
    )}
    {isAuthorFormOpen && (
        <AuthorForm
        onClose={() => setIsAuthorFormOpen(false)}
        />
    )}
    </div>
)
}

export default BookList
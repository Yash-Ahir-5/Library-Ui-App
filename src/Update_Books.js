import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
    // const { bookId, bookTitle, bookDescription } = props;
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Initialize state for form data
        title: '',
        description: '',
        publish_year: '',
        quantity: ''    
    });

    useEffect(() => {
        // Fetch book details based on book ID when component mounts

        // console.log('Book ID:', props.bookId);
        // console.log('Book Title:', decodeURIComponent(bookTitle));
        // console.log('Book Description:', decodeURIComponent(bookDescription));
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3050/books/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }

                const data = await response.json();
                const bookData = data[0];
                // console.log(bookData);

                setFormData({
                    title: bookData.title,
                    description: bookData.description,
                    publish_year: bookData.publish_year,
                    quantity: bookData.quantity,
                });
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3050/books/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Navigate back to library page on successful update
                navigate("/");
            } else {
                console.error('Failed to update book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Update Book Data</h1>
            {/* <h2>{props.bookDescription}</h2> */}
            <form onSubmit={handleSubmit}>
                {/* Form fields for updating book data */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" placeholder='Enter Title' className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" placeholder='Enter Description' className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="publish_year" className="form-label">Title</label>
                    <input type="number" placeholder='Enter Published Year' className="form-control" id="publish_year" name="publish_year" value={formData.publish_year} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Title</label>
                    <input type="number" placeholder='Enter Book Quantity' className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default Update;

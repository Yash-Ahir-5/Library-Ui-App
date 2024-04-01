import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Insert from './Insert_Books'; // Import Insert component

function Library() {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3050/books')
        .then(response => response.json())
        .then(data => setBookData(data))
        .catch(err => console.log(err));
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return (
        <>
          {description.substring(0, maxLength)}
          <span className="text-primary" data-bs-toggle="tooltip" title={description}>
            ...more
          </span>
        </>
      );
    }
    return description;
  };

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);

  return (
    <div>
      <h1 className="text-center">Books Data</h1>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Book Name</th>
            <th>Description</th>
            <th>Publish Year</th>
            <th>Quantity</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {
            bookData.map((book, idx) => (
            <tr key={idx}>
              <td align="center">{idx + 1}</td>
              <td>{book.book_title}</td>
              <td>{truncateDescription(book.book_description,50)}</td> {/* Adjust the number of characters to display */}
              <td align="center">{book.book_publish_year}</td>
              <td align="center">{book.book_quantity}</td>
              <td>{book.book_author}</td>
              <td>{book.book_genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <Link to="/insert" className="btn btn-primary">Insert Book</Link>
      </div>
    </div>
  );
}

export default Library;

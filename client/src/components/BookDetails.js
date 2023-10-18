import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
    const { loading, data } = useQuery(getBookQuery, {
        variables: { id: props.bookId },
    });

    const displayBookDetails = () => {
        const book = data?.book;
        if (loading) {
            return <div>Loading book details...</div>;
        } else if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <div>No book selected...</div>;
        }
    };

    return (
        <div id="book-details">
            {displayBookDetails()}
        </div>
    );
}

export default BookDetails;

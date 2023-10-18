import { useQuery, gql,useMutation } from '@apollo/client';

import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'
import { useState } from 'react';
//here we will bind getAuthorsQuery with AddBook component

function AddBook() {

    const [state, setState] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const handleChange = (e) => {
        const {name,  value} = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const { loading, error, data } = useQuery(getAuthorsQuery);

    const [addBook] = useMutation(addBookMutation);

    const displayAuthors = () => {
        if (loading) {
            return <option disabled>Loading authors</option>;
        } else if (error) {
            return <option disabled>Error loading authors</option>;
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>
                    {author.name}
                </option>
            ));
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        
        // Use the addBook mutation
        addBook({
            variables: state,
            refetchQueries: [{ query: getAuthorsQuery }, {query: getBooksQuery }],
        });
    };
    

  return(
    <form id="add-book" onSubmit={submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name="name" value={state.name} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name="genre" value={state.genre} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" value={state.authorId} onChange={handleChange}>
                        <option>Select author</option>
                        { displayAuthors() }
                    </select>
                </div>
                <button>+</button>

            </form>
  )
  }
  
  export default AddBook;


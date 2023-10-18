import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

//components
import BookList from "./components/BookList";
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Vardhan</h1>
        <BookList />
        <AddBook/>
        <BookDetails/>
      </div>
    </ApolloProvider>

  );
}

export default App;

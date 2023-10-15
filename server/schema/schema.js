const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID, 
    GraphQLInt,
    GraphQLList,
    GraphQLSchema} = graphql;


//dummy data
var books = [
    {name : 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name : 'The final empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name : 'The long earth', genre: 'Fantasy', id: '3', authorId: '3'},
    {name : 'The hero of ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name : 'The Color of magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name : 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'},
];

var authors = [
    {name : 'Patrick', age: '23', id: '1'},
    {name : 'Brandon', age: '34', id: '2'},
    {name : 'Terry', age: '44', id: '3'},
];



//here we define our first object type on this graph and it is book type
//it called book and it has some fields 
//we wrapped all the fields inside a function which returns object 

const BookType = new GraphQLObjectType({ 
    name: 'Book',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId});
            }
        }
    })


});

const AuthorType = new GraphQLObjectType({ 
    name: 'Author',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType), //graphqllist of booktype
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id});
            }
        }
    })


});



/*
when some queries this "BookType" for particular book we expect them to pass some arguments, because we dont know
what book they want is it book id 1, 2, 3, 4 etc
in front end looks like this
book(id:'123'){
    name 
    genre
}
*/ 
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(books, {id: args.id});
                //code to get data from db
            }

        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    

    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
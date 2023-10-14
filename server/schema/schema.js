const graphql = require('graphql');

const {GraphQlObjectType, GraphQLString, GraphQlSchema} = graphql;



//here we define our first object type on this graph and it is book type
//it called book and it has some fields 
//we wrapped all the fields inside a function which returns object 

const BookType = new GraphQlObjectType({ 
    name: 'Book',
    fields: ()=> ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
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
const RootQuery = GraphQlObjectType({
    name : 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                //code to get data from db
            }

        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
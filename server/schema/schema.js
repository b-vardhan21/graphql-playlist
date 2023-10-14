const graphql = require('graphql');

const {GraphQlObjectType, GraphQLString} = graphql;



//here we define our first object type on this graph and it is book type
//it called book and it has some fields 
//we wrapped all the fields inside a function which returns object 
//
//

const BookType = new GraphQlObjectType({ 
    name: 'Book',
    fields: ()=> ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })


});
const express = require('express');

const {graphqlHTTP} = require('express-graphql');

const schema = require('./schema/schema');
const app = express();


app.use('/graphql', graphqlHTTP({

    schema,
    graphiql: true

}));
//tell our app to listen to specific port
//when our app listen to that port call back function gonna fire it gonna tells us in the console it is listening for the request
app.listen(4000, () => {
    console.log('listening for requests on port 4000');
});
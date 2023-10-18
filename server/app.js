const express = require('express');

const {graphqlHTTP} = require('express-graphql');

const schema = require('./schema/schema');

const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//allow cross origin requests
app.use(cors());

mongoose.connect('mongodb+srv://vardhanb278:BBo0GHmtNcl1WiW8@cluster0.9g9ugg0.mongodb.net/');

mongoose.connection.once('open', () => {
    console.log('Db connection got complete');

});

app.use('/graphql', graphqlHTTP({

    schema,
    graphiql: true

}));
//tell our app to listen to specific port
//when our app listen to that port call back function gonna fire it gonna tells us in the console it is listening for the request
app.listen(4000, () => {
    console.log('listening for requests on port 4000');
});
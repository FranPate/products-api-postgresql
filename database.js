const mongoose = require('mongoose');
let password = 'admin';
let databaseName = 'productsApi';

if (process.env.TEST_DB_URL === 'test') {
    databaseName = 'testdb';
}

mongoose.connect(`mongodb+srv://admin:${password}@miapi.krrw0la.mongodb.net/${databaseName}?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true});
/*
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/
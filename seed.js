require('dotenv').config();
require('./config/database');

const Category = require('./models/category');

async function() {
    await Category.deleteMany({});
    const categories = await Category.create([
        {name:'Aprilia'},
        {name:'BMW'},
        {name:'Ducati'},
        {name:'Harley-Davidson'},
        {name:'Honda'},
        {name:'Kawasaki'},
        {name:'Suzuki'},
        {name:'Triumph'},
        {name:'Yamaha'}
    ]);
}
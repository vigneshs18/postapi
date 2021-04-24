const mongoose = require('mongoose');

const conn_String = process.env.MONGODB_ATLAS_URL || '';
console.log(`MongoDBAtlas Conn. String : ${conn_String}`);

exports.estbConnection = async() => {    
    try {
        await mongoose.connect(conn_String,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log('Connected to MongoDBAtlas Server...');
    } catch (err) {
        console.log('MongoDBAtlas Conn. Failed...', err.message);
    } 
}


const mongoose = require('mongoose');



const dbConnection = async() => {
    try {
        await mongoose.connect( "mongodb+srv://mern_user:IvcQIFebNorQ6yX2@calendario.fazthll.mongodb.net/mern_calendar" , { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error(`Error in the database`);
    }
}

module.exports = {
    dbConnection
}
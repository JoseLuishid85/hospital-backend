const mongoose = require('mongoose');

const bdConnection = async () => {
    
    try {
        await mongoose.connect( process.env.DB_CNN,{
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true
        });

        console.log('DB Conextada');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver Logs');
    }
    
}

module.exports = {
    bdConnection
}
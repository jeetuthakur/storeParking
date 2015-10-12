// default to a 'localhost' configuration:
var connection_string = 'localhost:27017/YOUR_APP_NAME';

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + "parkingdb";
}

module.exports = {

    url : 'mongodb:' + connection_string
//		url : 'mongodb://localhost/parkingdb'
}

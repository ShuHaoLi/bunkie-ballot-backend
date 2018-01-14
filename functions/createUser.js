const mLab = require('mongolab-data-api')('HHeYK9l4vyPr4X54kLnTa7-zZp0IHxD9');

/**
 * Create a new user profile in MongoDB's Users table
 * It first get the number of records of the table, then compute the new id = size + 1
 * then wrap the user infomation into an object and add a new entry in users table
 * 
 * To test, type:
 *     lib .createUser --message "newusername 1234567890" 
 *
 * @param {string} message Message to pass through
 * @returns {string}
 *
 */
module.exports = (message, context, callback) => {

    // ****** assumption message "username phonenumber" *********
    const params = message.split(' ');
    const username = params[0];
    const phone = parseInt(params[1]);

    const DB_NAME = 'roommates';
    const USERS = 'Users';
    const USERS_ID = 'id';
    const USERS_NAME = 'name';
    const USERS_PHONE = 'phone';

    const options = {
        database: DB_NAME,
        collectionName: USERS,
        resultCount: true
    };

    mLab.listDocuments(options, function (err, data) {
        console.log("get data " + data);
        const newUser = {};
        newUser[USERS_ID] = data + 1;
        newUser[USERS_NAME] = username;
        newUser[USERS_PHONE] = phone;
        const options = {
            database: DB_NAME,
            collectionName: USERS,
            documents: newUser
        };

        mLab.insertDocuments(options, function (err, data) {
            console.log("a new user has been inserted");
            callback(null, message);
        });

    });

};

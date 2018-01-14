const mLab = require('mongolab-data-api')('HHeYK9l4vyPr4X54kLnTa7-zZp0IHxD9');

/**
 * Create a new user profile in MongoDB's Users table
 *
 * @param {string} message Message to pass through
 * @returns {string}
 *
 */
module.exports = (message, context, callback) => {

    const DB_NAME = 'roommates';
    const USERS = 'Users';
    const USERS_ID = 'id';
    const USERS_NAME = 'name';
    const USERS_PHONE = 'phone';

    const newUser = {};
    newUser[USERS_ID] = 3;
    newUser[USERS_NAME] = 'Jon Kle';
    newUser[USERS_PHONE] = 7783214512;

    const options = {
        database: DB_NAME,
        collectionName: USERS,
        documents: newUser
    };

    mLab.insertDocuments(options, function (err, data) {
        console.log("a new user has been inserted");
        callback(null, message);
    });
};

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:password@ds255797.mlab.com:55797/roommates';

const DB_NAME = 'roommates';
const VOTES = 'Votes';
const VOTES_LISTING_ID = 'listing_id';
const VOTES_VOTER_ID = 'voter_id';
const VOTES_APPLICANT_ID = 'applicant_id';
const VOTES_VOTE = 'vote';

/**
 * Add or update vote with listing, voter, applicant, and vote value to db.
 *
 * @param {string} message Message to pass through
 * @returns {string}
 *
 */
module.exports = (message, context, callback) => {

    const query = {};
    query[VOTES_LISTING_ID] = 1;
    query[VOTES_VOTER_ID] = 1;
    query[VOTES_APPLICANT_ID] = 2;

    const newData = {};
    newData[VOTES_LISTING_ID] = 1;
    newData[VOTES_VOTER_ID] = 1;
    newData[VOTES_APPLICANT_ID] = 2;
    newData[VOTES_VOTE] = 5;

    MongoClient.connect(url, function(err, client) {
        console.log('connected');
        const db = client.db(DB_NAME);
        updateDocument(db, query, newData, function(data) {
            console.log(data);

            client.close();
            callback(null, message);
        });
    });
};

const updateDocument = function(db, query, newData, callback) {
    const collection = db.collection(VOTES);
    collection.updateOne(query, {$set: newData}, function(err, result) {
        callback(result);
    });
}

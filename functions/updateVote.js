const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:password@ds255797.mlab.com:55797/roommates';

const DB_NAME = 'roommates';
const VOTES = 'Votes';
const VOTES_LISTING_ID = 'listing_id';
const VOTES_VOTER_ID = 'voter_id';
const VOTES_APPLICANT_ID = 'applicant_id';

/**
 * Add or update vote with listing, voter, applicant, and vote value to db.
 *
 * @param {number} listing_id Listing id
 * @param {number} voter_id Voter id
 * @param {number} applicant_id Applicant id
 * @param {number} vote Vote
 * @returns {any}
 *
 */
module.exports = (listing_id, voter_id, applicant_id, vote, context, callback) => {

    const query = {};
    query[VOTES_LISTING_ID] = listing_id;
    query[VOTES_VOTER_ID] = voter_id;
    query[VOTES_APPLICANT_ID] = applicant_id;

    MongoClient.connect(url, function(err, client) {
        console.log('connected');
        const db = client.db(DB_NAME);
        updateDocument(db, query, vote, function(data) {
            console.log(data);

            client.close();
            callback(null);
        });
    });
};

const updateDocument = function(db, query, newVote, callback) {
    const collection = db.collection(VOTES);
    collection.updateOne(query, {$set: {vote: newVote}}, function(err, result) {
        callback(result);
    });
}

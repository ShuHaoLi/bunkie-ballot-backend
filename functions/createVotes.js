const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:password@ds255797.mlab.com:55797/roommates';

const DB_NAME = 'roommates';
const VOTES = 'Votes';
const LISTINGS = 'Listings';
const LISTINGS_ID = 'id';
const LISTINGS_ADDRESS = 'address';
const LISTINGS_PRICE = 'price';
const LISTINGS_RESIDENTS = 'residents';

/**
 * Create a bunch of new votes.
 * It first get the ids of the residents(voters) from the listings record found by the listings_id in message,
 * then it creates new vote records in the votes table. The number of new records created depends on the number of
 * residents living in that listing_id.
 *
 * @param {number} listing_id Listing id
 * @param {number} applicant_id Applicant id
 * @returns {any}
 *
 */
module.exports = (listing_id, applicant_id, context, callback) => {

    const queryObj = {};
    queryObj[LISTINGS_ID] = listing_id;

    MongoClient.connect(url, function(err, client) {
        console.log('connected');
        const db = client.db(DB_NAME);
        createVotes(db, listing_id, applicant_id, function(data) {
            console.log(data);

            client.close();
            callback(null);
        });
    });
};

const createVotes = function(db, listing_id, applicant_id, callback) {
    const listingsCollection = db.collection(LISTINGS);
    listingsCollection.find({"id": listing_id}).toArray(function(err, docs) {
        const residents = docs[0][LISTINGS_RESIDENTS];

        const votesToInsert = [];
        for (resident in residents) {
            votesToInsert.push({
                listing_id: listing_id,
                voter_id: resident,
                applicant_id: applicant_id,
                vote: -1
            });
        }
        const votesCollection = db.collection(VOTES);
        votesCollection.insertMany(votesToInsert, function(err, data) {
            callback(data);
        });
    });
}


const mLab = require('mongolab-data-api')('HHeYK9l4vyPr4X54kLnTa7-zZp0IHxD9');

/**
 * Create a bunch of new votes.
 * It first get the ids of the residents(voters) from the listings record found by the listings_id in message,
 * then it creates new vote records in the votes table. The number of new records created depends on the number of
 * residents living in that listing_id.
 * 
 * To test, type:
 *     lib .createVote --message "1 4"
 *
 * @param {string} message Message to pass through
 * @returns {string}
 *
 */
module.exports = (message, context, callback) => {

    // ****** assumption message "listing_id applicant_id" *********
    const params = message.split(' ');
    const listing_id = parseInt(params[0]);
    const applicant_id = parseInt(params[1]);

    const DB_NAME = 'roommates';
    const VOTES = 'Votes';
    const LISTINGS = 'Listings';
    const LISTINGS_ID = 'id';
    const LISTINGS_ADDRESS = 'address';
    const LISTINGS_PRICE = 'price';
    const LISTINGS_RESIDENTS = 'residents';

    const queryObj = {};
    queryObj[LISTINGS_ID] = listing_id;

    const options = {
        database: DB_NAME,
        collectionName: LISTINGS,
        query: JSON.stringify(queryObj)
    };

    mLab.listDocuments(options, function (err, data) {
        // assume there is one and only one data comming back
        const rec = data[0];
        console.log("get data: " + JSON.stringify(rec));
        const residents_ids = rec[LISTINGS_RESIDENTS];
        const newVotes = [];
        for (let voter_id of residents_ids) {
            const newVote = {
                listing_id: listing_id,
                voter_id: voter_id,
                applicant_id: applicant_id,
                vote: 0 // initial vote value is 0 --- unvoted 
            };
            newVotes.push(newVote);
        }
        const options = {
            database: DB_NAME,
            collectionName: VOTES,
            documents: newVotes
        };

        mLab.insertDocuments(options, function (err, data) {
            console.log(newVotes.length + " new votes has been inserted");
            callback(null, message);
        });
    });

};

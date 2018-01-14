const mLab = require('mongolab-data-api')('HHeYK9l4vyPr4X54kLnTa7-zZp0IHxD9');

/**
 * Add or update vote with listing, voter, applicant, and vote value to db.
 *
 * @param {string} message Message to pass through
 * @returns {string}
 *
 */
module.exports = (message, context, callback) => {

    const DB_NAME = 'roommates';
    const VOTES = 'Votes';
    const VOTES_LISTING_ID = 'listing_id';
    const VOTES_VOTER_ID = 'voter_id';
    const VOTES_APPLICANT_ID = 'applicant_id';
    const VOTES_VOTE = 'vote';

    const query = {};
    query[VOTES_LISTING_ID] = 1;
    query[VOTES_VOTER_ID] = 1;
    query[VOTES_APPLICANT_ID] = 2;

    const newData = {};
    newData[VOTES_LISTING_ID] = 1;
    newData[VOTES_VOTER_ID] = 1;
    newData[VOTES_APPLICANT_ID] = 2;
    newData[VOTES_VOTE] = 5;

    const options = {
        database: DB_NAME,
        collectionName: VOTES,
        data: newData,
        query: JSON.stringify(query),
        upsert: true
    };

    mLab.updateDocuments(options, function (err, data) {
        console.log(data); //=> [ { _id: 1234, ...  } ]
        callback(null, message);
    });
};

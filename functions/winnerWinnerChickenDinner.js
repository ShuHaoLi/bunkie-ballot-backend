const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:password@ds255797.mlab.com:55797/roommates';

const DB_NAME = 'roommates';
const VOTES = 'Votes';
const VOTES_LISTING_ID = 'listing_id';
const VOTES_VOTER_ID = 'voter_id';
const VOTES_APPLICANT_ID = 'applicant_id';

/**
 * Rank the roommates based on current votes.
 *
 * @param {number} listing_id Listing id
 * @returns {any}
 *
 */
module.exports = (listing_id, context, callback) => {

    MongoClient.connect(url, function(err, client) {
        console.log('connected');
        const db = client.db(DB_NAME);
        chooseWinner(db, listing_id, function(data) {
            console.log(data);

            client.close();
            callback(null, data);
        });
    });
};

const chooseWinner = function(db, listing_id, callback) {
    const collection = db.collection(VOTES);
    collection.find({listing_id: listing_id},).toArray(function(err, docs) {
        const votes = {};
        for (let rec of docs) {
            if (rec[VOTES_APPLICANT_ID] in votes) {
                votes[rec[VOTES_APPLICANT_ID]].push(rec["vote"]);
            } else {
                votes[rec[VOTES_APPLICANT_ID]] = [rec["vote"]];
            }
        }
        const averageVotes = {};
        for (var applicant in votes) {
            if (votes.hasOwnProperty(applicant)) {
                var num = 0;
                var total = 0;
                for (let i of votes[applicant]) {
                    if (i !== -1) {
                        num++;
                        total += i;
                    }
                }
                averageVotes[applicant] = total / num;
            }
        }
        var items = Object.keys(averageVotes).map(function(applicant) {
            return [applicant, averageVotes[applicant]];
        });

        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        callback(items.slice(0, 3));
    });
}

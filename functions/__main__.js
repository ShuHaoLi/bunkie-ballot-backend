const lib = require('lib')({token: '98JLIlGnZLNPpT4a0o9rhT4Yle2qu9SKMk-porcnpV9Tlgkm06pvxz7CmU2qxHBq'});
const updateVote = require('./updateVote');

/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @returns {any}
 */
module.exports = (sender, receiver, message, context, callback) => {

    // Message is in the format "listing_id voter_id applicant_id vote"
    const params = message.split(' ');
    const listing_id = parseInt(params[0]);
    const voter_id = parseInt(params[1]);
    const applicant_id = parseInt(params[2]);
    const vote = parseInt(params[3]);

    lib.messagebird.tel.sms({
        originator: receiver, // (required)
        recipient: sender, // (required)
        body: `Successfully received message: ${message}` // (required)
    }, (err, result) => {
        updateVote(listing_id, voter_id, applicant_id, vote, context, function(err, data) {
            callback(null);
        });
    });
};

const lib = require('lib')({token: '98JLIlGnZLNPpT4a0o9rhT4Yle2qu9SKMk-porcnpV9Tlgkm06pvxz7CmU2qxHBq'});
const updateVote = require('./updateVote');

/**
 * @param {string} sender The phone number that sent the text to be handled
 * @param {string} receiver The StdLib phone number that received the SMS
 * @param {string} message The contents of the SMS
 * @returns {string}
 */
module.exports = (sender, receiver, message, context, callback) => {

    lib.messagebird.tel.sms({
        originator: receiver, // (required)
        recipient: sender, // (required)
        body: message // (required)
    }, (err, result) => {
        updateVote(message, context, function(err, data) {
            callback(null, JSON.stringify(data));
        });
    });
};

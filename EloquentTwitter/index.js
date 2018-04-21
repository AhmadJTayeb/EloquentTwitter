/**
 * This module deals with Twitter REST API effectively.
 *
 * @module
 * @type {EloquentTwitter}
 * @author Ahmad Tayeb
 * @version 1.0
 * @data January, 12, 2018
 */
module.exports = {
    EloquentTwitter: require('./EloquentTwitter'),
    EloquentTwitterEvent: require('./EloquentTwitterEvent'),
    Data: {
        DataTweet: require('./data/DataTweet'),
        DataDirectMessage: require('./data/DataDirectMessage')
    }
};
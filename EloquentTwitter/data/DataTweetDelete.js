/**
 * The class represents the data deleted tweet that is received form callback.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataTweetDelete {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} tweetDelete - the tweetDelete data
     */
    constructor(tweetDelete) {

        /**
         * @type {Object}
         * @private
         */
        this._data = tweetDelete;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} url
     */
    get data() {
        return this._data;
    }

    /**
     * Get the tweet id.
     *
     * @public
     * @get
     * @return {string} ex: 950419294101430272
     */
    get tweetID() {
        return this._data.id_str;
    }

    /**
     * Get the user id who deleted the tweet.
     *
     * @public
     * @get
     * @return {string} ex: 399856418
     */
    get userID() {
        return this._data.user_id_str;
    }

    /**
     * Get Unix timestamp.
     *
     * @public
     * @get
     * @return {number} int. timestamp_ms
     */
    get timestamp() {
        return this._data.timestamp_ms;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} tweet id
     */
    toString() {
        return this.tweetID;
    }
}

/**
 * @module
 * @type {DataTweetDelete}
 */
module.exports = DataTweetDelete;
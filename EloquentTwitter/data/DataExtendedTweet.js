/**
 * The class represents the data extended tweet that is received within the DataTweet object.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
const DataEntities = require('./DataEntities');

class DataExtendedTweet {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} extendedTweet - the extendedTweet data
     */
    constructor (extendedTweet) {

        /**
         * @type {Object}
         * @private
         */
        this._data = extendedTweet;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @get
     * @return {Object} extendedTweet
     */
    get data() {
        return this._data;
    }

    /**
     * The full text ot the tweet.
     *
     * @get
     * @return {string} full_text
     */
    get text() {
        return this._data.full_text;
    }

    /**
     * Get the entities (mentions, urls, hashtages, ...) of the tweet. This will return the extendedTweet entities
     * if it is available.
     * entities: a collection of common entities found in Tweets, including hashtags, links, and user mentions.
     * This entities object does include a media attribute, but its implementation in the entiites section is only
     * completely accurate for Tweets with a single photo. For all Tweets with more than one photo, a video, or
     * animated GIF, the reader is directed to the extended_entities section.
     *
     * @get
     * @return {DataEntities}
     */
    get entities() {
        return new DataEntities(this._data.entities);
    }

    /**
     * Get the string of the object.
     *
     * @return {string} text
     */
    toString() {
        return this.text;
    }
}

/**
 * @module
 * @type {DataExtendedTweet}
 */
module.exports = DataExtendedTweet;
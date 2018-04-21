/**
 * The class represents the data hashtag that is received within the DataEntities object.
 *
 * ## Hashtag object ##
 * The entities section will contain a hashtags array containing an object for every hashtag included in the Tweet
 * body, and include an empty array if no hashtags are present.
 * The PowerTrack # Operator is used to match on the text attribute.
 * The has:hashtags Operator will match if there is at least one item in the array.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataHashtag {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} hashtag - the entities data
     */
    constructor(hashtag) {

        /**
         * @type {Object}
         * @private
         */
        this._data = hashtag;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} hashtag
     */
    get data() {
        return this._data;
    }

    /**
     * Name of the hashtag, minus the leading ‘#’ character.
     *
     * @public
     * @get
     * @return {string} ex: nodejs
     */
    get text() {
        return this._data.text;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @return {string} text
     */
    toString() {
        return this.text;
    }
}

/**
 * @module
 * @type {DataHashtag}
 */
module.exports = DataHashtag;
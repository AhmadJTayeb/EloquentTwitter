/**
 * The class represents the data user_mention that is received within the DataEntities object.
 *
 * ## User mention object ##
 * The entities section will contain a user_mentions array containing an object for every user mention included in the
 * Tweet body, and include an empty array if no user mention is present.
 * The PowerTrack @ Operator is used to match on the screen_name attribute. The has:mentions Operator will match if
 * there is at least one item in the array.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataUserMention {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} userMention - the userMention data
     */
    constructor(userMention) {

        /**
         * @type {Object}
         * @private
         */
        this._data = userMention;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} userMention
     */
    get data() {
        return this._data;
    }

    /**
     * Screen name of the referenced user.
     *
     * @public
     * @get
     * @return {string} ex: twitterapi
     */
    get username() {
        return this._data.screen_name;
    }

    /**
     * Display name of the referenced user.
     *
     * @public
     * @get
     * @return {string} ex: Twitter API
     */
    get name() {
        return this._data.name;
    }

    /**
     * ID of the mentioned user, as string.
     *
     * @public
     * @get
     * @return {string} ex: 6253282
     */
    get userId() {
        return this._data.id_str;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @return {string} name
     */
    toString() {
        return this.name;
    }
}

/**
 * @module
 * @type {DataUserMention}
 */
module.exports = DataUserMention;
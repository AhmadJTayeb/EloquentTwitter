/**
 * The class represents the data url that is received within the DataEntities object.
 *
 * ## Url object ##
 * The entities section will contain a urls array containing an object for every link included in the Tweet body, and
 * include an empty array if no links are present.
 * The has:links Operator will match if there is at least one item in the array. The url: Operator is used to match on
 * the expanded_url attribute. If you are using the Expanded URL enrichment, the url: Operator is used to match on the
 * unwound.url (fully unwound URL) attribute. If you are using the Exhanced URL enrichment, the url_title: and
 * url_decription: Operators are used to match on the unwound.title and unwound.description attributes.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataUrl {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} url - the url data
     */
    constructor(url) {

        /**
         * @type {Object}
         * @private
         */
        this._data = url;
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
     * Wrapped URL, corresponding to the value embedded directly into the raw Tweet text, and
     * the values for the indices parameter.
     *
     * @public
     * @get
     * @return {string} ex: https://t.co/yzocNFvJuL
     */
    get shortUrl() {
        return this._data.url;
    }

    /**
     * Expanded version of `display_url`.
     *
     * @public
     * @get
     * @return {string} ex: http://bit.ly/2so49n2
     */
    get fullUrl() {
        return this._data.expanded_url;
    }

    /**
     * URL pasted/typed into Tweet.
     *
     * @public
     * @get
     * @return {string} ex: bit.ly/2so49n2
     */
    get displayUrl() {
        return this._data.display_url;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @return {string} displayUrl
     */
    toString() {
        return this.displayUrl;
    }

}

/**
 * @module
 * @type {DataUrl}
 */
module.exports = DataUrl;
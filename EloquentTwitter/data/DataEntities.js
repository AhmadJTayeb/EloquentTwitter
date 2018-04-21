/**
 * The library modules
 */
const DataHashtag = require('./DataHashtag');
const DataUserMention = require('./DataUserMention');
const DataSymbol = require('./DataSymbol');
const DataUrl = require('./DataUrl');
const DataMedia = require('./DataMedia');

/**
 * The class represents the data entities that is received within the DataTweet and DataDirectMessage objects.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 * @requires DataHashtag
 * @requires DataUserMention
 * @requires DataSymbol
 * @requires DataUrl
 * @requires DataMedia
 */
class DataEntities {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} entities - the entities data
     */
    constructor(entities) {

        /**
         * @type {Object}
         * @private
         */
        this._data = entities;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} entities
     */
    get data() {
        return this._data;
    }

    /**
     * Represents hashtags which have been parsed out of the Tweet text.
     *
     * @public
     * @get
     * @return {Array.<DataHashtag>} array of DataHashtag objects
     */
    get hashtags() {
        let arrayOfHashtags = [];
        for (let i = 0; i < this._data.hashtags.length; i++) {
            arrayOfHashtags.push(new DataHashtag(this._data.hashtags[i]));
        }
        return arrayOfHashtags;
    }

    /**
     * Represents other EloquentTwitter users mentioned in the text of the Tweet.
     *
     * @public
     * @get
     * @return {Array.<DataUserMention>} array of DataUserMention objects
     */
    get userMentions() {
        let arrayOfUserMentions = [];
        for (let i = 0; i < this._data.user_mentions.length; i++) {
            arrayOfUserMentions.push(new DataUserMention(this._data.user_mentions[i]));
        }
        return arrayOfUserMentions;
    }

    /**
     * Represents symbols, i.e. $cashtags, included in the text of the Tweet.
     *
     * @public
     * @get
     * @return {Array.<DataSymbol>} array of DataSymbol objects
     */
    get symbols() {
        let arrayOfSymbols = [];
        for (let i = 0; i < this._data.symbols.length; i++) {
            arrayOfSymbols.push(new DataSymbol(this._data.symbols[i]));
        }
        return arrayOfSymbols;
    }

    /**
     * Represents URLs included in the text of a Tweet.
     *
     * @public
     * @get
     * @return {Array.<DataUrl>} array of DataUrl objects
     */
    get urls() {
        let arrayOfUrls = [];
        for (let i = 0; i < this._data.urls.length; i++) {
            arrayOfUrls.push(new DataUrl(this._data.urls[i]));
        }
        return arrayOfUrls;
    }

    /**
     * Represents media elements uploaded with the Tweet.
     *
     * @public
     * @get
     * @return {Array.<DataMedia>} array of DataMedia objects
     */
    get media() {
        if (!this._data.media) return null;
        let arrayOfMedia = [];
        for (let i = 0; i < this._data.media.length; i++) {
            arrayOfMedia.push(new DataMedia(this._data.media[i]));
        }
        return arrayOfMedia;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} text
     */
    toString() {
        return JSON.stringify(this._data);
    }
}

/**
 * @module
 * @type {DataEntities}
 */
module.exports = DataEntities;
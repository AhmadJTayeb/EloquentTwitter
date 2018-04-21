/**
 * The library modules
 */
const DataUser = require('./DataUser');
const DataEntities = require('./DataEntities');

/**
 * The class represents the data direct message that is received form the callback when the direct message
 * is created or received.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 * @requires DataUser
 * @requires DataEntities
 */
class DataDirectMessage {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} message - the message data
     * @param {EloquentTwitter} [eloquentTwitter] - the eloquentTwitter instance to enable functions.
     */
    constructor(message, eloquentTwitter) {

        /**
         * @type {Object}
         * @private
         */
        this._data = message;


        /**
         * @type {?EloquentTwitter}
         * @private
         */
        this._eloquentTwitter = eloquentTwitter || null;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} message
     */
    get data () {
        return this._data;
    }

    /**
     * The id of the direct message.
     *
     * @public
     * @get
     * @return {string} ex: 950363617093971972
     */
    get id() {
        return this._data.id_str;
    }

    /**
     * The Direct Message text.
     *
     * @public
     * @get
     * @return {string} text
     */
    get text() {
        return this._data.text;
    }

    /**
     * The user who is sending the message.
     *
     * @public
     * @get
     * @return {DataUser} the user object
     */
    get sender() {
        return new DataUser(this._data.sender);
    }

    /**
     * Get the sender.
     *
     * @return {DataUser}
     */
    get user() {
        return this.sender;
    }

    /**
     * The id_str of the user who is sending the message
     *
     * @public
     * @get
     * @return {string} ex: 399856418
     */
    get senderId() {
        return this._data.sender_id_str;
    }

    /**
     * The screen_ame of the user who is sending the message
     *
     * @public
     * @get
     * @return {string} ex: ahmad_tayeb
     */
    get senderUsername() {
        return this._data.sender_screen_name;
    }

    /**
     * The user who is receiving the message.
     *
     * @public
     * @get
     * @return {DataUser} the user object
     */
    get recipient() {
        return new DataUser(this._data.recipient);
    }

    /**
     * The id_str of the user who is receiving the message.
     *
     * @public
     * @get
     * @return {string} ex: 316279522
     */
    get recipientId() {
        return this._data.recipient_id_str;
    }

    /**
     * The screen_name of the user who is receiving the message.
     *
     * @public
     * @get
     * @return {string} ex: MrAhmad1
     */
    get recipientUsername() {
        return this._data.recipient_screen_name;
    }

    /**
     * The date of the message.
     *
     * @public
     * @get
     * @return {string} ex: Mon Jan 08 13:48:37 +0000 2018
     */
    get date() {
        return this._data.created_at;
    }

    /**
     * A Twitter entities object.
     * This will include: hashtags, symbols, user_mentions, urls.
     *
     * @public
     * @get
     * @return {DataEntities} the entities object.
     */
    get entities() {
        return new DataEntities(this._data.entities);
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

    /**
     * Send a reply to the sender.
     *
     * @param text
     * @param successCallback
     * @param errorCallback
     * @return {*}
     */
    sendReply(text, successCallback, errorCallback) {
        return (this._eloquentTwitter) ? this._eloquentTwitter.sendNewDirectMessage(this.senderId, text, successCallback, errorCallback) : null;
    }

}

/**
 * @module
 * @type {DataDirectMessage}
 */
module.exports = DataDirectMessage;
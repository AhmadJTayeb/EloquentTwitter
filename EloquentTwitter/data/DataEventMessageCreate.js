/**
 * The library modules
 */
const DataEntities = require('./DataEntities');

/**
 * The class represents the data event of the message creation that is received form callback.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataEventMessageCreate {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {object} messageCreate - the messageCreate data
     */
    constructor(messageCreate) {

        /**
         * @type {Object}
         * @private
         */
        this._data = messageCreate;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @get
     * @return {object} messageCreate
     */
    get data() {
        return this._data;
    }

    /**
     * Get the id of the event.
     *
     * @public
     * @get
     * @return {string} ex: 950436967531073541
     */
    get id() {
        return this._data.id;
    }

    /**
     * Get the Unix time of the created message.
     *
     * @public
     * @get
     * @return {number} ex: 1515436805981
     */
    get timestamp() {
        return this._data.created_timestamp;
    }

    /**
     * Type of the event. It will be 'message_create'
     *
     * @public
     * @get
     * @return {string} 'message_create'
     */
    get type() {
        return this._data.type;
    }

    /**
     * Get the id user who is receiving the message.
     *
     * @public
     * @get
     * @return {string} ex: 316279522
     */
    get recipientId() {
        return this._data.message_create.target.recipient_id;
    }

    /**
     *
     * @return {*}
     */
    get senderId() {
        return this._data.message_create.sender_id;
    }

    /**
     * Get the text of message.
     * @return {string}
     */
    get text() {
        return this._data.message_create.message_data.text;
    }

    /**
     * Get the entities object.
     *
     * @public
     * #get
     * @return {DataEntities}
     */
    get entities() {
        return new DataEntities(this._data.message_create.message_data.entities);
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} text
     */
    toString() {
        return this.text;
    }
}

/**
 * @module
 * @type {DataEventMessageCreate}
 */
module.exports = DataEventMessageCreate;
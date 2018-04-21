/**
 * The library modules
 */
const DataUser = require('./DataUser');

/**
 * The class represents the data event that is received form callback.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataEvent {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {object} event - the event data
     */
    constructor(event) {

        /**
         * @type {Object}
         * @private
         */
        this._data = event;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @get
     * @return {object} event
     */
    get data() {
        return this._data;
    }

    /**
     * Get the event type.
     *
     * @public
     * @get
     * @return {string} ex: user_update, follow
     */
    get type() {
        return this._data.event;
    }

    /**
     * Get the target user.
     *
     * @public
     * @get
     * @return {DataUser} the user object
     */
    get source() {
        return new DataUser(this._data.source);
    }

    /**
     * Get the user who trageted the event.
     *
     * @public
     * @get
     * @return {DataUser} the user object
     */
    get target() {
        return new DataUser(this._data.target);
    }

    /**
     * Get the date of the event.
     *
     * @public
     * @get
     * @return {string} ex: Mon Jan 08 18:52:42 +0000 2018
     */
    get date() {
        return this.created_at;
    }

    /**
     * Check the type of the event.
     *
     * @public
     * @param {string} type - type of the event
     * @return {boolean} true if the type is match.
     */
    isType(type) {
        return this.type === type;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} type
     */
    toString() {
        return this.type;
    }
}

/**
 * @module
 * @type {DataEvent}
 */
module.exports = DataEvent;
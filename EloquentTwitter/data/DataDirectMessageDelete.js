/**
 * The class represents the data direct message delete that is received form callback.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataDirectMessageDelete {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} directMessage - the directMessage data
     */
    constructor(directMessage) {

        /**
         * @type {Object}
         * @private
         */
        this._data = directMessage;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} directMessage
     */
    get data() {
        return this._data;
    }

    /**
     * Get the id of the direct message.
     *
     * @public
     * @get
     * @return {string} ex:
     */
    get id() {
        return this._data.id_str;
    }

    /**
     * Get the id_str of the direct message.
     *
     * @public
     * @get
     * @return {string} ex: 950418179129511940
     */
    get userId() {
        return this._data.user_id;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} id
     */
    toString() {
        return this.id;
    }
}

/**
 * @module
 * @type {DataDirectMessageDelete}
 */
module.exports = DataDirectMessageDelete;
/**
 * The class represents the data error object that will be received when the error is happened.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 * @version 1.0
 */
class DataError {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} errorData - the error data object that are received from the error callback.
     */
    constructor(errorData) {

        /**
         * @type {Object}
         * @private
         */
        this._data = errorData;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} errorData
     */
    get data() {
        return this._data;
    }

    /**
     * Get the data error object.
     *
     * @public
     * @get
     * @return {Object} errorData
     */
    get error() {
        return this._data;
    }

    /**
     * Get the error message.
     *
     * @public
     * @get
     * @return {string} message
     */
    get message() {
        return this._data.message;
    }

    /**
     * Get the error code.
     *
     * @get
     * @return {Number} int
     */
    get code() {
        return this._data.code;
    }

    /**
     * Get all errors.
     *
     * @public
     * @get
     * @return {Array.<DataError>} arrays of DataError
     */
    get allErrors() {
        let arrayOfErrors = [];
        for (let i = 0; i < this._data.allErrors.length; i++) {
            arrayOfErrors.push(new DataError(this._data.allErrors[i]));
        }
        return arrayOfErrors;
    }

    /**
     * Get twitter replay object.
     *
     * @public
     * @get
     * @return {Object} twitter replay object
     */
    get twitterReply() {
        return this._data.twitterReply;
    }

    /**
     * Get status code.
     * Example: 404
     *
     * @public
     * @get
     * @return {Number} int
     */
    get statusCode() {
        return this._data.statusCode;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} message
     */
    toString() {
        return this.message;
    }
}

/**
 * @module
 * @type {DataError}
 */
module.exports = DataError;
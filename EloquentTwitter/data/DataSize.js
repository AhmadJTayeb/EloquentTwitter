/**
 * The class represents the data size that is received within the DataMedia object.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataSize {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {object} size - the size data
     */
    constructor(size) {

        /**
         * @type {Object}
         * @private
         */
        this._data = size;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @get
     * @return {Object} size
     */
    get data() {
        return this._data;
    }

    /**
     * Width in pixels of this size.
     *
     * @get
     * @return {number} int. width in pixels
     */
    get width() {
        return this._data.w;
    }

    /**
     * Height in pixels of this size.
     *
     * @get
     * @return {number} int height in pixels
     */
    get height() {
        return this._data.h;
    }

    /**
     * Resizing method used to obtain this size.
     * A value of fit means that the media was resized to fit one dimension, keeping its native aspect ratio.
     * A value of crop means that the media was cropped in order to fit a specific resolution.
     *
     * @get
     * @return {string} (fit, crop)
     */
    get resize() {
        return this._data.resize;
    }

    /**
     * Get the string of the object.
     *
     * @return {string} coordinates
     */
    toString() {
        return JSON.stringify(this.data);
    }
}

/**
 * @module
 * @type {DataSize}
 */
module.exports = DataSize;
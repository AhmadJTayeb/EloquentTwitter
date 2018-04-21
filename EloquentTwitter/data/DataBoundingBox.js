/**
 * The class represents the data bounding_box that is received within the DataPlace object.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataBoundingBox {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} boundingBox - the boundingBox data
     */
    constructor(boundingBox) {

        /**
         * @type {Object}
         * @private
         */
        this._data = boundingBox;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} tweetObj
     */
    get data() {
        return this._data;
    }

    /**
     * A series of longitude and latitude points, defining a box which will contain the Place entity this bounding
     * box is related to. Each point is an array in the form of [longitude, latitude]. Points are grouped into an
     * array per bounding box. Bounding box arrays are wrapped in one additional array to be compatible with the
     * polygon notation.
     *
     * @public
     * @get
     * @return {Array.<Array.<number>>} Array of Array of Array of Float
     */
    get coordinates() {
        return this._data.coordinates;
    }

    /**
     * The type of data encoded in the coordinates property. This will be “Polygon” for bounding boxes and “Pointn”
     * for Tweets with exact coordinates.
     *
     * @public
     * @get
     * @return {string} ex: Polygon
     */
    get type() {
        return this._data.type;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} coordinates
     */
    toString() {
        return this.coordinates.toString();
    }
}

/**
 * @module
 * @type {DataBoundingBox}
 */
module.exports = DataBoundingBox;
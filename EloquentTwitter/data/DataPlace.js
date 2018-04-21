/**
 * The library modules
 */
const DataBoundingBox = require('./DataBoundingBox');

/**
 * The class represents the data place that is received within the DataTweet object.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 * @requires DataBoundingBox
 */
class DataPlace {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} place - the place data
     */
    constructor(place) {

        /**
         * @type {Object}
         * @private
         */
        this._data = place;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @get
     * @return {Object} tweetObj
     */
    get data() {
        return this._data;
    }

    /**
     * ID representing this place. Note that this is represented as a string, not an integer.
     *
     * @get
     * @return {string} id
     */
    get id() {
        return this._data.id;
    }

    /**
     * The type of location represented by this place.
     *
     * @get
     * @return {string} ex: city
     */
    get placeType() {
        return this._data.place_type;
    }

    /**
     * Short human-readable representation of the place’s name.
     *
     * @get
     * @return {string} ex: Manhattan
     */
    get name() {
        return this._data.name;
    }

    /**
     * Full human-readable representation of the place’s name.
     *
     * @get
     * @return {string} ex: Manhattan, NY
     */
    get fullName() {
        return this._data.full_name;
    }

    /**
     * Shortened country code representing the country containing this place.
     *
     * @get
     * @return {string} ex: US
     */
    get countryCode() {
        return this._data.country_code;
    }

    /**
     * Name of the country containing this place.
     *
     * @get
     * @return {string} ex: United States
     */
    get country() {
        return this._data.country;
    }

    /**
     * A bounding box of coordinates which encloses this place.
     *
     * @get
     * @return {DataBoundingBox}
     */
    get boundingBox() {
        return new DataBoundingBox(this._data.bounding_box);
    }

    /**
     * Get the string of the object.
     *
     * @return {string} coordinates
     */
    toString() {
        return this.fullName;
    }
}

/**
 * @module
 * @type {DataPlace}
 */
module.exports = DataPlace;
/**
 * The class represents the data symbol that is received within the DataEntities object.
 *
 * ## Symbol object ##
 * The entities section will contain a symbols array containing an object for every $cashtag included in the Tweet
 * body, and include an empty array if no symbol is present.
 * The PowerTrack $ Operator is used to match on the text attribute. The has:symbols Operator will match if there is
 * at least one item in the array.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataSymbol {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} symbol - the symbol data
     */
    constructor(symbol) {

        /**
         * @type {Object}
         * @private
         */
        this._data = symbol;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} symbol
     */
    get data() {
        return this._data;
    }

    /**
     * Name of the cashhtag, minus the leading ‘$’ character.
     *
     * @public
     * @get
     * @return {string} text
     */
    get text() {
        return this._data.text;
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
}

/**
 * @module
 * @type {DataSymbol}
 */
module.exports = DataSymbol;
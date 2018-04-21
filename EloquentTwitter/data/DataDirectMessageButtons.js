/**
 * The class represents the data ctas to prepare the data to send it with the request of message.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataDirectMessageButtons {

    /**
     * Constructor to set the data object.
     *
     * @public
     * @constructor
     */
    constructor() {

        /**
         * @type {Array.<{type: string, label: string, url: string}>}
         * @private
         */
        this._data = []
    }

    /**
     * Add a new button.
     *
     * @param {string} label - The text that will be displayed to the user on each button.
     *        Max string length of 36 characters.
     * @param {string} url - A valid http or https target URL of the button.
     * @return {DataDirectMessageButtons}
     */
    addButton(label, url) {
        this._data.push({
            "type" : "web_url",
            "label": label,
            "url": url
        });
        return this;
    }

    /**
     * Get the size of the buttons array.
     *
     * @public
     * @get
     * @return {number}
     */
    get size() {
        return this._data.length;
    }

    /**
     * Get the array of buttons.
     *
     * @public
     * @get
     * @return {Array.<{type: string, label: string, url: string}>}
     */
    get buttons() {
        return this._data;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string}
     */
    toString() {
        return this._data.toString();
    }

    /**
     * Convert the object to ctas object to send it with the request.
     *
     * @public
     * @get
     * @return {Array.<{type: string, label: string, url: string}>}
     */
    toCtasObject() {
        return this._data;
    }
}

/**
 * @module
 * @type {DataDirectMessageButtons}
 */
module.exports = DataDirectMessageButtons;
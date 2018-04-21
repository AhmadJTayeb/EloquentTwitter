/**
 * The class represents the data QuickReply to prepare the data to send it with the request of message
 * creation.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataDirectMessageQuickReply {

    /**
     * Constructor to set the data object.
     *
     * @public
     * @constructor
     */
    constructor() {

        /**
         * @type {{type: string, options: Array.<{label: string, description: string, metadata: string}>}}
         * @private
         */
        this._data = {
            "type": "options",
            "options": []
        };
    }

    /**
     * Get the data object that is initialized form the constructor.
     *
     * @public
     * @get
     * @return {Object} quick_reply
     */
    get data() {
        return this._data;
    }

    /**
     * Add a new option.
     *
     * @public
     * @param {string} label - The text label displayed on the button face. Label text is returned as the user’s message response.
     *        String, max length of 36 characters including spaces.
     *        Values with URLs are not allowed and will return an error.
     * @param {string} [description] - Optional description text displayed under label text.
     *         All options must have this property defined if property is present in any option.
     *         Text is auto-wrapped and will display on a max of two lines and supports n for controling line breaks.
     *         Description text is not include in the user’s message response.
     *         String, max length of 72 characters including spaces.
     * @param {string} [metadata] - Metadata that will be sent back in the webhook request.
     *         String, max length of 1,000 characters including spaces.
     * @return {DataDirectMessageQuickReply} this obejct.
     */
    addOption(label, description, metadata) {
        if (!metadata) metadata = 'external_id_' + (this._data.options.length + 1);
        if (!description) description = null;
        this._data.options.push({
            "label": label,
            "description": description,
            "metadata": metadata
        });
        return this;
    }

    /**
     * Get the size of the current options.
     *
     * @public
     * @get
     * @return {number}
     */
    get size() {
        return this._data.options.length;
    }

    /**
     * Get the array of options.
     *
     * @public
     * @get
     * @return {Array.<{label: string, description: string, metadata: string}>}}} array of objects
     */
    get options() {
        return this._data.options;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string}
     */
    toString() {
        return this._data.options.toString();
    }

    /**
     * Get the quick replay object to sent it with the request.
     *
     * @public
     * @return {Object} quick_reply
     */
    toQuickReplyObject() {
        return (this._data.options.length === 0) ? null : this._data;
    }
}

/**
 * @module
 * @type {DataDirectMessageQuickReply}
 */
module.exports = DataDirectMessageQuickReply;
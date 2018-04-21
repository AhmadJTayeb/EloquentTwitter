/**
 * The class represents the data search_metadata that is received form tweet search callback.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataSearchMetadata {

    /**
     * Constructor to set the data.
     *
     * @param {string} searchMetadata
     */
    constructor(searchMetadata) {

        /**
         * @type {string}
         * @private
         */
        this._data = searchMetadata;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @get
     * @return {Object} searchMetadata
     */
    get data() {
        return this._data;
    }

    /**
     * Returns results with an ID less than (that is, older than) or equal to the specified ID.
     *
     * @public
     * @get
     * @return {string} ex: 950361232678285312
     */
    get maxId() {
        return this._data.max_id_str;
    }

    /**
     * Get url to get the next result.
     *
     * @public
     * @get
     * @return {string} ex: ?max_id=949965711937556479&q=%40ahmad_tayeb&include_entities=1&result_type=recent
     */
    get nextResults() {
        return this._data.next_results;
    }

    /**
     * A UTF-8, URL-encoded search query of 500 characters maximum, including operators.
     * Queries may additionally be limited by complexity.
     *
     * @public
     * @get
     * @return {string} ex: %40ahmad_tayeb => @ahmad_tayeb
     */
    get query() {
        return this._data.query;
    }

    /**
     * Get url to refresh current query.
     *
     * @public
     * @get
     * @return {string} ex: ?since_id=950361232678285312&q=%40ahmad_tayeb&result_type=recent&include_entities=1
     */
    get refreshUrl() {
        return this._data.refresh_url;
    }

    /**
     * The number of tweets to return per page, up to a maximum of 100. Defaults to 15.
     * This was formerly the “rpp” parameter in the old Search API.
     *
     * @public
     * @get
     * @return {number} int.
     */
    get count() {
        return this._data.count;
    }

    /**
     * Returns results with an ID greater than (that is, more recent than) the specified ID. There are limits to the
     * number of Tweets which can be accessed through the API. If the limit of Tweets has occured since the since_id,
     * the since_id will be forced to the oldest ID available.
     *
     * @public
     * @get
     * @return {string} ex: 950361232678285312
     */
    get sinceId() {
        return this._data.since_id;
    }

}

/**
 * @module
 * @type {DataSearchMetadata}
 */
module.exports = DataSearchMetadata;
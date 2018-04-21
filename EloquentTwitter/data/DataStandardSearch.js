/**
 * Returns a collection of relevant Tweets matching a specified query.
 * Please note that EloquentTwitter’s search service and, by extension, the Search API is not meant to be an exhaustive source of Tweets. Not all Tweets will be indexed or made available via the search interface.
 * To learn how to use EloquentTwitter Search effectively, please see the Standard search operators page for a list of available filter operators. Also, see the Working with Timelines page to learn best practices for navigating results by since_id and max_id.
 * https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataStandardSearch {

    /**
     * Constructor to set the data.
     *
     * @param {string} query - required Twitter query.
     */
    constructor(query) {

        /**
         * @private
         * @type {{}}
         */
        this._data = {};

        //If query is passed
        if (query) this.query = query;
        //Set the default setting
        this.setTweetModeToExtended();
        this.resultType = 'recent';
        this.count = 100;
    }

    /**
     * A UTF-8, URL-encoded search query of 500 characters maximum, including operators.
     * Queries may additionally be imited by complexity.
     * Ex: @noradio
     *
     * @public
     * @set
     * @param {string} q - the Twitter query
     */
    set query(q) {
        this._data.q = q;
    }

    /**
     * Returns tweets by users located within a given radius of the given latitude/longitude.
     * The location is preferentially taking from the Geotagging API, but will fall back to their Twitter profile.
     * The parameter value is specified by ” latitude,longitude,radius ”, where radius units must be specified as
     * either ” mi ” (miles) or ” km ” (kilometers).
     * Note that you cannot use the near operator via the API to geocode arbitrary locations;
     * however you can use this geocode parameter to search near geocodes directly.
     * A maximum of 1,000 distinct “sub-regions” will be considered when using the radius modifier.
     * Ex: 37.781157 -122.398720 1mi
     *
     * @public
     * @param {number} latitude - float. ex: 37.781157
     * @param {number} longitude - float. ex: -122.398720
     * @param {number} radius - int. ex: 1
     * @param {boolean} isRadiusUnitInKM - km if true, else mi
     */
    geocode(latitude,longitude,radius, isRadiusUnitInKM) {
        this._data.geocode = latitude + " " + longitude + " " + radius + ((isRadiusUnitInKM) ? 'km' : 'mi');
    }

    /**
     * Restricts tweets to the given language, given by an ISO 639-1 code.
     * Language detection is best-effort.
     * Ex: eu
     *
     * @public
     * @set
     * @param {string} lang - id of the language.
     */
    set language(lang) {
        this._data.lang = lang;
    }

    /**
     * Specify the language of the query you are sending (only ja is currently effective).
     * This is intended for language-specific consumers and the default should work in the majority of cases.
     * Ex: ja
     *
     * @public
     * @set
     * @param {string} lang - id of the language.
     */
    set locale(lang) {
        this._data.locale = lang;
    }

    /**
     * Optional. Specifies what type of search results you would prefer to receive.
     * The current default is “mixed.” Valid values include:
     * mixed : Include both popular and real time results in the response.
     * recent : return only the most recent results in the response
     * popular : return only the most popular results in the response.
     *
     * @public
     * @set
     * @param {string} type - (mixed, recent, popular)
     */
    set resultType(type) {
        this._data.result_type = type;
    }

    /**
     * The number of tweets to return per page, up to a maximum of 100. Defaults to 15.
     * This was formerly the “rpp” parameter in the old Search API.
     *
     * @public
     * @set
     * @param {number} count - int.
     */
    set count(count) {
        this._data.count = count;
    }

    /**
     * Returns tweets created before the given date. Date should be formatted as YYYY-MM-DD. Keep in mind that the
     * search index has a 7-day limit.
     * In other words, no tweets will be found for a date older than one week.
     *
     * @public
     * @set
     * @param {string} date - YYYY-MM-DD , ex: 2015-07-19
     */
    set until(date) {
        this._data.until = date;
    }

    /**
     * Returns results with an ID greater than (that is, more recent than) the specified ID.
     * There are limits to the number of Tweets which can be accessed through the API.
     * If the limit of Tweets has occured since the since_id, the since_id will be forced to the oldest ID available.
     *
     * @set
     * @param {string} id - the id of tweet.
     */
    set sinceId(id) {
        this._data.since_id = id;
    }

    /**
     * Returns results with an ID less than (that is, older than) or equal to the specified ID.
     *
     * @set
     * @param {string} id - the id of tweet.
     */
    set maxId(id) {
        this._data.max_id = id;
    }

    /**
     * The entities node will not be included when set to false.
     *
     * @public
     * @set
     * @param {boolean} isIncludeEntities
     */
    set includeEntities(isIncludeEntities) {
        this._data.include_entities = isIncludeEntities;
    }

    /**
     * To set the tweet mode to extended.
     *
     * @public
     */
    setTweetModeToExtended() {
        this._data.tweet_mode = 'extended';
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string}
     */
    toString() {
        return JSON.stringify(this._data);
    }

    /**
     * Get the search object.
     *
     * @public
     * @return {object} search object.
     */
    toSearchObject() {
        return this._data;
    }
}

/**
 * @module
 * @type {DataStandardSearch}
 */
module.exports = DataStandardSearch;
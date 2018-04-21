/**
 * External Libraries
 */
const fs = require('fs');
const Twit = require('twit');
const StreamingAPIConnection = require('twit/lib/streaming-api-connection');

/**
 * The library modules
 */
const EloquentEvent = require('./EloquentEvent');
const EloquentTwitterEvent = require('./EloquentTwitterEvent');
const DataError = require('./data/DataError');
const DataTweet = require('./data/DataTweet');
const DataUser = require('./data/DataUser');
const DataSearchMetadata = require('./data/DataSearchMetadata');
const DataEventMessageCreate = require('./data/DataEventMessageCreate');
const DataDirectMessage = require('./data/DataDirectMessage');
const DataConnections = require('./data/DataConnections');
const DataStandardSearch = require('./data/DataStandardSearch');
const DataDirectMessageButtons = require('./data/DataDirectMessageButtons');
const DataDirectMessageQuickReply = require('./data/DataDirectMessageQuickReply');
const DataEvent = require('./data/DataEvent');
const DataDirectMessageDelete = require('./data/DataDirectMessageDelete');
const DataTweetDelete = require('./data/DataTweetDelete');

/**
 * This class deals with Standard Twitter API.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 * @requires fs
 * @requires Twit
 * @requires ./EloquentEvent
 * @requires ./EloquentTwitterEvent
 * @requires ./data/DataError
 * @requires ./data/DataTweet
 * @requires ./data/DataUser
 * @requires ./data/DataSearchMetadata
 * @requires ./data/DataEventMessageCreate
 * @requires ./data/DataDirectMessage
 * @requires ./data/DataConnections
 * @requires ./data/DataStandardSearch
 * @requires ./data/DataDirectMessageButtons
 * @requires ./data/DataDirectMessageQuickReply
 * @requires ./data/DataEvent
 * @requires ./data/DataDirectMessageDelete
 * @requires ./data/DataTweetDelete
 */
class EloquentTwitter {

    /**
     * Constructor to set the object and the dependencies.
     *
     * @param {?{
     * consumer_key: String,
     * consumer_secret: String,
     * access_token: String,
     * access_token_secret: String,
     * timeout_ms: number }} keysObject - keys object.
     */
    constructor(keysObject) {

        this.setKeys(keysObject);

        /**
         * User stream events.
         * @type {EloquentEvent}
         * @private
         */
        this._userStreamEvents = new EloquentEvent();

        /**
         * Statuses filter stream events.
         * @type {EloquentEvent}
         * @private
         */
        this._statusesFilterStreamEvents = new EloquentEvent();

        /**
         * @type {StreamingAPIConnection}
         * @private
         */
        this._userStream = null;

        /**
         * @type {StreamingAPIConnection}
         * @private
         */
        this._statusesFilterStream = null;

        /**
         * To store the track of the filter stram.
         * @type {Array.<string>}
         * @private
         */
        this._trackaStatusesFilterStream = [];
    }

    /**
     * Get statuses filter stream tracks.
     * @return {Array<string>}
     */
    getTrackaStatusesFilterStream() {
        return this._trackaStatusesFilterStream;
    }

    /**
     * Register new event to user stream.
     *
     * @public
     * @param {string} on - the specefic event.
     * @param {function} fun - the callback function
     */
    registerUserStreamEvent(on, fun) {
        return this._userStreamEvents.registerEvent(on, fun);
    }

    /**
     * Register new event to statuses filter stream.
     *
     * @public
     * @param {string} on - the specefic event.
     * @param {function} fun - the callback function
     */
    registerStatusesFilterStreamEvent(on, fun) {
        return this._statusesFilterStreamEvents.registerEvent(on, fun);
    }

    /**
     * Add tracks to the status stream.
     *
     * @public
     * @param {Array.<string>} tracks
     */
    addTracksToStatusesFilterStream(...tracks) {
        this._trackaStatusesFilterStream.push(...tracks);
    }

    /**
     * Reset tracks to the status stream.
     *
     * @public
     */
    resetTracksToStatusesFilterStream() {
        this._trackaStatusesFilterStream = [];
    }

    /**
     * Set the API keys.
     *
     * @public
     * @param {{
     * consumer_key: String,
     * consumer_secret: String,
     * access_token: String,
     * access_token_secret: String,
     * timeout_ms: number }} keysObject - keys object.
     */
    setKeys(keysObject) {
        /**
         * @type {Twit|null}
         * @private
         */
        this._twit = (keysObject) ? new Twit(keysObject) : null;
    }

    /**
     * Get the twit object.
     *
     * @public
     * @return {Twit}
     */
    getTwitObject() {
        return this._twit;
    }


    /**
     * Get current user information (User whose these credentials are related to).
     * # API : GET account/verify_credentials
     *
     * @public
     * @param {EloquentTwitter~UserCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getCurrentUserInfo(successCallback, errorCallback) {
        return this._twit.get('account/verify_credentials', {
            include_entities: true, include_email: true
        } , function(err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataUser(data));
        });
    }

    /**
     * Returns a collection of relevant Tweets matching a specified query.
     * # API : GET search/tweets
     *
     * Note:
     * The EloquentTwitter's standard search API allows queries against the indices of recent or popular Tweets and behaves
     * similarly to, but not exactly like the Search feature available in EloquentTwitter mobile or web clients,
     * such as EloquentTwitter.com search. The EloquentTwitter Search API searches against a sampling of recent Tweets published in
     * the past 7 days.
     * Before digging in, it’s important to know that the standard search API is focused on relevance and not
     * completeness. This means that some Tweets and users may be missing from search results. If you want to match for
     * completeness you should consider the premium or enterprise search APIs.
     *
     * @public
     * @param {DataStandardSearch} dataStandardSearch - to prepare standard search object.
     * @param {EloquentTwitter~SearchTweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    searchTweets(dataStandardSearch, successCallback, errorCallback) {
        const self = this;
        return this._twit.get('search/tweets', dataStandardSearch.toSearchObject(), function(err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            let arrayOfTweets = [];
            for (let i = 0; i < data.statuses.length; i++) {
                arrayOfTweets.push(new DataTweet(data.statuses[i], self));
            }
            if (successCallback) successCallback(arrayOfTweets, new DataSearchMetadata(data.search_metadata));
        });
    }

    /**
     * Returns fully-hydrated DataTweet objects for up to 100 Tweets per request.
     * This method is especially useful to get the details (hydrate) a collection of Tweet IDs.
     * # API : POST statuses/lookup
     *
     * @param {(Array.<string>|string)} arrayOfTweetIDs - array of tweets ids (id_str) or single id.
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data are received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getTweetsByIDs(arrayOfTweetIDs, successCallback, errorCallback) {
        const self = this;
        //Check if it is not array (single id), make it in the array.
        if (!Array.isArray(arrayOfTweetIDs)) arrayOfTweetIDs = [arrayOfTweetIDs];
        return this._twit.post('statuses/lookup', {
            id: arrayOfTweetIDs.join(','), include_entities: true, tweet_mode: 'extended'
        }, function(err, tweets, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            let arrayOfTweets = [];
            for (let i = 0; i < tweets.length; i++) {
                arrayOfTweets.push(new DataTweet(tweets[i], self));
            }
            if (successCallback) successCallback(arrayOfTweets);
        });
    }

    /**
     * Get all tweets by searching (Last 7 days tweets).
     * # API : GET search/tweets
     *
     * @public
     * @param {string} query - the twitter query.
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data are received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getTweetsBySearch(query, successCallback, errorCallback) {
        return this.searchTweets(new DataStandardSearch(query), successCallback, errorCallback);
    }

    /**
     * Get the related tweets from a specific user for a specific tweet id_str.
     * # API : GET statuses/user_timeline
     *
     * @public
     * @param {string} username - for the target username. Ex: ahmad_tayeb
     * @param {string} tweetId - id_str for the target tweet.
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data are received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getRelatedTweetsFromUser(username, tweetId, successCallback, errorCallback) {
        return this.getUserTweetsTimelineByUsername(username, false, function (tweets) {
            //Array to store related tweets
            let relatedTweets = [];
            //Check every tweet is related to the tweet id
            for (let i = 0; i < tweets.length; i++) {
                let tweet = tweets[i];
                if (tweet.inReplyToStatusId === tweetId) {
                    //It is related to the tweet id
                    relatedTweets.push(tweet);
                }
            }
            //Success callback
            if (successCallback) successCallback(relatedTweets);
        }, errorCallback);
    }

    /**
     * Returns a single Tweet, specified by the id parameter. The Tweet’s author will also be embedded within the Tweet.
     * About Geo:
     * If there is no geotag for a status, then there will be an empty <geo/> or "geo" : {}.
     * This can only be populated if the user has used the Geotagging API to send a statuses/update.
     * The JSON response mostly uses conventions laid out in GeoJSON. The coordinates that EloquentTwitter renders are reversed
     * from the GeoJSON specification (GeoJSON specifies a longitude then a latitude, whereas EloquentTwitter represents it as
     * a latitude then a longitude), eg: "geo": { "type":"Point", "coordinates":[37.78029, -122.39697] }
     * # API : GET statuses/show/:id
     *
     * @public
     * @param {string} tweetId - The numerical ID of the desired Tweet (id_str).
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getTweetsByID(tweetId, successCallback, errorCallback) {
        const self = this;
        return this._twit.get('statuses/show/:id', {
            id: tweetId, include_my_retweet: true, tweet_mode: 'extended', result_type:'recent', include_entities: true
        }, function(err, tweet, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataTweet(tweet, self));
        });
    }

    /**
     * Returns a variety of information about the user specified by the required user_id parameter.
     * The author’s most recent Tweet will be returned inline when possible.
     * GET users / lookup is used to retrieve a bulk collection of user objects.
     * You must be following a protected user to be able to see their most recent Tweet.
     * If you don’t follow a protected user, the user’s Tweet will be removed.
     * A Tweet will not always be returned in the current_status field.
     * # API : GET users/show
     *
     * @public
     * @param {string} userId - The ID of the user for whom to return results.
     * @param {EloquentTwitter~UserCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getUserByID(userId, successCallback, errorCallback) {
        return this._twit.get('users/show',{
            id: userId, tweet_mode: 'extended', include_entities: true
        }, function(err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataUser(data));
        });
    }

    /**
     * Returns a variety of information about the user specified by the required screen_name parameter.
     * The author’s most recent Tweet will be returned inline when possible.
     * GET users / lookup is used to retrieve a bulk collection of user objects.
     * You must be following a protected user to be able to see their most recent Tweet.
     * If you don’t follow a protected user, the user’s Tweet will be removed.
     * A Tweet will not always be returned in the current_status field.
     * # API : GET users/show
     *
     * @public
     * @param {string} username - The screen name of the user for whom to return results.
     * @param {EloquentTwitter~UserCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getUserByUsername(username, successCallback, errorCallback) {
        return this._twit.get('users/show',{
            screen_name: username, tweet_mode: 'extended', include_entities: true
        }, function(err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataUser(data));
        });
    }


    /**
     * Get replies to the tweet and username.
     * # API : GET search/tweets
     *
     * @public
     * @param {string} toUsername - reply to the username
     * @param {string} toTweetID - reply to tweet id_str
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getReplies(toUsername, toTweetID, successCallback, errorCallback) {
        let searchObject = new DataStandardSearch('to:' + toUsername);
        searchObject.sinceId = toTweetID;
        return EloquentTwitter.searchTweets(searchObject, (dataTweets, dataSearchMetadata) => {
            let arrayOfRelatedReplies = [];
            //Check and get the related replies
            for (let i = 0; i < dataTweets.length; i++) {
                if (dataTweets[i].inReplyToStatusId === toTweetID) {
                    arrayOfRelatedReplies.push(dataTweets[i]);
                }
            }
            //Success callback
            if (successCallback) successCallback(arrayOfRelatedReplies);
        }, errorCallback);
    }

    /**
     * Returns the most recent Tweets liked by the authenticating.
     * # API : GET favorites/list
     *
     * @public
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getFavoritesList(successCallback, errorCallback, parameters) {
        const self = this;
        return this._twit.get('favorites/list', {
            count: 200, include_entities: true, tweet_mode: 'extended', ...parameters
        }, function(err, tweets, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            let arrayOfTweets = [];
            for (let i = 0; i < tweets.length; i++) {
                arrayOfTweets.push(new DataTweet(tweets[i], self));
            }
            if (successCallback) successCallback(arrayOfTweets);
        });
    }

    /**
     * Returns the most recent Tweets liked by the specified user (screen_name).
     * # API : GET favorites/list
     *
     * @public
     * @param {string} username - The screen name of the user for whom to return results.
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getFavoritesListByUsername(username, successCallback, errorCallback) {
        return this.getFavoritesList(successCallback, errorCallback, {screen_name: username});
    }

    /**
     * Returns the most recent Tweets liked by the specified user (id_str).
     * # API : GET favorites/list
     *
     * @public
     * @param {string} id - The ID of the user for whom to return results (id_str).
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getFavoritesListById(id, successCallback, errorCallback) {
        return this.getFavoritesList(successCallback, errorCallback, {user_id: id});
    }

    /**
     * Returns the most recent Tweets authored by the authenticating user that have been retweeted by others.
     * # API : GET statuses/retweets_of_me
     *
     * @public
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getStatusesRetweets(successCallback, errorCallback) {
        const self = this;
        return this._twit.get('statuses/retweets_of_me', {
            include_entities: true, include_user_entities: true, count: 100, trim_user: true, tweet_mode: 'extended'
        }, function(err, tweets, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            let arrayOfTweets = [];
            for (let i = 0; i < tweets.length; i++) {
                arrayOfTweets.push(new DataTweet(tweets[i], self));
            }
            if (successCallback) successCallback(arrayOfTweets);
        });
    }

    /**
     * Upload picture to EloquentTwitter and return the media_id_string. This can be attached to a tweet or message.
     * Size: Image 5MB, GIF 15MB, Video 15MB
     * Use this endpoint to upload images to EloquentTwitter. It returns a media_id which can be used in most EloquentTwitter endpoints
     * that accept images. For example, a media_id value can be used to create a Tweet with an attached photo using the
     * POST statuses/update endpoint.
     * This is a simple image upload endpoint, with a limited set of features. The preferred alternative is the
     * chunked upload endpoint which supports both images and videos, provides better reliability, allows resumption of
     * file uploads, and other important features. In the future, new features will only be supported for the chunked
     * upload endpoint.
     * # API : POST media/upload
     * # API : POST media/metadata/create
     *
     * @public
     * @param {string} src - the path to the image.
     * @param {string} altText - the alternative text to attach with the image.
     * @param {EloquentTwitter~MediaIdCallback} successCallback - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponseMediaId}
     */
    uploadMediaImage(src, altText, successCallback, errorCallback) {
        return new Promise((resolve, reject) => {
            let b64content = fs.readFileSync(src, { encoding: 'base64' });
            // first we must post the media to EloquentTwitter
            this._twit.post('media/upload', { media_data: b64content, shared: true }, function (err, data, response) {
                if (err) {
                    reject(err);
                    if (errorCallback) errorCallback(new DataError(err));
                }
                // now we can assign alt text to the media, for use by screen readers and
                // other text-based presentations and interpreters
                let meta_params = { media_id: data.media_id_string, alt_text: { text: altText } };

                this._twit.post('media/metadata/create', meta_params, function (err) {
                    if (err) {
                        reject(err);
                        if (errorCallback) errorCallback(new DataError(err));
                    }
                    resolve(meta_params.media_id, data);
                    if (successCallback) successCallback(meta_params.media_id, data);
                })
            })
        });
    }

    /**
     * Updates the authenticating user’s current status, also known as Tweeting.
     * For each update attempt, the update text is compared with the authenticating user’s recent Tweets. Any attempt
     * that would result in duplication will be blocked, resulting in a 403 error. A user cannot submit the same status
     * twice in a row.
     * While not rate limited by the API, a user is limited in the number of Tweets they can create at a time.
     * If the number of updates posted by the user reaches the current allowed limit this method will return an
     * HTTP 403 error.
     * # API : POST statuses/update
     *
     * @public
     * @param {string} text
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters.
     * @return {EloquentTwitter~PromiseResponse}
     */
    postNewTweet(text, successCallback, errorCallback, parameters) {
        const self = this;
        return this._twit.post('statuses/update', {
            status: text, ...parameters
        }, function(err, tweet, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataTweet(tweet, self));
        });
    }

    /**
     * Updates the authenticating user’s current status, also known as Tweeting.
     * For each update attempt, the update text is compared with the authenticating user’s recent Tweets. Any attempt
     * that would result in duplication will be blocked, resulting in a 403 error. A user cannot submit the same status
     * twice in a row.
     * While not rate limited by the API, a user is limited in the number of Tweets they can create at a time.
     * If the number of updates posted by the user reaches the current allowed limit this method will return an
     * HTTP 403 error.
     * # API : POST statuses/update
     *
     * @public
     * @param {string} text
     * @param {string} toTweetId - the tweet id_str
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters.
     * @return {EloquentTwitter~PromiseResponse}
     */
    postNewReplyToTweet(text, toTweetId, successCallback, errorCallback, parameters) {
        return this.postNewTweet(text, successCallback, errorCallback, {
            in_reply_to_status_id: toTweetId,
            auto_populate_reply_metadata: true
        });
    }

    /**
     * Post a new tweet with media.
     * # API : POST statuses/update
     *
     * @public
     * @param {string} text - the content of the tweet.
     * @param {(Array.<string>|string)} media_ids - array of media ids or one id.
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters.
     * @return {EloquentTwitter~PromiseResponse}
     */
    postNewTweetWithMedia(text, media_ids, successCallback, errorCallback, parameters) {
        if (!Array.isArray(media_ids)) media_ids = [media_ids];
        return this.postNewTweet(text, successCallback, errorCallback, {media_ids: media_ids, ...parameters});
    }

    /**
     * Updates the authenticating user’s current status, also known as Tweeting.
     * For each update attempt, the update text is compared with the authenticating user’s recent Tweets. Any attempt
     * that would result in duplication will be blocked, resulting in a 403 error. A user cannot submit the same status
     * twice in a row.
     * While not rate limited by the API, a user is limited in the number of Tweets they can create at a time.
     * If the number of updates posted by the user reaches the current allowed limit this method will return an
     * HTTP 403 error.
     * # API : POST statuses/update
     *
     * @public
     * @param {string} text
     * @param {(Array.<string>|string)} media_ids - array of media ids or one id.
     * @param {string} toTweetId - the tweet id_str
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters.
     * @return {EloquentTwitter~PromiseResponse}
     */
    postNewReplyToTweetWithMedia(text, media_ids, toTweetId, successCallback, errorCallback, parameters) {
        return this.postNewTweetWithMedia(text, media_ids, successCallback, errorCallback, {
            in_reply_to_status_id: toTweetId,
            auto_populate_reply_metadata: true
        });
    }

    /**
     * Retweets a tweet. Returns the original Tweet with Retweet details embedded.
     * Usage Notes:
     * This method is subject to update limits. A HTTP 403 will be returned if this limit as been hit.
     * EloquentTwitter will ignore attempts to perform duplicate retweets.
     * The retweet_count will be current as of when the payload is generated and may not reflect the exact count.
     * It is intended as an approximation.
     * # API : POST statuses/retweet
     *
     * @public
     * @param {string} tweetId - the tweet id_str
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    retweet(tweetId, successCallback, errorCallback) {
        const self = this;
        return this._twit.post('statuses/retweet', {
            id: tweetId, tweet_mode: 'extended'
        }, function(err, tweet, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataTweet(tweet, self));
        });
    }

    /**
     * Untweets a retweeted status. Returns the original Tweet with Retweet details embedded.
     * Usage Notes:
     * This method is subject to update limits. A HTTP 429 will be returned if this limit has been hit.
     * The untweeted retweet status ID must be authored by the user backing the authentication token.
     * An application must have write privileges to POST. A HTTP 401 will be returned for read-only applications.
     * When passing a source status ID instead of the retweet status ID a HTTP 200 response will be returned with the
     * same Tweet object but no action.
     * # API : POST statuses/unretweet
     *
     * @public
     * @param {string} tweetId - the tweet id_str
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    unretweet(tweetId, successCallback, errorCallback) {
        const self = this;
        return this._twit.post('statuses/unretweet', {
            id: tweetId, tweet_mode: 'extended'
        }, function(err, tweet, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataTweet(tweet, self));
        });
    }

    /**
     * Favorite (like) a tweet.
     * Favorites (likes) the DataTweet specified in the ID parameter as the authenticating user.
     * Returns the favorite DataTweet when successful.
     * # API : POST favorites/create
     *
     * @param {string} tweetId - the tweet id_str
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    favorite(tweetId, successCallback, errorCallback) {
        const self = this;
        return this._twit.post('favorites/create', {
            id: tweetId, tweet_mode: 'extended'
        }, function(err, tweet, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataTweet(tweet, self));
        });
    }

    /**
     * Unfavorites (un-likes) the DataTweet specified in the ID parameter as the authenticating user.
     * Returns the un-liked DataTweet when successful.
     * # API : POST favorites/destroy
     *
     * @param {string} tweetId - the tweet id_str
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    unfavorite(tweetId, successCallback, errorCallback) {
        const self = this;
        return this._twit.post('favorites/destroy', {
            id: tweetId, tweet_mode: 'extended'
        }, function(err, tweet, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataTweet(tweet, self));
        });
    }

    /**
     * Destroys the status specified by the required ID parameter. The authenticating user must be the author of the
     * specified status. Returns the destroyed status if successful.
     * # API : POST statuses/destroy
     *
     * @param {string} tweetId - the tweet id_str
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    deleteTweet(tweetId, successCallback, errorCallback) {
        const self = this;
        return this._twit.post('statuses/destroy', { id: tweetId }, function(err, tweet, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataTweet(tweet, self));
        });
    }

    /**
     * Publishes a new message_create event resulting in a Direct Message sent to a specified user from the
     * authenticating user. Returns an event if successful. Supports publishing Direct Messages with optional Quick
     * Reply and media attachment. Replaces behavior currently provided by POST direct_messages/new.
     * Requires a JSON POST body and Content-Type header to be set to application/json.
     * Setting Content-Length may also be required if it is not automatically.
     * # API : POST direct_messages/events/new
     *
     * @param {string} toUserId - the user id_str
     * @param {string} message - the content of the message.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parametersMessageData] - optional parameters object for event.message_create.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessage(toUserId, message, successCallback, errorCallback, parametersMessageData) {
        return this._twit.post('direct_messages/events/new', {
            "event": {
                "type": "message_create",
                "message_create": {
                    "target": {"recipient_id": toUserId},
                    "message_data": {
                        "text": message,
                        ...parametersMessageData
                    }
                }
            }
        }, function (err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataEventMessageCreate(data.event));
        });
    }

    /**
     * Send a new direct message with buttons.
     * Buttons enable developers to add up to three call-to-action (CTA) buttons to any Direct Message or Welcome Message.
     * These buttons can be used to open any URL from the Direct Message compose view.
     * The text labels displayed on the buttons can be fully customized.
     * # API : POST direct_messages/events/new
     *
     * @public
     * @param {string} toUserId - the user id_str
     * @param {string} message - the content of the message.
     * @param {DataDirectMessageButtons} buttons - the buttons object.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessageWithButtons(toUserId, message, buttons, successCallback, errorCallback) {
        return this.sendNewDirectMessage(toUserId, message, successCallback, errorCallback, {
            "ctas": buttons.toCtasObject()
        });
    }

    /**
     * Send a new direct message with options quick reply.
     * Options Quick Reply: List of up to 20 predefined options presented for a user to choose from.
     * # API : POST direct_messages/events/new
     *
     * @public
     * @param {string} toUserId - the user id_str
     * @param {string} message - the content of the message.
     * @param {DataDirectMessageQuickReply} quickReply - the quickReplay object.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessageWithQuickReply (toUserId, message, quickReply, successCallback, errorCallback) {
        return this.sendNewDirectMessage(toUserId, message, successCallback, errorCallback, {
            "quick_reply": quickReply.toQuickReplyObject()
        });
    }

    /**
     * Send a new direct message with options quick reply and buttons.
     * Options Quick Reply: List of up to 20 predefined options presented for a user to choose from
     * Buttons enable developers to add up to three call-to-action (CTA) buttons to any Direct Message or Welcome Message.
     * These buttons can be used to open any URL from the Direct Message compose view.
     * The text labels displayed on the buttons can be fully customized.
     * # API : POST direct_messages/events/new
     *
     * @public
     * @param {string} toUserId - the user id_str
     * @param {string} message - the content of the message.
     * @param {DataDirectMessageQuickReply} quickReply - the quickReplay object.
     * @param {DataDirectMessageButtons} buttons - the buttons object.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessageWithQuickReplyAndButtons (toUserId, message, quickReply, buttons,
                                                  successCallback, errorCallback) {
        return this.sendNewDirectMessage(toUserId, message, successCallback, errorCallback, {
            "quick_reply": quickReply.toQuickReplyObject(),
            "ctas": buttons.toCtasObject()
        });
    }

    /**
     * Send a new direct message with media.
     * A Direct Message may only reference a single media id.
     * # API : POST direct_messages/events/new
     *
     * @public
     * @param {string} toUserId - the user id_str
     * @param {string} message - the message
     * @param {string} media_id - A media ID to associate with the message.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessageWithMedia(toUserId, message, media_id, successCallback, errorCallback) {
        return this.sendNewDirectMessage(toUserId, message, successCallback, errorCallback, {
            "attachment" : {
                "type" : "_media",
                "media" : {
                    "id" : media_id
                }
            }
        });
    }

    /**
     * Send a new direct message with media.
     * Buttons enable developers to add up to three call-to-action (CTA) buttons to any Direct Message or Welcome Message.
     * These buttons can be used to open any URL from the Direct Message compose view.
     * The text labels displayed on the buttons can be fully customized.
     * # API : POST direct_messages/events/new
     *
     * @public
     * @param {string} toUserId - the user id_str
     * @param {string} message - the message
     * @param {string} media_id - A media ID to associate with the message.
     * @param {DataDirectMessageButtons} buttons - the buttons object.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessageWithMediaAndButtons(toUserId, message, media_id, buttons,
                                            successCallback, errorCallback) {
        return this.sendNewDirectMessage(toUserId, message, successCallback, errorCallback, {
            "attachment" : {
                "type" : "_media",
                "media" : {
                    "id" : media_id
                }
            },
            "ctas": buttons.toCtasObject()
        });
    }

    /**
     * Send a new direct message with media and options quick reply.
     * Options Quick Reply: List of up to 20 predefined options presented for a user to choose from.
     * # API : POST direct_messages/events/new
     *
     * @public
     * @param {string} toUserId - the user id_str
     * @param {string} message - the message
     * @param {string} media_id - A media ID to associate with the message.
     * @param {DataDirectMessageQuickReply} quickReply - the quickReplay object.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessageWithMediaAndQuickReply(toUserId, message, media_id, quickReply,
                                               successCallback, errorCallback) {
        return this.sendNewDirectMessage(toUserId, message, successCallback, errorCallback, {
            "attachment" : {
                "type" : "_media",
                "media" : {
                    "id" : media_id
                }
            },
            "quick_reply": quickReply.toQuickReplyObject()
        });
    }

    /**
     * Send a new direct message with media and options quick reply and buttons.
     * Options Quick Reply: List of up to 20 predefined options presented for a user to choose from.
     * # API : POST direct_messages/events/new
     *
     * @public
     * @param {string} toUserId - the user id_str
     * @param {string} message - the message
     * @param {string} media_id - A media ID to associate with the message.
     * @param {DataDirectMessageQuickReply} quickReply - the quickReplay object.
     * @param {DataDirectMessageButtons} buttons - the buttons object.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - optional callback to run when data received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    sendNewDirectMessageWithMediaAndQuickReplyAndButtons(toUserId, message, media_id, quickReply, buttons,
                                                         successCallback, errorCallback) {
        return this.sendNewDirectMessage(toUserId, message, successCallback, errorCallback, {
            "attachment" : {
                "type" : "_media",
                "media" : {
                    "id" : media_id
                }
            },
            "quick_reply": quickReply.toQuickReplyObject(),
            "ctas": buttons.toCtasObject()
        });
    }

    /**
     * Send a new direct message.
     * # API : GET direct_messages/show
     *
     * @public
     * @param {string} messageId - the direct message id
     * @param {EloquentTwitter~DataDirectMessageCallback} [successCallback] - callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getDirectMessage(messageId, successCallback, errorCallback) {
        return this._twit.get('direct_messages/show', {id: messageId}, function(err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataDirectMessage(data));
        });
    }

    /**
     * Deletes the direct message specified in the required ID parameter. The authenticating user must be the recipient
     * of the specified direct message. Direct Messages are only removed from the interface of the user context
     * provided. Other members of the conversation can still access the Direct Messages. A successful delete will
     * return a 204 http response code with no body content.
     * Important: This method requires an access token with RWD (read, write & direct message) permissions.
     * # API : DELETE direct_messages/events/destroy
     *
     * @public
     * @param {string} directMessageID - the direct message id.
     * @param {EloquentTwitter~DataEventMessageCreateCallback} [successCallback] - callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    deleteDirectMessage(directMessageID, successCallback, errorCallback) {
        return this._twit.delete('direct_messages/events/destroy', {id: directMessageID}, function (err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(data);
        });
    }

    /**
     * Returns the 20 most recent mentions (Tweets containing a users’s @screen_name) for the authenticating user.
     * The timeline returned is the equivalent of the one seen when you view your mentions on twitter.com.
     * This method can only return up to 800 tweets.
     * # API : GET statuses/mentions_timeline
     *
     * @public
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters object.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getMentionsTimeline(successCallback, errorCallback, parameters) {
        const self = this;
        return this._twit.get('statuses/mentions_timeline', {
            tweet_mode: 'extended', include_entities: true, count: 200, ...parameters
        }, function(err, tweets, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback( new DataError(err)) : null;
            //Array to store tweets
            let arrayOfTweets = [];
            //Store the tweets after creating tweet objects
            for (let i = 0; i < tweets.length; i++) {
                arrayOfTweets.push(new DataTweet(tweets[i], self));
            }
            //Success callback
            if (successCallback) successCallback(arrayOfTweets);
        });
    }

    /**
     * Returns a collection of the most recent Tweets and Retweets posted by the authenticating user and the users they
     * follow. The home timeline is central to how most users interact with the EloquentTwitter service.
     * Up to 800 Tweets are obtainable on the home timeline. It is more volatile for users that follow many users or
     * follow users who Tweet frequently.
     * # API : GET statuses/home_timeline
     *
     * @public
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {boolean} [includeRetweet] - When set to false , the timeline will strip any native retweets (though they
     *        will still count toward both the maximal length of the timeline and the slice selected by the count
     *        parameter).
     *        Note: If you’re using the trim_user parameter in conjunction with include_rts, the retweets will still
     *        contain a full user object.
     * @param {Object} [parameters] - optional parameters object.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getStatusesHomeTimeline(successCallback, errorCallback, includeRetweet, parameters) {
        const self = this;
        includeRetweet = (includeRetweet !== undefined) ? includeRetweet : false;
        return this._twit.get('statuses/home_timeline', {
            'count' : 800,
            'trim_user' : true,
            'exclude_replies' : false,
            'include_rts' : includeRetweet,
            'tweet_mode': 'extended',
            'include_entities': true,
            ...parameters
        }, function(err, tweets, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Array to store tweets
            let arrayOfTweets = [];
            //Store the tweets after creating tweet objects
            for (let i = 0; i < tweets.length; i++) {
                arrayOfTweets.push(new DataTweet(tweets[i], self));
            }
            //Success callback
            if (successCallback) successCallback(arrayOfTweets);
        });
    }

    /**
     * Returns a collection of the most recent Tweets posted by the user indicated by
     * the user_id parameter.
     * User timelines belonging to protected users may only be requested when the authenticated user
     * either “owns” the timeline or is an approved follower of the owner.
     * The timeline returned is the equivalent of the one seen as a user’s profile on twitter.com.
     * This method can only return up to 3,200 of a user’s most recent Tweets. Native retweets of other statuses by the
     * user is included in this total, regardless of whether include_rts is set to false when requesting this resource.
     * # API : POST statuses/unretweet
     *
     * @public
     * @param {string} id - The ID of the user for whom to return results.
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {boolean} [includeRetweet] - When set to false , the timeline will strip any native retweets (though they
     *        will still count toward both the maximal length of the timeline and the slice selected by the count
     *        parameter).
     *        Note: If you’re using the trim_user parameter in conjunction with include_rts, the retweets will still
     *        contain a full user object.
     * @param {Object} [parameters] - optional parameters object.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getUserTweetsTimelineById(id, successCallback, errorCallback, includeRetweet, parameters) {
        const self = this;
        includeRetweet = (includeRetweet !== undefined) ? includeRetweet : false;
        return this._twit.get('statuses/user_timeline', {
            'user_id' : id,
            'count' : 200,
            'trim_user' : true,
            'exclude_replies' : false,
            'include_rts' : includeRetweet,
            ...parameters
        }, function(err, tweets, response) {
            //Check for error
            if (err) return (errorCallback) ? errorCallback(new DataError(err)) : null;
            //Array to store tweets
            let arrayOfTweets = [];
            //Store the tweets after creating tweet objects
            for (let i = 0; i < tweets.length; i++) {
                arrayOfTweets.push(new DataTweet(tweets[i], self));
            }
            //Success callback
            if (successCallback) successCallback(arrayOfTweets);
        });
    }

    /**
     * Returns a collection of the most recent Tweets posted by the user indicated by
     * the screen_name parameter.
     * User timelines belonging to protected users may only be requested when the authenticated user
     * either “owns” the timeline or is an approved follower of the owner.
     * The timeline returned is the equivalent of the one seen as a user’s profile on twitter.com.
     * This method can only return up to 3,200 of a user’s most recent Tweets. Native retweets of other statuses by the
     * user is included in this total, regardless of whether include_rts is set to false when requesting this resource.
     * # API : GET statuses/user_timeline
     *
     * @public
     * @param {string} username - The screen name of the user for whom to return results.
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {boolean} [includeRetweet] - When set to false , the timeline will strip any native retweets (though they
     *        will still count toward both the maximal length of the timeline and the slice selected by the count
     *        parameter).
     *        Note: If you’re using the trim_user parameter in conjunction with include_rts, the retweets will still
     *        contain a full user object.
     * @param {Object} [parameters] - optional parameters object.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getUserTweetsTimelineByUsername(username, successCallback, errorCallback, includeRetweet, parameters) {
        return this.getUserTweetsTimelineById(null, successCallback, errorCallback, includeRetweet, {
            'screen_name' : username
        });
    }

    /**
     * Get user connection by user id.
     * Connections can be: following, following_requested, followed_by, none, blocking, muting.
     * # API : GET friendships/lookup
     *
     * @public
     * @param {string} userId - the user id (id_str) that want to check the connection on.
     * @param {EloquentTwitter~DataConnectionsCallback} successCallback - callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters object.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getUserConnectionsByUserId(userId, successCallback, errorCallback, parameters) {
        return this._twit.get('friendships/lookup', {user_id: userId, ...parameters}, function(err, data, response) {
            //Check for error
            if (err) return (errorCallback) ? new errorCallback(DataError(err)) : null;
            //Success callback
            if (successCallback) successCallback(new DataConnections(data));
        });
    }

    /**
     * Get user connection by username.
     * Connections can be: following, following_requested, followed_by, none, blocking, muting.
     * # API : GET friendships/lookup
     *
     * @public
     * @param {string} username - the username (screen_name) that want to check the connection on.
     * @param {EloquentTwitter~DataConnectionsCallback} successCallback - callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @param {Object} [parameters] - optional parameters object.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getUserConnectionsByUsername(username, successCallback, errorCallback, parameters) {
        return this.getUserConnectionsByUserId(null, successCallback, errorCallback, {
            screen_name: username
        });
    }


    /**
     * Starting the stream and keeping the connection alive (user Stream).
     *
     * @public
     * @return {StreamingAPIConnection}
     */
    startUserStream() {

        //This object (this)
        let self = this;

        //Check if the object is setted before
        if (this._userStream == null) {
            this._userStream = this._twit.stream('user');
        } else {
            this._userStream.start();
            return this._userStream;
        }

        /**
         * Emitted each time a status (tweet) comes into the stream.
         */
        this._userStream.on('tweet', function (data) {
            let tweet = new DataTweet(data, self);
            //Any
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.TWEET, [tweet]);
            //console.log("@@tweet-any@@", 'OK');
            //DataTweet
            if (tweet.isRetweet) {
                //Retweet
                self._userStreamEvents.fireEvents(EloquentTwitterEvent.TWEET_RETWEET, [tweet]);
                //console.log("@@tweet-retweet@@", 'OK');
            } else {
                //Not Retweet
                self._userStreamEvents.fireEvents(EloquentTwitterEvent.TWEET_NOT_RETWEET, [tweet]);
                //console.log("@@tweet-not-retweet@@", 'OK');
            }
        });

        /**
         * Emitted each time a status (tweet) deletion message comes into the stream.
         */
        this._userStream.on('delete', function (data) {
            //Any
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.DELETE,
                [data.delete.direct_message]);
            //console.log('delete-any', 'OK');

            if (data.delete.direct_message) {
                self._userStreamEvents.fireEvents(EloquentTwitterEvent.DELETE_DIRECT_MESSAGE,
                    [new DataDirectMessageDelete(data.delete.direct_message)]);
                //console.log('delete-direct_message', 'OK');
            } else {
                self._userStreamEvents.fireEvents(EloquentTwitterEvent.DELETE_STATUS,
                    [new DataTweetDelete(data.delete.status)]);
                //console.log('delete-status', 'OK');
            }
        });

        /**
         * Emitted each time a limitation message comes into the stream.
         */
        this._userStream.on('limit', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.LIMIT, [data]);
            //console.log('@limit@', data);
        });

        /**
         * Emitted each time a location deletion message comes into the stream.
         */
        this._userStream.on('scrub_geo', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.SCRUB_GEO, [data]);
            //console.log('@scrub_geo@', data);
        });

        /**
         * Emitted when a disconnect message comes from Twitter. This occurs if you have multiple streams connected to
         * Twitter's API. Upon receiving a disconnect message from Twitter, Twit will close the connection and emit
         * this event with the message details received from twitter.
         */
        this._userStream.on('disconnect', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.DISCONNECT, [data]);
            //console.log('@disconnect@', 'ok');
        });

        /**
         * Emitted when a connection attempt is made to Twitter. The http request object is emitted.
         */
        this._userStream.on('connect', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.CONNECT, [data]);
            //console.log('@connect@', 'ok');
        });

        /**
         * Emitted when the response is received from Twitter. The http response object is emitted.
         */
        this._userStream.on('connected', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.CONNECTED, [data]);
            //console.log('@connected@', 'ok');
        });

        /**
         * Emitted when a reconnection attempt to Twitter is scheduled. If Twitter is having problems or we get rate
         * limited, we schedule a reconnect according to Twitter's reconnection guidelines.
         * The last http request and response objects are emitted, along with the time (in milliseconds) left before the
         * reconnect occurs.
         */
        this._userStream.on('reconnect', function (request, response, connectInterval) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.RECONNECT, [request, response, connectInterval]);
            //console.log('@reconnect@', connectInterval);
        });

        /**
         * This message is appropriate for clients using high-bandwidth connections, like the firehose. If your
         * connection is falling behind, Twitter will queue messages for you, until your queue fills up, at which point
         * they will disconnect you.
         */
        this._userStream.on('warning', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.WARNING, [data]);
            //console.log('@warning@', data);
        });

        /**
         * Emitted when Twitter sends back a status_withheld message in the stream. This means that a tweet was withheld in
         * certain countries.
         */
        this._userStream.on('status_withheld', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.STATUS_WITHHELD, [data]);
            //console.log('@status_withheld@', data);
        });

        /**
         * Emitted when Twitter sends back a user_withheld message in the stream. This means that a Twitter user was
         * withheld in certain countries.
         */
        this._userStream.on('user_withheld', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_WITHHELD, [data]);
            //console.log('@user_withheld@', data);
        });

        /**
         * Emitted when Twitter sends the ["friends" preamble](https://dev.twitter.com/streaming/overview/messages-types#
         * user_stream_messsages) when connecting to a user stream. This message contains a list of the user's friends,
         * represented as an array of user ids. If the stringify_friend_ids parameter is set, the friends list preamble
         * will be returned as Strings (instead of Numbers).
         */
        this._userStream.on('friends', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.FRIENDS, [data]);
            //console.log('@friends@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event.
         */
        this._userStream.on('user_event', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT, [data]);
            //console.log('@user_event@', 'ok');
        });

        /**
         * Emitted when a direct message is sent to the user.
         */
        this._userStream.on('direct_message', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.DIRECT_MESSAGE,
                [new DataDirectMessage(data.direct_message)]);
            //console.log('@direct_message@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (blocked).
         */
        this._userStream.on('blocked', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_BLOCKED, [new DataEvent(data)]);
            //console.log('@blocked@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (unblocked).
         */
        this._userStream.on('unblocked', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_UNBLOCKED, [new DataEvent(data)]);
            //console.log('@unblocked@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (favorite).
         */
        this._userStream.on('favorite', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_FAVORITE, [new DataEvent(data)]);
            //console.log('@favorite@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (unfavorite).
         */
        this._userStream.on('unfavorite', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_UNFAVORITE, [new DataEvent(data)]);
            //console.log('@unfavorite@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (follow).
         */
        this._userStream.on('follow', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_FOLLOW, [new DataEvent(data)]);
            //console.log('@follow@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (unfollow).
         */
        this._userStream.on('unfollow', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_UNFOLLOW, [new DataEvent(data)]);
            //console.log('@unfollow@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (mute).
         */
        this._userStream.on('mute', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_MUTE, [new DataEvent(data)]);
            //console.log('@mute@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (unmute).
         */
        this._userStream.on('unmute', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_UNMUTE, [new DataEvent(data)]);
            //console.log('@unmute@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (user_update).
         */
        this._userStream.on('user_update', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_USER_UPDATE, [new DataEvent(data)]);
            //console.log('@user_update@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (list_created).
         */
        this._userStream.on('list_created', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_LIST_CREATED, [new DataEvent(data)]);
            //console.log('@list_created@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (list_updated).
         */
        this._userStream.on('list_updated', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_LIST_UPDATED, [new DataEvent(data)]);
            //console.log('@list_updated@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (list_destroyed).
         */
        this._userStream.on('list_destroyed', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_LIST_DESTROYED, [new DataEvent(data)]);
            //console.log('@list_destroyed@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (list_member_added).
         */
        this._userStream.on('list_member_added', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_LIST_MEMBER_ADDED, [new DataEvent(data)]);
            //console.log('@list_member_added@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (list_member_removed).
         */
        this._userStream.on('list_member_removed', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_LIST_MEMBER_REMOVED, [new DataEvent(data)]);
            //console.log('@list_member_removed@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (list_user_subscribed).
         */
        this._userStream.on('list_user_subscribed', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_LIST_USER_SUBSCRIBED, [new DataEvent(data)]);
            //console.log('@list_user_subscribed@', 'ok');
        });

        /**
         * Emitted when Twitter sends back a User stream event (quoted_tweet).
         */
        this._userStream.on('quoted_tweet', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_QUOTED_TWEET, [new DataEvent(data)]);
            //console.log('@quoted_tweet@', 'ok');
        });


        /**
         * Emitted when Twitter sends back a User stream event (retweeted_retweet).
         */
        this._userStream.on('retweeted_retweet', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_RETWEETED_RETWEET, [new DataEvent(data)]);
            //console.log('@retweeted_retweet@', 'ok');
        });


        /**
         * Emitted when Twitter sends back a User stream event (favorited_retweet).
         */
        this._userStream.on('favorited_retweet', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_FAVORITED_RETWEET, [new DataEvent(data)]);
            //console.log('@favorited_retweet@', 'ok');
        });


        /**
         * Emitted when Twitter sends back a User stream event (unknown).
         */
        this._userStream.on('unknown_user_event ', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.USER_EVENT_UNKNOWN, [new DataEvent(data)]);
            //console.log('@unknown_user_event@', 'ok');
        });


        /**
         * Emitted when an API request or response error occurs. An Error object is emitted.
         */
        this._userStream.on('error', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.ERROR, [new DataError(data)]);
            //console.log('@error@', data);
        });

        /**
         * Emitted each time an object is received in the stream. This is a catch-all event that can be used to process
         * any data received in the stream, rather than using the more specific events documented below.
         */
        this._userStream.on('message', function (data) {
            self._userStreamEvents.fireEvents(EloquentTwitterEvent.ANY, [data]);
            //console.log('@any@', 'ok');
        });

        //Return the current sream
        return this._userStream;
    }

    /**
     * Call this function on the stream to stop streaming (closes the connection with Twitter).
     *
     * @public
     * @return {?StreamingAPIConnection}
     */
    stopUserStream() {
        if (this._userStream == null) {
            return null;
        } else {
            this._userStream.stop();
            return this._userStream;
        }
    }

    /**
     * Starting the stream and keeping the connection alive (statuses/filter Stream).
     *
     * @public
     * @return {StreamingAPIConnection}
     */
    startStatusesFilterStream() {

        /**
         * This object (this)
         * @type {EloquentTwitter}
         */
        let self = this;

        //Check if the object is setted before
        if (this._statusesFilterStream == null) {
            this._statusesFilterStream = this._twit.stream('statuses/filter', { track: this._trackaStatusesFilterStream });
        } else {
            this._statusesFilterStream.start();
            return this._statusesFilterStream;
        }
        /**
         * Emitted each time a status (tweet) comes into the stream.
         */
        this._statusesFilterStream.on('tweet', function (data) {
            let tweet = new DataTweet(data, self);
            //Any
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.TWEET, [tweet]);
            //console.log("@@tweet-any@@", 'OK');
            //DataTweet
            if (tweet.isRetweet) {
                //Retweet
                self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.TWEET_RETWEET, [tweet]);
                //console.log("@@tweet-retweet@@", 'OK');
            } else {
                //Not Retweet
                self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.TWEET_NOT_RETWEET, [tweet]);
                //console.log("@@tweet-not-retweet@@", 'OK');
            }
        });

        /**
         * Emitted each time a limitation message comes into the stream.
         */
        this._statusesFilterStream.on('limit', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.LIMIT, [data]);
            //console.log('@limit@', data);
        });

        /**
         * Emitted each time a location deletion message comes into the stream.
         */
        this._statusesFilterStream.on('scrub_geo', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.SCRUB_GEO, [data]);
            //console.log('@scrub_geo@', data);
        });

        /**
         * Emitted when a disconnect message comes from Twitter. This occurs if you have multiple streams connected to
         * Twitter's API. Upon receiving a disconnect message from Twitter, Twit will close the connection and emit
         * this event with the message details received from twitter.
         */
        this._statusesFilterStream.on('disconnect', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.DISCONNECT, [data]);
            //console.log('@disconnect@', 'ok');
        });

        /**
         * Emitted when a connection attempt is made to Twitter. The http request object is emitted.
         */
        this._statusesFilterStream.on('connect', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.CONNECT, [data]);
            //console.log('@connect@', 'ok');
        });

        /**
         * Emitted when the response is received from Twitter. The http response object is emitted.
         */
        this._statusesFilterStream.on('connected', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.CONNECTED, [data]);
            //console.log('@connected@', 'ok');
        });

        /**
         * Emitted when a reconnection attempt to Twitter is scheduled. If Twitter is having problems or we get rate
         * limited, we schedule a reconnect according to Twitter's reconnection guidelines.
         * The last http request and response objects are emitted, along with the time (in milliseconds) left before the
         * reconnect occurs.
         */
        this._statusesFilterStream.on('reconnect', function (request, response, connectInterval) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.RECONNECT, [request, response, connectInterval]);
            //console.log('@reconnect@', connectInterval);
        });

        /**
         * This message is appropriate for clients using high-bandwidth connections, like the firehose. If your
         * connection is falling behind, Twitter will queue messages for you, until your queue fills up, at which point
         * they will disconnect you.
         */
        this._statusesFilterStream.on('warning', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.WARNING, [data]);
            //console.log('@warning@', data);
        });

        /**
         * Emitted when Twitter sends back a status_withheld message in the stream. This means that a tweet was withheld in
         * certain countries.
         */
        this._statusesFilterStream.on('status_withheld', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.STATUS_WITHHELD, [data]);
            //console.log('@status_withheld@', data);
        });

        /**
         * Emitted when Twitter sends back a user_withheld message in the stream. This means that a Twitter user was
         * withheld in certain countries.
         */
        this._statusesFilterStream.on('user_withheld', function (data) {
            self._statusesFilterStreamEvents.fireEvents(EloquentTwitterEvent.USER_WITHHELD, [data]);
            //console.log('@user_withheld@', data);
        });

        //Return the current sream
        return this._statusesFilterStream;
    }

    /**
     * Call this function on the stream to stop streaming (closes the connection with Twitter).
     *
     * @public
     * @return {?StreamingAPIConnection}
     */
    stopStatusesFilterStream() {
        if (this._statusesFilterStream == null) {
            return null;
        } else {
            this._statusesFilterStream.stop();
            this._statusesFilterStream = null;
            return this._statusesFilterStream;
        }
    }

    /**
     * Restart the strean to apply the new tracks that have been added.
     *
     * @public
     * @return {StreamingAPIConnection}
     */
    restartStatusesFilterStream() {
        this.stopStatusesFilterStream();
        return this.startStatusesFilterStream();
    }
}

/**
 * @module
 * @type {EloquentTwitter}
 */
module.exports = EloquentTwitter;

/**
 * EloquentTwitter promise response.
 *
 * @typedef {Promise<resolve, reject>} EloquentTwitter~PromiseResponse
 * @property {Object} parsedBody.
 * @property {Object} resp.
 */

/**
 * Media id promise response.
 *
 * @typedef {Promise<resolve, reject>} EloquentTwitter~PromiseResponseMediaId
 * @property {string} id - the media id.
 * @property {Object} data - the media data.
 */

/**
 * Callback to run when data cannot be received.
 *
 * @callback EloquentTwitter~ErrorCallback
 * @param {DataError} err - is the error object.
 */

/**
 * Callback to run when one tweet is received.
 *
 * @callback EloquentTwitter~TweetCallback
 * @param {DataTweet} tweet - the object of the tweet.
 */

/**
 * Callback to run when tweets are received.
 *
 * @callback EloquentTwitter~TweetsCallback
 * @param {Array.<DataTweet>} tweet - the array of tweet objects.
 */

/**
 * Callback to run when tweets are being searched.
 *
 * @callback EloquentTwitter~SearchTweetsCallback
 * @param {Array.<DataTweet>} tweets - the array of tweet objects.
 * @param {DataSearchMetadata} metaData - the search meta data objects.
 */

/**
 * Callback to run when one user is received.
 *
 * @callback EloquentTwitter~UserCallback
 * @param {DataUser} user - the object of the user.
 */

/**
 * Callback to run when media id is received.
 *
 * @callback EloquentTwitter~MediaIdCallback
 * @param {string} mediaIdStr -  the id_str that can be attached with a tweet or message.
 * @param {Object} [data] - the whole data object.
 */

/**
 * Callback to run when event message create is received.
 *
 * @callback EloquentTwitter~DataEventMessageCreateCallback
 * @param {DataEventMessageCreate} dataEventMessageCreate -  the object that contains information of the message.
 */

/**
 * Callback to run when data direct message is received.
 *
 * @callback EloquentTwitter~DataDirectMessageCallback
 * @param {DataDirectMessage} dataDirectMessage - the object that contains information of the message.
 */

/**
 * Callback to run when data connection information is received.
 *
 * @callback EloquentTwitter~DataConnectionsCallback
 * @param {DataConnections} dataConnections - the object that contains all connection information.
 */
/**
 * The library modules
 */
const DataError = require('./DataError');
const DataUser = require('./DataUser');
const DataEntities = require('./DataEntities');
const DataExtendedTweet = require('./DataExtendedTweet');
const DataMedia = require('./DataMedia');
const DataPlace = require('./DataPlace');
const DataConnections = require('./DataConnections');

/**
 * The class represents the data tweet that is received form the callback.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 * @requires DataEntities
 * @requires DataUser
 * @requires DataExtendedTweet
 * @requires DataMedia
 * @requires DataPlace
 * @requires DataError
 * @requires DataConnections
 */
class DataTweet {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} tweetObj - the tweet data
     * @param {EloquentTwitter} [eloquentTwitter] - the eloquentTwitter instance to enable functions.
     */
    constructor(tweetObj, eloquentTwitter) {

        /**
         * @type {Object}
         * @private
         */
        this._data = tweetObj;

        /**
         * @type {?EloquentTwitter}
         * @private
         */
        this._eloquentTwitter = eloquentTwitter || null;
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
     * Get EloquentTwitter object.
     *
     * @public
     * @get
     * @return {?EloquentTwitter}
     */
    get eloquentTwitter() {
        return this._eloquentTwitter;
    }

    /**
     * Get the tweet text. Also, it will get the full text if it is available.
     * text: The actual UTF-8 text of the status update.
     *
     * @public
     * @get
     * @return {string} tweet/status text
     */
    get text() {
        //Check if it has full_text
        if (this._data.full_text) return this._data.full_text;
        //Check if it has extend tweet
        let objExtendTweet = this.extendedTweet;
        return (objExtendTweet == null) ? this._data.text : objExtendTweet.text;
    }

    /**
     * Get the id of the tweet (id_str).
     * id_str: The string representation of the unique identifier for this Tweet.
     * Implementations should use this rather than the large integer in id.
     *
     * @public
     * @get
     * @return {string} id_str
     */
    get id() {
        return this._data.id_str;
    }

    /**
     * Get the entities (mentions, urls, hashtages, ...) of the tweet. This will return the extendedTweet entities
     * if it is available.
     * entities: a collection of common entities found in Tweets, including hashtags, links, and user mentions.
     * This entities object does include a media attribute, but its implementation in the entiites section is only
     * completely accurate for Tweets with a single photo. For all Tweets with more than one photo, a video, or
     * animated GIF, the reader is directed to the extended_entities section.
     *
     * @public
     * @get
     * @return {DataEntities}
     */
    get entities() {
        //Check if it has extend tweet
        let objExtendTweet = this.extendedTweet;
        return (objExtendTweet == null) ? new DataEntities(this._data.entities) : objExtendTweet.entities;
    }

    /**
     * If the tweet is extended (more than 140 letters), this object will be available.
     *
     * @public
     * @get
     * @return {?DataExtendedTweet} extended_tweet
     */
    get extendedTweet() {
        return (this._data.extended_tweet) ? new DataExtendedTweet(this._data.extended_tweet) : null;
    }

    /**
     * Indicates whether the value of the text parameter was truncated, for example, as a result of a retweet
     * exceeding the original Tweet text length limit of 140 characters. Truncated text will end in ellipsis, like
     * this ... Since EloquentTwitter now rejects long Tweets vs truncating them, the large majority of Tweets will have this
     * set to false . Note that while native retweets may have their toplevel text property shortened, the original
     * text will be available under the retweeted_status object and the truncated parameter will be set to the value
     * of the original status (in most cases, false ).
     *
     * @public
     * @get
     * @return {boolean} truncated
     */
    get truncated() {
        return this._data.truncated;
    }

    /**
     * Indicates whether this is a Quoted Tweet.
     *
     * @public
     * @get
     * @return {boolean} is_quote_status
     */
    get isQuoteStatus() {
        return this._data.is_quote_status;
    }


    /**
     * This field only surfaces when the Tweet is a quote Tweet. This is the string representation Tweet ID of the
     * quoted Tweet.
     *
     * @public
     * @get
     * @return {string} quoted_status_id_str
     */
    get quotedStatusId() {
        return this._data.quoted_status_id_str;
    }

    /**
     * This field only surfaces when the Tweet is a quote Tweet. This attribute contains the Tweet object of
     * the original Tweet that was quoted.
     *
     * @public
     * @get
     * @return {DataTweet} the tweet object
     */
    get quotedStatus() {
        return new DataTweet(this._data.quoted_status);
    }

    /**
     * Nullable. Indicates approximately how many times this Tweet has been quoted by EloquentTwitter users.
     *
     * @public
     * @get
     * @return {?number} int. the count of quote if it is exist, else null.
     */
    get quoteCount() {
        return this._data.quote_count;
    }

    /**
     * Nullable. Indicates whether this Tweet has been liked by the authenticating user.
     *
     * @public
     * @get
     * @return {?boolean} true if it has been favorited, else null.
     */
    get favorited() {
        return this._data.favorited;
    }

    /**
     * Indicates whether this Tweet has been Retweeted by the authenticating user.
     *
     * @public
     * @get
     * @return {boolean} true if it has been retweeted, else false.
     */
    get retweeted() {
        return this._data.retweeted;
    }

    /**
     * Nullable. When present, indicates a BCP 47 language identifier corresponding to the machine-detected language
     * of the Tweet text, or und if no language could be detected.
     *
     * [Language - ID]
     * Amharic - am, Arabic - ar, Armenian - hy, Bengali - bn, Bulgarian - bg
     * Burmese - my, Chinese - zh, Czech - cs, Danish - da, Dutch - nl
     * English - en, Estonian - et, Finnish - fi, French - fr
     * Georgian - ka, German - de, Greek - el, Gujarati - gu
     * Haitian - ht, Hebrew - iw, Hindi - hi, Hungarian - hu
     * Icelandic - is, Indonesian - in, Italian - it, Japanese - ja
     * Kannada - kn, Khmer - km, Korean - ko, Lao - lo, Latvian - lv
     * Lithuanian - lt, Malayalam - ml, Maldivian - dv, Marathi - mr
     * Nepali - ne, Norwegian - no, Oriya - or, Panjabi - pa
     * Pashto - ps, Persian - fa, Polish - pl, Portuguese - pt
     * Romanian - ro, Russian - ru, Serbian - sr, Sindhi - sd
     * Sinhala - si, Slovak - sk, Slovenian - sl, Sorani Kurdish - ckb
     * Spanish - es, Swedish - sv, Tagalog - tl, Tamil - ta
     * Telugu - te, Thai - th, Tibetan - bo, Turkish - tr
     * Ukrainian - uk, Urdu - ur, Uyghur - ug, Vietnamese - vi, Welsh - cy
     *
     * @public
     * @get
     * @return {string} id of the language
     */
    get language() {
        return this._data.lang;
    }

    /**
     * Nullable. This field only surfaces when a Tweet contains a link. The meaning of the field doesn’t pertain
     * to the Tweet content itself, but instead it is an indicator that the URL contained in the Tweet may contain
     * content or media identified as sensitive content.
     *
     * @public
     * @get
     * @return {?boolean} true if the link is sensitive content, else null.
     */
    get possiblySensitive() {
        return this._data.possibly_sensitive;
    }

    /**
     * Nullable. Represents the geographic location of this Tweet as reported by the user or client application.
     * The inner coordinates array is formatted as geoJSON (longitude first, then latitude).
     *
     * @public
     * @get
     * @return {?DataConnections} coordinate object if it is exist, else null
     */
    get coordinates() {
        return (this._data.coordinates) ? new DataConnections(this._data.coordinates) : null;
    }

    /**
     * Get the source of the tweet (HTML format).
     * Ex: '<a href="http://twitter.com/download/iphone" rel="nofollow">EloquentTwitter for iPhone</a>'
     * source: Utility used to post the Tweet, as an HTML-formatted string.
     * Tweets from the EloquentTwitter website have a source value of web.
     *
     * @public
     * @get
     * @return {string} html format
     */
    get source() {
        return this._data.source;
    }

    /**
     * Get the date of the tweet (created_at).
     * UTC time when this Tweet was created.
     *
     * @public
     * @get
     * @return {string} utc to string format
     */
    get date() {
        return this._data.created_at;
    }

    /**
     * Get entities.media form the data.
     * This media consists of image of video data that is used in the tweet.
     *
     * @public
     * @get
     * @return {?array<DataMedia>} array of DataMedia objects if it is exist, else null.
     */
    get media() {
        if (this._data.entities.media) {
            let arrayOfMedia = [];
            for(let i = 0; i < this._data.entities.media.length; i++) {
                arrayOfMedia.push(new DataMedia(this._data.entities.media[i]));
            }
            return arrayOfMedia;
        } else return null;
    }

    /**
     * Get the id of the tweet that this tweet replied to.
     * Nullable. If the represented Tweet is a reply, this field will contain the string representation of
     * the original Tweet’s ID.
     *
     * @public
     * @get
     * @return {?string} the tweet id_str if it is exist, else null.
     */
    get inReplyToStatusId() {
        return this._data.in_reply_to_status_id_str;
    }

    /**
     * Get the id of the user that this tweet replied to.
     * Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original
     * Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet
     *
     * @public
     * @get
     * @return {?string} the user id_str if it is exist, else null.
     */
    get inReplyToUserIdStr() {
        return this._data.in_reply_to_user_id_str;
    }

    /**
     * Get the username of the user that this tweet replied to.
     * Nullable. If the represented Tweet is a reply, this field will contain the screen name of the
     * original Tweet’s author.
     *
     * @public
     * @get
     * @return {?string} the username of the user if it is exist, else null.
     */
    get inReplyToScreenName() {
        return this._data.in_reply_to_screen_name;
    }

    /**
     * Check if is this tweet a reply.
     *
     * @public
     * @return {boolean} true if this is a reply.
     */
    isThisReply() {
        return this.inReplyToStatusId !== null;
    }

    /**
     * Get the user who posted this tweet.
     *
     * @public
     * @get
     * @return {DataUser} the DataUser object.
     */
    get user() {
        return new DataUser(this._data.user);
    }

    /**
     * Nullable When present, indicates that the tweet is associated (but not necessarily originating from) a Place .
     *
     * @public
     * @get
     * @return {?DataPlace} get the DataPlace object if it is exist, else null.
     */
    get place() {
        return new DataPlace(this._data.place);
    }

    /**
     * Check if this tweet is a retweet.
     *
     * @public
     * @get
     * @return {boolean} true if this tweet is a retweet, else false.
     */
    get isRetweet() {
        return !!(this._data.retweeted_status);
    }

    /**
     * Get the tweet that is retweeted.
     * Users can amplify the broadcast of Tweets authored by other users by retweeting .
     * Retweets can be distinguished from typical Tweets by the existence of a retweeted_status attribute.
     * This attribute contains a representation of the original Tweet that was retweeted.
     * Note that retweets of retweets do not show representations of the intermediary retweet, but only the
     * original Tweet. (Users can also unretweet a retweet they created by deleting their retweet.)
     *
     * @public
     * @get
     * @return {?DataTweet} get the tweet if this tweet is a retweet, else null.
     */
    get retweetStatus() {
        return (this._data.retweeted_status) ? new DataTweet(this._data.retweeted_status) : null;
    }

    /**
     * Number of times this Tweet has been replied to.
     *
     * @public
     * @get
     * @return {number} int. reply count
     */
    get replyCount() {
        return this._data.reply_count;
    }

    /**
     * Number of times this Tweet has been retweeted.
     *
     * @public
     * @get
     * @return {number} int. retweet count
     */
    get retweetCount() {
        return this._data.retweet_count;
    }

    /**
     * Nullable. Indicates approximately how many times this Tweet has been liked by EloquentTwitter users.
     *
     * @public
     * @get
     * @return {?number} int. favorite count if it exist, else null
     */
    get favoriteCount() {
        return this._data.retweet_count;
    }


    /**
     * Get Unix timestamp.
     *
     * @public
     * @get
     * @return {number} int. timestamp_ms
     */
    get timestamp() {
        return this._data.timestamp_ms;
    }

    /**
     * Indicates the maximum value of the filter_level parameter which may be used and still stream this Tweet.
     * So a value of medium will be streamed on none, low, and medium streams.
     *
     * @public
     * @get
     * @return {string} none, low, and medium
     */
    get filterLevel() {
        return this._data.filter_level;
    }

    /**
     * Protected accounts: A Twitter user can protect or unprotect their account at any time. Protected accounts
     * require manual user approval of every person who is allowed to view their account's Tweets
     *
     * @public
     * @get
     * @return {boolean} true if it is protected.
     */
    get isProtected() {
        return this._data.protected;
    }

    /**
     * Refresh the tweet object.
     *
     * @public
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    refresh(successCallback, errorCallback) {
        return (this._eloquentTwitter) ?
            this._eloquentTwitter.getTweetsByID(this.id, successCallback, errorCallback) : null;
    }

    /**
     * Returns a variety of information about the user who created the tweet.
     *
     * @public
     * @param {EloquentTwitter~UserCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getUser(successCallback, errorCallback) {
        return (this._eloquentTwitter) ?
            this._eloquentTwitter.getUserByID(this.user.id, successCallback, errorCallback) : null;
    }

    /**
     * Get replies to the tweet.
     *
     * @public
     * @param {EloquentTwitter~TweetsCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    getReplies(successCallback, errorCallback) {
        return   (this._eloquentTwitter) ?
            this._eloquentTwitter.getReplies(this.user.username, this.id, successCallback, errorCallback) : null;
    }

    /**
     * Reply to the tweet.
     *
     * @public
     * @param {string} text - the text of the reply.
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {?EloquentTwitter~PromiseResponse}
     */
    reply(text, successCallback, errorCallback) {
        return (this._eloquentTwitter) ? this._eloquentTwitter.postNewReplyToTweet(text, this.id, successCallback,
            errorCallback) : null;
    }

    /**
     * Reply to the tweet.
     *
     * @public
     * @param {string} text - the text of the reply.
     * @param {(Array.<string>|string)} media_ids - array of media ids or one id.
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {?EloquentTwitter~PromiseResponse}
     */
    replyWithMedia(text, media_ids, successCallback, errorCallback) {
        return (this._eloquentTwitter) ? this._eloquentTwitter.postNewReplyToTweetWithMedia(text, this.id, media_ids,
            successCallback, errorCallback) : null;
    }

    /**
     * Retweets a tweet. Returns the original Tweet with Retweet details embedded.
     *
     * @public
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {?EloquentTwitter~PromiseResponse}
     */
    retweet(successCallback, errorCallback) {
        return (this.isProtected) ? null :
            (this._eloquentTwitter) ? this._eloquentTwitter.retweet(this.id, successCallback, errorCallback) : null;
    }

    /**
     * Untweets a retweeted status. Returns the original Tweet with Retweet details embedded.
     *
     * @public
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {EloquentTwitter~PromiseResponse}
     */
    unretweet(successCallback, errorCallback) {
        return (this.isProtected) ? null :
            (this._eloquentTwitter) ? this._eloquentTwitter.unretweet(this.id, successCallback, errorCallback) : null;
    }

    /**
     * Favorite (like) a tweet.
     *
     * @public
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {?EloquentTwitter~PromiseResponse}
     */
    favorite(tweetId, successCallback, errorCallback) {
        return (this.isProtected) ? null :
            (this._eloquentTwitter) ? this._eloquentTwitter.favorite(this.id, successCallback, errorCallback) : null;
    }

    /**
     * Unfavorites (un-likes) the tweet.
     *
     * @public
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {?EloquentTwitter~PromiseResponse}
     */
    unfavorite(tweetId, successCallback, errorCallback) {
        return (this.isProtected) ? null :
            (this._eloquentTwitter) ? this._eloquentTwitter.unfavorite(this.id, successCallback, errorCallback) : null;
    }

    /**
     * Destroys the tweet.
     *
     * @public
     * @param {EloquentTwitter~TweetCallback} [successCallback] - optional callback to run when data is received.
     * @param {EloquentTwitter~ErrorCallback} [errorCallback] - optional callback to run when data cannot be received.
     * @return {?EloquentTwitter~PromiseResponse}
     */
    deleteTweet(successCallback, errorCallback) {
        return (this._eloquentTwitter) ?
            this._eloquentTwitter.deleteTweet(this.id, successCallback, errorCallback) : null;
    }

    /**
     * Send a reply to the user as a direct message.
     *
     * @param text
     * @param successCallback
     * @param errorCallback
     * @return {*}
     */
    sendReplyAsDirectMessage(text, successCallback, errorCallback) {
        return (this._eloquentTwitter) ? this._eloquentTwitter.sendNewDirectMessage(this.user.id, text, successCallback, errorCallback) : null;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} text
     */
    toString() {
        return this.text;
    }

    /**
     * Check if this tweet did mention the username and it is not form the current username.
     *
     * @public
     * @param {string} username
     * @param {string} currentUsername
     * @return {boolean} true if this tweet did mention the username, else false.
     */
    isMention(username, currentUsername) {
        return this.text.includes(username) && (this.user.username !== currentUsername);
    }
}

/**
 * @module
 * @type {DataTweet}
 */
module.exports = DataTweet;
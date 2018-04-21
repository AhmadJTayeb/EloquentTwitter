class EloquentTwitterEvent {

    /**
     * Emitted each time an object is received in the stream. This is a catch-all event that can be used to process
     * any data received in the stream, rather than using the more specific events documented below.
     *
     * @public
     * @get
     * @return {string}
     */
    static get ANY() {
        return 'ANY';
    }

    /**
     * Emitted each time a limitation message comes into the stream.
     *
     * @public
     * @get
     * @return {string}
     */
    static get LIMIT() {
        return 'LIMIT';
    }

    /**
     * Emitted each time a status (tweet) comes into the stream (Any).
     *
     * @public
     * @get
     * @return {string}
     */
    static get TWEET() {
        return 'TWEET';
    }

    /**
     * Emitted each time a status (tweet) -not retweet- comes into the stream.
     *
     * @public
     * @get
     * @return {string}
     */
    static get TWEET_NOT_RETWEET() {
        return 'TWEET_NOT_RETWEET';
    }

    /**
     * Emitted each time a retweet comes into the stream.
     *
     * @public
     * @get
     * @return {string}
     */
    static get TWEET_RETWEET() {
        return 'TWEET_RETWEET';
    }

    /**
     * Emitted when Twitter sends the ["friends" preamble](https://dev.twitter.com/streaming/overview/messages-types#
     * user_stream_messsages) when connecting to a user stream. This message contains a list of the user's friends,
     * represented as an array of user ids. If the stringify_friend_ids parameter is set, the friends list preamble
     * will be returned as Strings (instead of Numbers).
     *
     * @public
     * @get
     * @return {string}
     */
    static get FRIENDS() {
        return 'FRIENDS';
    }

    /**
     * Emitted when a direct message is sent to the user.
     * Unfortunately, Twitter has not documented this event for user streams.
     *
     * @public
     * @get
     * @return {string}
     */
    static get DIRECT_MESSAGE() {
        return 'DIRECT_MESSAGE';
    }

    /**
     * Emitted when Twitter sends back a User stream event (Any).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT() {
        return 'USER_EVENT';
    }

    /**
     * Emitted when Twitter sends back a User stream event (blocked).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_BLOCKED() {
        return 'USER_EVENT_BLOCKED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (unblocked).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_UNBLOCKED() {
        return 'USER_EVENT_UNBLOCKED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (favorite).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_FAVORITE() {
        return 'USER_EVENT_FAVORITE';
    }

    /**
     * Emitted when Twitter sends back a User stream event (unfavorite).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_UNFAVORITE() {
        return 'USER_EVENT_UNFAVORITE';
    }

    /**
     * Emitted when Twitter sends back a User stream event (follow).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_FOLLOW() {
        return 'USER_EVENT_FOLLOW';
    }

    /**
     * Emitted when Twitter sends back a User stream event (unfollow).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_UNFOLLOW() {
        return 'USER_EVENT_UNFOLLOW';
    }

    /**
     * Emitted when Twitter sends back a User stream event (mute).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_MUTE() {
        return 'USER_EVENT_MUTE';
    }

    /**
     * Emitted when Twitter sends back a User stream event (unmute).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_UNMUTE() {
        return 'USER_EVENT_UNMUTE';
    }

    /**
     * Emitted when Twitter sends back a User stream event (user_update).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_USER_UPDATE() {
        return 'USER_EVENT_USER_UPDATE';
    }

    /**
     * Emitted when Twitter sends back a User stream event (list_created).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_LIST_CREATED() {
        return 'USER_EVENT_LIST_CREATED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (list_destroyed).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_LIST_DESTROYED() {
        return 'USER_EVENT_LIST_DESTROYED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (list_updated).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_LIST_UPDATED() {
        return 'USER_EVENT_LIST_UPDATED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (list_member_added).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_LIST_MEMBER_ADDED() {
        return 'USER_EVENT_LIST_MEMBER_ADDED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (list_member_removed).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_LIST_MEMBER_REMOVED() {
        return 'USER_EVENT_LIST_MEMBER_REMOVED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (list_user_subscribed).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_LIST_USER_SUBSCRIBED() {
        return 'USER_EVENT_LIST_USER_SUBSCRIBED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (list_user_unsubscribed).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_LIST_USER_UNSUBSCRIBED() {
        return 'USER_EVENT_LIST_USER_UNSUBSCRIBED';
    }

    /**
     * Emitted when Twitter sends back a User stream event (quoted_tweet).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_QUOTED_TWEET() {
        return 'USER_EVENT_QUOTED_TWEET';
    }

    /**
     * Emitted when Twitter sends back a User stream event (retweeted_retweet).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_RETWEETED_RETWEET() {
        return 'USER_EVENT_RETWEETED_RETWEET';
    }

    /**
     * Emitted when Twitter sends back a User stream event (favorited_retweet).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_FAVORITED_RETWEET() {
        return 'USER_EVENT_FAVORITED_RETWEET';
    }


    /**
     * Emitted when Twitter sends back a User stream event (unknown).
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_EVENT_UNKNOWN() {
        return 'USER_EVENT_UNKNOWN';
    }

    /**
     * Emitted when an API request or response error occurs. An Error object is emitted.
     *
     * @public
     * @get
     * @return {string}
     */
    static get ERROR() {
        return 'ERROR';
    }

    /**
     * Emitted each time a direct message deletion or status message comes into the stream.
     *
     * @public
     * @get
     * @return {string}
     */
    static get DELETE() {
        return 'DELETE';
    }

    /**
     * Emitted each time a direct message deletion message comes into the stream.
     *
     * @public
     * @get
     * @return {string}
     */
    static get DELETE_DIRECT_MESSAGE() {
        return 'DELETE_DIRECT_MESSAGE';
    }

    /**
     * Emitted each time a status (tweet) deletion message comes into the stream.
     *
     * @public
     * @get
     * @return {string}
     */
    static get DELETE_STATUS() {
        return 'DELETE_STATUS';
    }

    /**
     * Emitted each time a location deletion message comes into the stream.
     *
     * @public
     * @get
     * @return {string}
     */
    static get SCRUB_GEO() {
        return 'SCRUB_GEO';
    }

    /**
     * Emitted when a disconnect message comes from Twitter. This occurs if you have multiple streams connected to
     * Twitter's API. Upon receiving a disconnect message from Twitter, Twit will close the connection and emit
     * this event with the message details received from twitter.
     *
     * @public
     * @get
     * @return {string}
     */
    static get DISCONNECT() {
        return 'DISCONNECT';
    }

    /**
     * Emitted when a connection attempt is made to Twitter. The http request object is emitted.
     *
     * @public
     * @get
     * @return {string}
     */
    static get CONNECT() {
        return 'CONNECT';
    }

    /**
     * Emitted when the response is received from Twitter. The http response object is emitted.
     *
     * @public
     * @get
     * @return {string}
     */
    static get CONNECTED() {
        return 'CONNECTED';
    }

    /**
     * Emitted when a reconnection attempt to Twitter is scheduled. If Twitter is having problems or we get rate
     * limited, we schedule a reconnect according to Twitter's reconnection guidelines.
     * The last http request and response objects are emitted, along with the time (in milliseconds) left before the
     * reconnect occurs.
     *
     * @public
     * @get
     * @return {string}
     */
    static get RECONNECT() {
        return 'RECONNECT';
    }

    /**
     * This message is appropriate for clients using high-bandwidth connections, like the firehose. If your
     * connection is falling behind, Twitter will queue messages for you, until your queue fills up, at which point
     * they will disconnect you.
     *
     * @public
     * @get
     * @return {string}
     */
    static get WARNING() {
        return 'WARNING';
    }

    /**
     * Emitted when Twitter sends back a status_withheld message in the stream. This means that a tweet was withheld in
     * certain countries.
     *
     * @public
     * @get
     * @return {string}
     */
    static get STATUS_WITHHELD () {
        return 'STATUS_WITHHELD';
    }

    /**
     * Emitted when Twitter sends back a user_withheld message in the stream. This means that a Twitter user was
     * withheld in certain countries.
     *
     * @public
     * @get
     * @return {string}
     */
    static get USER_WITHHELD () {
        return 'USER_WITHHELD';
    }

    /**
     * @return {string}
     */
    static get OTHER() {
        return 'OTHER';
    }

}

/**
 * @module
 * @type {EloquentTwitterEvent}
 */
module.exports = EloquentTwitterEvent;
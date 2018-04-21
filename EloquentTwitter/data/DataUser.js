/**
 * The library modules
 */
const DataTweet = require('./DataTweet');
const DataUrl = require('./DataUrl');

/**
 * The class represents the data user that is received within the DataTweet and other objects.
 *
 * ## User object ##
 * The User object contains public EloquentTwitter account metadata and describes the of the Tweet. Users can be anyone or
 * anything. They Tweet, Retweet, add Quotes to Tweets, follow others, create lists, have a home timeline, can be
 * mentioned, and can be looked up in bulk.
 * In case of Retweets and Quoted Tweets, the top-level user object represents what account took that action, and the
 * JSON payload will include a second user for the account that created the original Tweet.
 * In general these user metadata values are relatively constant. Some fields never change, such as the
 * account ID (provided as both a number and a string) and when the account was created. Other metadata can
 * occasionally change, such as the account (display) name, description, location, and other profile details.
 * Some metadata frequently changes, such as the number of Tweets the account has posted (statuses_count) and its
 * number of followers (followers_count).
 *
 * @public
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataUser {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} user - the user data
     */
    constructor(user) {

        /**
         * @type {Object}
         * @private
         */
        this._data = user;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} user
     */
    get data() {
        return this._data;
    }

    /**
     * The string representation of the unique identifier for this User. Implementations should use this rather than
     * the large, possibly un-consumable integer in id.
     *
     * @public
     * @get
     * @return {string} ex: 6253282
     */
    get id() {
        return this._data.id_str;
    }

    /**
     * The name of the user, as they’ve defined it. Not necessarily a person’s name. Typically capped at 20 characters,
     * but subject to change.
     *
     * @public
     * @get
     * @return {string} ex: EloquentTwitter API
     */
    get name() {
        return this._data.name;
    }

    /**
     * The screen name, handle, or alias that this user identifies themselves with. screen_names are unique but subject
     * to change. Use id_str as a user identifier whenever possible. Typically a maximum of 15 characters long, but
     * some historical accounts may exist with longer names.
     *
     * @public
     * @get
     * @return {string} ex: twitterapi
     */
    get username() {
        return this._data.screen_name;
    }

    /**
     * Nullable . The user-defined location for this account’s profile. Not necessarily a location,
     * nor machine-parseable. This field will occasionally be fuzzily interpreted by the Search service.
     *
     * @public
     * @get
     * @return {string} ex: San Francisco, CA
     */
    get location() {
        return this._data.location;
    }

    /**
     * Nullable . A URL provided by the user in association with their profile.
     *
     * @public
     * @get
     * @return {?DataUrl}  ex: https://dev.twitter.com
     */
    get url() {
        return (this._data.entities.url.urls.length > 0) ? new DataUrl(this._data.entities.url.urls[0]) : null;
    }

    /**
     * Get all urls of the user profile.
     *
     * @public
     * @get
     * @return {Array.<DataUrl>} array of DataUrl objects
     */
    get urls() {
        let arrayOfUrls = [];
        for (let i = 0; i < this._data.entities.url.urls.length; i++) {
            arrayOfUrls.push(new DataUrl(this._data.entities.url.urls[i]));
        }
        return arrayOfUrls;
    }

    /**
     * Get all urls in the descriptions of the user.
     *
     * @public
     * @get
     * @return {Array.<DataUrl>} array of DataUrl objects
     */
    get descriptionUrls() {
        let arrayOfUrls = [];
        for (let i = 0; i < this._data.entities.description.urls.length; i++) {
            arrayOfUrls.push(new DataUrl(this._data.entities.description.urls[i]));
        }
        return arrayOfUrls;
    }

    /**
     * Nullable . The user-defined UTF-8 string describing their account.
     *
     * @public
     * @get
     * @return {?string} ex: The Real EloquentTwitter API
     */
    get description() {
        return this._data.description;
    }

    /**
     * The number of followers this account currently has. Under certain conditions of duress, this field will
     * temporarily indicate “0”.
     *
     * @public
     * @get
     * @return {number} int
     */
    get followersCount() {
        return this._data.followers_count;
    }

    /**
     * The number of users this account is following (AKA their “followings”). Under certain conditions of duress,
     * this field will temporarily indicate “0”.
     *
     * @public
     * @get
     * @return {number} int
     */
    get friendsCount() {
        return this._data.friends_count;
    }

    /**
     * The number of public lists that this user is a member of.
     *
     * @public
     * @get
     * @return {number} int
     */
    get listedCount() {
        return this._data.listed_count;
    }

    /**
     * The UTC datetime that the user account was created on EloquentTwitter.
     *
     * @public
     * @get
     * @return {string} ex: Mon Nov 29 21:18:15 +0000 2010
     */
    get date() {
        return this._data.created_at;
    }

    /**
     * The number of Tweets this user has liked in the account’s lifetime. British spelling used in the field name
     * for historical reasons.
     *
     * @public
     * @get
     * @return {number} int
     */
    get favouritesCount() {
        return this._data.favourites_count;
    }

    /**
     * Nullable. The offset from GMT/UTC in seconds.
     *
     * @public
     * @get
     * @return {?number} int
     */
    get utcOffset() {
        return this._data.utc_offset;
    }

    /**
     * Nullable. A string describing the Time Zone this user declares themselves within.
     *
     * @public
     * @get
     * @return {?string} ex: Pacific Time (US & Canada)
     */
    get timeZone() {
        return this._data.time_zone;
    }

    /**
     * When true, indicates that the user has a verified account.
     *
     * @public
     * @get
     * @return {boolean} true if the user has a verified account.
     */
    get verified() {
        return this._data.verified;
    }

    /**
     * The number of Tweets (including retweets) issued by the user.
     *
     * @public
     * @get
     * @return {number} int
     */
    get statusesCount() {
        return this._data.statuses_count;
    }

    /**
     * The BCP 47 code for the user’s self-declared user interface language.
     * May or may not have anything to do with the content of their Tweets.
     *
     * @public
     * @get
     * @return {string} ex: en
     */
    get language() {
        return this._data.lang;
    }

    /**
     * When true, indicates that the user’s profile_background_image_url should be tiled when displayed.
     *
     * @public
     * @get
     * @return {boolean} true if the user’s profile_background_image_url should be tiled when displayed.
     */
    get profileBackgroundTile() {
        return this._data.profile_background_tile;
    }

    /**
     * The hexadecimal color chosen by the user for their background.
     *
     * @public
     * @get
     * @return {string} ex: e8f2f7
     */
    get profileBackgroundColor() {
        return this._data.profile_background_color;
    }

    /**
     * The hexadecimal color the user has chosen to display links with in their EloquentTwitter UI.
     *
     * @publics
     * @get
     * @return {string} ex: 0094C2
     */
    get profileLinkColor() {
        return this._data.profile_link_color;
    }

    /**
     * The hexadecimal color the user has chosen to display sidebar borders with in their EloquentTwitter UI.
     *
     * @public
     * @get
     * @return {string} ex: 0094C2
     */
    get profileSidebarBorderColor() {
        return this._data.profile_sidebar_border_color;
    }

    /**
     * The hexadecimal color the user has chosen to display sidebar backgrounds with in their EloquentTwitter UI.
     *
     * @public
     * @get
     * @return {string} ex: a9d9f1
     */
    get profileSidebarFillColor() {
        return this._data.profile_sidebar_fill_color;
    }

    /**
     * The hexadecimal color the user has chosen to display text with in their EloquentTwitter UI.
     *
     * @public
     * @get
     * @return {string} ex: 437792
     */
    get profileTextColor() {
        return this._data.profile_text_color;
    }

    /**
     * When true, indicates the user wants their uploaded background image to be used.
     *
     * @public
     * @get
     * @return {boolean} true if the user wants their uploaded background image to be used.
     */
    get profileUseBackgroundImage() {
        return this._data.profile_use_background_image;
    }

    /**
     * The user has been entered all their information.
     *
     * @public
     * @get
     * @return {boolean} true if it is.
     */
    get hasExtendedProfile() {
        return this._data.has_extended_profile;
    }

    /**
     * When true, indicates that the user has not altered the theme or background of their user profile.
     *
     * @public
     * @get
     * @return {boolean} true if that the user has not altered the theme or background of their user profile.
     */
    get defaultProfile() {
        return this._data.default_profile;
    }

    /**
     * When true, indicates that the user has not uploaded their own profile image and a default image is used instead.
     *
     * @public
     * @get
     * @return {boolean} true if the user has not uploaded their own profile image and a default image is used instead.
     */
    get defaultProfileImage() {
        return this._data.default_profile_image;
    }

    /**
     * A HTTP-based URL pointing to the background image the user has uploaded for their profile.
     *
     * @public
     * @get
     * @return {string} ex: http://a2.twimg.com/profile_background_images/229557229/twitterapi-bg.png
     */
    get profileBackgroundImageUrl() {
        return this._data.profile_background_image_url;
    }

    /**
     * A HTTPS-based URL pointing to the background image the user has uploaded for their profile.
     *
     * @public
     * @get
     * @return {string} ex: https://si0.twimg.com/profile_background_images/229557229/twitterapi-bg.png
     */
    get profileBackgroundImageUrlHttps() {
        return this._data.profile_background_image_url_https;
    }

    /**
     * A HTTP-based URL pointing to the user’s profile image.
     *
     * @public
     * @get
     * @return {string} ex: http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
     */
    get profileImageUrl() {
        return this._data.profile_image_url;
    }

    /**
     * A HTTPS-based URL pointing to the user’s profile image.
     *
     * @public
     * @get
     * @return {string} ex: https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
     */
    get profileImageUrlHttps() {
        return this._data.profile_image_url_https;
    }

    /**
     * A HTTPS-based URL pointing to the user’s profile image.
     *
     * @public
     * @get
     * @return {string} ex: https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
     */
    get profileBannerUrl() {
        return this._data.profile_banner_url;
    }

    /**
     * When true, indicates that this user has chosen to protect their Tweets.
     *
     * @public
     * @get
     * @return {boolean} true if this user has chosen to protect their Tweets
     */
    get protected() {
        return this._data.protected;
    }

    /**
     * Indicates that the user has an account with “contributor mode” enabled, allowing for Tweets issued by the user
     * to be co-authored by another account. Rarely true (this is a legacy field)
     *
     * @public
     * @get
     * @return {boolean} it is false most of the time.
     */
    get contributorsEnabled() {
        return this._data.contributors_enabled;
    }

    /**
     * When true, indicates that the user has enabled the possibility of geotagging their Tweets. This field must be
     * true for the current user to attach geographic data when using POST statuses / update
     *
     * @public
     * @get
     * @return {boolean} true if the user has enabled the possibility of geotagging their Tweets
     */
    get geoEnabled() {
        return this._data.geo_enabled;
    }

    /**
     * Get the last tweet for the user.
     *
     * @public
     * @get
     * @return {?DataTweet} the tweet object
     */
    get lastTweet() {
        return (this._data.status && this._data.status != null) ? new DataTweet(this._data.status) : null;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @return {string} name
     */
    toString() {
        return this.name;
    }
}

/**
 * @module
 * @type {DataUser}
 */
module.exports = DataUser;
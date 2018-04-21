/**
 * The library modules
 */
const DataSize = require('./DataSize');

/**
 * The class represents the data media that is received within the DataEntities object.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 * @requires DataSize
 */
class DataMedia {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} media - the media data
     */
    constructor(media) {

        /**
         * @type {Object}
         * @private
         */
        this._data = media;
    }

    /**
     * Get the data object.
     *
     * @public
     * @get
     * @return {Object} media
     */
    get data() {
        return this._data;
    }

    /**
     * ID of the media expressed as a string.
     *
     * @public
     * @get
     * @return {string} ex: 114080493040967680
     */
    get id() {
        return this._data.id_str;
    }

    /**
     * Get the type of the media.
     * Ex: animated_gif, photo, video
     *
     * @public
     * @get
     * @return {string} the type of the media.
     */
    get type() {
        return this._data.type;
    }

    /**
     * Get size of the media.
     *
     * @public
     * @param {string} size - target size (thumb, large, medium, small)
     * @return {Object} the object of the specific size.
     */
    getSize(size) {
        return this._data.sizes[size];
    }

    /**
     * Information for a thumbnail-sized version of the media.
     *
     * @public
     * @get
     * @return {DataSize} the DataSize object of the specific size.
     */
    get sizeThumb() {
        return new DataSize(this.getSize('thumb'));
    }

    /**
     * Information for a large-sized version of the media.
     *
     * @public
     * @get
     * @return {DataSize} the DataSize object of the specific size.
     */
    get sizeLarge() {
        return new DataSize(this.getSize('large'));
    }

    /**
     * Information for a medium-sized version of the media.
     *
     * @public
     * @get
     * @return {DataSize} the DataSize object of the specific size.
     */
    get sizeMedium() {
        return new DataSize(this.getSize('medium'));
    }

    /**
     * Information for a small-sized version of the media.
     *
     * @public
     * @get
     * @return {DataSize} the DataSize object of the specific size.
     */
    get sizeSmall() {
        return new DataSize(this.getSize('small'));
    }

    /**
     * Wrapped URL for the media link. This corresponds with the URL embedded directly into the raw Tweet text, and
     * the values for the indices parameter
     *
     * @public
     * @get
     * @return {string} ex: http://t.co/rJC5Pxsu
     */
    get url() {
        return this._data.url;
    }

    /**
     * An http:// URL pointing directly to the uploaded media file.
     * For media in direct messages, media_url is the same https URL as media_url_https and must be accessed via
     * an authenticated twitter.com session or by signing a request with the user’s access token using OAuth 1.0A.
     * It is not possible to directly embed these images in a web page.
     *
     * @public
     * @get
     * @return {string} ex: http://p.twimg.com/AZVLmp-CIAAbkyy.jpg
     */
    get path() {
        return this._data.media_url;
    }

    /**
     * An https:// URL pointing directly to the uploaded media file, for embedding on https pages.
     * For media in direct messages, media_url_https must be accessed via an authenticated twitter.com session or by
     * signing a request with the user’s access token using OAuth 1.0A. It is not possible to directly embed
     * these images in a web page.
     *
     * @public
     * @get
     * @return {string} direct url to the media file.
     */
    get pathHTTPS() {
        return this._data.media_url_https;
    }

    /**
     * URL of the media to display to clients.
     *
     * @public
     * @get
     * @return {string} ex: pic.twitter.com/rJC5Pxsu
     */
    get displayUrl() {
        return this._data.display_url;
    }

    /**
     * An expanded version of display_url. Links to the media display page.
     *
     * @public
     * @get
     * @return {string} ex: http://twitter.com/yunorno/status/114080493036773378/photo/1
     */
    get expandedUrl() {
        return this._data.expanded_url;
    }

    /**
     * An array of integers indicating the offsets within the Tweet text where the URL begins and ends. The first
     * integer represents the location of the first character of the URL in the Tweet text. The second integer
     * represents the location of the first non-URL character occurring after the URL (or the end of the string
     * if the URL is the last part of the Tweet text).
     *
     * @public
     * @get
     * @return {Array.<number>} array of int. ex: [15,35]
     */
    get indices() {
        return this._data.indices;
    }

    /**
     * Video info object.
     *
     * @public
     * @get
     * @return {Object} video_info
     */
    get videoInfo() {
        return this._data.video_info;
    }

    /**
     * Video info aspect ratio.
     *
     * @public
     * @get
     * @return {Array.<number>} array of int. video_info.aspect_ratio
     */
    get videoInfoAspectRatio() {
        return this._data.video_info.aspect_ratio;
    }

    /**
     * Video info variants object.
     *
     * @public
     * @get
     * @return {Object} video_info.variants
     */
    get videoInfoVariants() {
        return this._data.video_info.variants;
    }

    /**
     * Video info first variants object, get content type.
     *
     * @public
     * @get
     * @return {string} video_info.variants[0].content_type
     */
    get videoInfoVariantsContentType() {
        return this._data.video_info.variants[0].content_type;
    }

    /**
     * Video info first variants object, get content url.
     *
     * @public
     * @get
     * @return {Object} video_info.variants[0].url
     */
    get videoInfoVariantsUrl() {
        return this._data.video_info.variants[0].url;
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @return {string} path
     */
    toString() {
        return String(this.path);
    }
}

/**
 * @module
 * @type {DataMedia}
 */
module.exports = DataMedia;
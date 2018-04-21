/**
 * The class represents the data connection that is received form friendships/lookup.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 4, 2018
 */
class DataConnections {

    /**
     * Constructor to set the data object.
     *
     * @constructor
     * @param {Object} userConnections - the user connections data
     */
    constructor(userConnections) {

        /**
         * @type {Object}
         * @private
         */
        this._data = userConnections;
    }

    /**
     * Get the data object that are received form the constructor.
     *
     * @public
     * @get
     * @return {Object} userConnections
     */
    get data() {
        return this._data;
    }

    /**
     * Get the connection of the first user that has been locked for.
     *
     * @public
     * @get
     * @return {Array.<string>} array of string. [following, following_requested, followed_by, none, blocking, muting]
     */
    get connections() {
        return this._data[0].connections;
    }

    /**
     * Check if the user following you.
     *
     * @public
     * @get
     * @return {boolean} true if the user following you.
     */
    get isUserFollowingYou() {
        return this.connections.includes('followed_by');
    }

    /**
     * Check if you following the user.
     *
     * @public
     * @get
     * @return {boolean} true if you following the user.
     */
    get areYouFollowingUser() {
        return this.connections.includes('following');
    }

    /**
     * Check if the user following you.
     *
     * @public
     * @get
     * @return {boolean} true if the user following you.
     */
    get areAllFollwingEachOther() {
        return this.isUserFollowingYou && this.areYouFollowingUser;
    }

    /**
     * Check if you blocking the user.
     *
     * @public
     * @get
     * @return {boolean} true if you blocking the user.
     */
    get areYouBlockingIt() {
        return this.connections.includes('blocking');
    }

    /**
     * Check if you muting the user.
     *
     * @public
     * @get
     * @return {boolean} true if you muting the user.
     */
    get areYouMutingIt() {
        return this.connections.includes('muting');
    }

    /**
     * Check if you sent the following request to the user.
     *
     * @public
     * @get
     * @return {boolean} true if you sent the following request to the user.
     */
    get isFollowingRequested() {
        return this.connections.includes('following_requested');
    }

    /**
     * Check if the user following you and you following the user.
     *
     * @public
     * @get
     * @return {boolean} true if the user following you, and you following the user.
     */
    get isThereAnyConnection() {
        return this.connections.includes('none');
    }

    /**
     * Get the string of the object.
     *
     * @public
     * @override
     * @return {string} displayUrl
     */
    toString() {
        return this.connections.join();
    }
}

/**
 * @module
 * @type {DataConnections}
 */
module.exports = DataConnections;
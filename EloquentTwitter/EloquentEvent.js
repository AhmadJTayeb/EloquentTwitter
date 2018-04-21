/**
 * This class to manage the events.
 *
 * @class
 * @author Ahmad Tayeb
 * @data January, 15, 2018
 */
class EloquentEvent {

    /**
     * Constructor to set the container of the events.
     */
    constructor() {

        /**
         * @type {{}}
         * @private
         */
        this._eventContainer = {}
    }

    /**
     * Register new cllback on the specefic event.
     *
     * @public
     * @param {string} on - the event name
     * @param {function} fun - callback function
     */
    registerEvent(on, fun) {
        if (this._eventContainer.hasOwnProperty(on)) {
            this._eventContainer[on].push(fun);
        } else {
            this._eventContainer[on] = [fun];
        }
    }

    /**
     * Fire the events
     * @param {string} on - the event name
     * @param {Array} [parameters] - optional parameters
     * @return {boolean} true if the event is exsit.
     */
    fireEvents(on, parameters) {
        if (!this._eventContainer.hasOwnProperty(on)) return false;

        for (let i = 0; i < this._eventContainer[on].length; i++) {
            this._eventContainer[on][i](...parameters);
        }

        return true;
    }
}

module.exports = EloquentEvent;
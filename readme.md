# EloquentTwitter

EloquentTwitter is a library that makes dealing with Twitter API easly and eloquently. This library implemented most Twitter API v.3, which is released on February 1, 2018.

# Functions:

| Plugin | README |
| ------ | ------ |
| registerUserStreamEvent(on, fun) | Register new event to user stream.|
|registerStatusesFilterStreamEvent(on, fun)|Register new event to statuses filter stream.
|addTracksToStatusesFilterStream(...tracks)|Add tracks to the status stream.|
|resetTracksToStatusesFilterStream()|Reset tracks to the status stream.|
|setKeys(keysObject)| Set the Twitter API keys.|
|getTwitObject()| Get the twit object.|
|getCurrentUserInfo(successCallback, errorCallback)|Get current user information (User who’s these credentials are related to).|
|searchTweets(dataStandardSearch, successCallback, errorCallback)|Returns a collection of relevant Tweets matching a specified query.|
|getTweetsByIDs(arrayOfTweetIDs, successCallback, errorCallback)|Returns fully-hydrated DataTweet objects for up to 100 Tweets per request.|
|getTweetsBySearch(query, successCallback, errorCallback)|Get all tweets by searching (Last 7 days tweets).|
|getRelatedTweetsFromUser(username, tweetId, successCallback, errorCallback)|Get the related tweets from a specific user for a specific tweet id_str.|
|getTweetsByID(tweetId, successCallback, errorCallback)|Returns a single Tweet, specified by the id parameter. The Tweet’s author will also be embedded within the Tweet.|
|getUserByID(userId, successCallback, errorCallback)|Returns a variety of information about the user specified by the required user_id parameter.|
|getUserByUsername(username, successCallback, errorCallback)|Returns a variety of information about the user specified by the required screen_name parameter.|
||getReplies(toUsername, toTweetID, successCallback, errorCallback)|Get replies to the tweet and username. |
|getFavoritesList(successCallback, errorCallback, parameters)|Returns the most recent Tweets liked by the authenticating.|
|getFavoritesListByUsername(username, successCallback, errorCallback)|Returns the most recent Tweets liked by the specified user (screen_name).|
|getFavoritesListById(id, successCallback, errorCallback)|Returns the most recent Tweets liked by the specified user (id_str). |
|getStatusesRetweets(successCallback, errorCallback)|Returns the most recent Tweets authored by the authenticating user that have been retweeted by others. |
|uploadMediaImage(src, altText, successCallback, errorCallback)|Upload picture to EloquentTwitter and return the media_id_string. This can be attached to a tweet or message.|
|postNewTweet(text, successCallback, errorCallback, parameters)|Updates the authenticating user’s current status, also known as Tweeting.|
postNewReplyToTweet(text, toTweetId, successCallback, errorCallback, parameters)|Updates the authenticating user’s status in order to reply to other status.|
|postNewTweetWithMedia(text, media_ids, successCallback, errorCallback, parameters)|Post a new tweet with media. |
|postNewReplyToTweetWithMedia(text, media_ids, toTweetId, successCallback, errorCallback, parameters)|Updates the authenticating user’s status with media in order to reply to other status.|
|retweet(tweetId, successCallback, errorCallback)|Retweets a tweet. Returns the original Tweet with Retweet details embedded.|
|unretweet(tweetId, successCallback, errorCallback)|Untweets a retweeted status. Returns the original Tweet with Retweet details embedded.|
|favorite(tweetId, successCallback, errorCallback)|Favorite (like) a tweet.|
|unfavorite(tweetId, successCallback, errorCallback)|Unfavorites (un-likes) the tweet specified in the ID parameter as the authenticating user.|
|deleteTweet(tweetId, successCallback, errorCallback)|Destroys the status specified by the required ID parameter. The authenticating user must be the author of the specified status. Returns the destroyed status if successful. |
|sendNewDirectMessage(toUserId, message, successCallback, errorCallback, parametersMessageData)|Publishes a new message_create event resulting in a Direct Message sent to a specified user from the authenticating user. Returns an event if successful.|
|sendNewDirectMessageWithButtons(toUserId, message, buttons, successCallback, errorCallback)|Send a new direct message with buttons.|
|sendNewDirectMessageWithQuickReply (toUserId, message, quickReply, successCallback, errorCallback)|Send a new direct message with options quick reply.|
|sendNewDirectMessageWithQuickReplyAndButtons (toUserId, message, quickReply, buttons, successCallback, errorCallback)|Send a new direct message with options quick reply and buttons.|
|sendNewDirectMessageWithMedia(toUserId, message, media_id, successCallback, errorCallback)|Send a new direct message with media.|
|sendNewDirectMessageWithMediaAndButtons(toUserId, message, media_id, buttons, successCallback, errorCallback)|Send a new direct message with media and buttons.|
|sendNewDirectMessageWithMediaAndQuickReply(toUserId, message, media_id, quickReply, successCallback, errorCallback)|Send a new direct message with media and options quick reply.|
|sendNewDirectMessageWithMediaAndQuickReplyAndButtons(toUserId, message, media_id, quickReply, buttons, successCallback, errorCallback)|Send a new direct message with media and options quick reply and buttons.|
|getDirectMessage(messageId, successCallback, errorCallback)|Get a direct message by id. |
|deleteDirectMessage(directMessageID, successCallback, errorCallback)|Deletes the direct message specified in the required ID parameter. The authenticating user must be the recipient of the specified direct message. Direct Messages are only removed from the interface of the user context provided. Other members of the conversation can still access the Direct Messages.|
|getMentionsTimeline(successCallback, errorCallback, parameters)|Returns the 20 most recent mentions (Tweets containing a users’s @screen_name) for the authenticating user. The timeline returned is the equivalent of the one seen when you view your mentions on twitter.com. This method can only return up to 800 tweets. |
|getStatusesHomeTimeline(successCallback, errorCallback, includeRetweet, parameters)|Returns a collection of the most recent Tweets and Retweets posted by the authenticating user and the users they follow. The home timeline is central to how most users interact with the Twitter service. Up to 800 Tweets are obtainable on the home timeline.|
|getUserTweetsTimelineById(id, successCallback, errorCallback, includeRetweet, parameters)|Returns a collection of the most recent Tweets posted by the user indicated by the user_id parameter. User timelines belonging to protected users may only be requested when the authenticated user either “owns” the timeline or is an approved follower of the owner.|
|getUserTweetsTimelineByUsername(username, successCallback, errorCallback, includeRetweet, parameters)|Returns a collection of the most recent Tweets posted by the user indicated by the screen_name parameter. User timelines belonging to protected users may only be requested when the authenticated user either “owns” the timeline or is an approved follower of the owner.|
|getUserConnectionsByUserId(userId, successCallback, errorCallback, parameters)|Get user connection by user id. Connections can be: following, following_requested, followed_by, none, blocking, muting. |
|getUserConnectionsByUsername(username, successCallback, errorCallback, parameters)|Get user connection by username. Connections can be: following, following_requested, followed_by, none, blocking, muting. |
|startUserStream()|Starting the stream and keeping the connection alive (user Stream).|
|stopUserStream()|Call this function on the stream to stop streaming (closes the connection with Twitter).|
|startStatusesFilterStream()|Starting the stream and keeping the connection alive (statuses/filter Stream).|
|restartStatusesFilterStream()|Restart the stream to apply the new tracks that have been added.|

### Installation

EloquentTwitter requires [Node.js](https://nodejs.org/) v4+ to run.

Run the command.

```sh
$ npm install eloquent-twitter
```

### Example
```javascript
//Import the classes
const EloquentTwitter = require("./EloquentTwitter").EloquentTwitter;
const EloquentTwitterEvent = require("./EloquentTwitter").EloquentTwitterEvent;
//Define Twitter API keys
const keys = {
    consumer_key:         "",
    consumer_secret:      "",
    access_token:         "",
    access_token_secret:  "",
};
//Create new object
let eloquentTwitter = new EloquentTwitter(keys);


//Register an event to get a tweet from the user stream
eloquentTwitter.registerUserStreamEvent(EloquentTwitterEvent.TWEET, function (data) {
    //data is an instance from DataTweet class
    console.log(data.text);
    //You can reply to it on the fly
    data.reply("This is a test reply");
});
//Start the stream
eloquentTwitter.startUserStream();
console.log("I am listening to user stream event...");

//Register an event to get a tweet from the public stream by keywords
eloquentTwitter.addTracksToStatusesFilterStream(["nodejs", "java"]);
eloquentTwitter.registerStatusesFilterStreamEvent(EloquentTwitterEvent.TWEET_NOT_RETWEET, function (data) {
    console.log("Tweet Text: " + data.text);
    console.log("By user: " + data.user.name + " (@" + data.user.username + ")");
});
eloquentTwitter.startStatusesFilterStream();
console.log("I am listening to public tweets that contain " + eloquentTwitter.getTrackaStatusesFilterStream() + " ...");

//Post a tweet
eloquentTwitter.postNewTweet("This is a test.", function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
});


//Post a reply to the tweet id
eloquentTwitter.postNewReplyToTweet("This is a reply.", "987704157573406720", function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
});

//Get user info
eloquentTwitter.getUserByUsername("mrahmad1", function (user) {
    //Send a direct message to user id
    eloquentTwitter.sendNewDirectMessage(user.id, "Hi", function (data) {
        console.log(data);
    }, function (err) {
        console.log(err);
    });
}, function (err) {
    console.log(err);
});
'''
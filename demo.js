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


/*globals kendo */

function TweetViewModel() {
  /// <summary>
  /// A view model that represents a single tweet
  /// </summary>

  var that;

  // --- properties
  this.author = "";
  this.text = "";
  this.time = "";
  this.thumbnail = "";

  // --- private functions
  function parseDate(date) {
    /// <summary>
    /// Parses the tweet date to give a more readable format.
    /// </summary>
    var diff = (new Date() - new Date(date)) / 1000;

    if (diff < 60) {
      return diff.toFixed(0) + " seconds ago";
    }

    diff = diff / 60;
    if (diff < 60) {
      return diff.toFixed(0) + " minutes ago";
    }

    diff = diff / 60;
    if (diff < 10) {
      return diff.toFixed(0) + " hours ago";
    }

    diff = diff / 24;

    if (diff.toFixed(0) === 1) {
      return diff.toFixed(0) + " day ago";
    }

    return diff.toFixed(0) + " days ago";
  }

  // --- public functions

  this.init = function (tweet) {
    this.set("author", tweet.author);
    this.set("text", tweet.text);
    this.set("time", parseDate(tweet.time));
    this.set("thumbnail", tweet.thumbnail);
  };

  that = kendo.observable(this);
  return that;
}

/*globals $, kendo, twitterSearchService, tweetViewModel, app*/

function SearchResultsViewModel() {
  /// <summary>
  /// A view model that renders the results of a twitter search.
  /// </summary>

  var that;

  // --- properties
  this.tweets = [];
  this.isSearching = false;
  this.pageNumber = 1;
  this.loadMoreText = "Load more ...";
  this.searchString = "";

  // --- public functions
  this.init = function (searchText, tweetViewModels) {
    this.set("tweets", tweetViewModels);
    this.set("pageNumber", 1);
    this.set("searchString", searchText);
  };

  this.loadMore = function () {
    this.set("pageNumber", this.pageNumber + 1);
    this.set("isSearching", true);
    this.set("loadMoreText", "Loading ...");

    twitterSearchService.searchForKeyword(this.searchString, this.pageNumber, function (tweets) {
      that.set("isSearching", false);
      that.set("loadMoreText", "Load more ...");

      // add the new batch of tweets
      if (tweets.length > 0) {
        $.each(tweets, function (index, tweet) {
          that.tweets.push(tweet);
        });
      }
    });
  };

  this.tweetClicked = function (e) {
    // navigate to the tweet
    tweetViewModel.init(e.dataItem);
    app.navigate("#tweetView");
  };

  that = kendo.observable(this);
  return that;
}
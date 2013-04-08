/*globals kendo, document, TwitterSearchViewModel, SearchResultsViewModel, TweetViewModel  */

// create the mobile app
var app = new kendo.mobile.Application(document.body);

// create the view models
var twitterSearchViewModel = new TwitterSearchViewModel();
var searchResultsViewModel = new SearchResultsViewModel();
var tweetViewModel = new TweetViewModel();

// load the initial state
twitterSearchViewModel.loadState();






















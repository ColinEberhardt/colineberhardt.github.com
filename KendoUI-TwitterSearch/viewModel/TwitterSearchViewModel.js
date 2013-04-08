/*globals $, kendo, TwitterSearchService, localStorage, searchResultsViewModel, app */

function TwitterSearchViewModel() {
  /// <summary>
  /// A view model for searching twitter for a given term
  /// </summary>

  var that,
      twitterSearchService = new TwitterSearchService();

  // --- properties
  this.searchTerm = "#kendoui";
  this.isSearching = false;
  this.userMessage = "";
  this.searchEnabled = false;
  this.recentSearches = [];

  this.recentSearchTitleVisible = function () {
    return this.get("recentSearches").length > 0;
  };
  this.searchButtonDisabled = function () {
    return this.get("searchTerm").length === 0 && this.get("isSearching") === false;
  };

  // --- 'private' functions

  function saveState() {
    /// <summary>
    /// Saves the view model state to local storage
    /// </summary>
    var recentSearchStrings = that.recentSearches.toJSON().map(function (item) {
      return item.searchString;
    });
    localStorage.setItem("state", recentSearchStrings.toString());
  }

  function addSearchTermToRecentSearches() {
    /// <summary>
    /// Adds the current search term to the search history
    /// </summary>

    // check whether we already have this item in our recent searches list
    var matches = $.grep(that.recentSearches, function (recentSearchTerm) {
      return recentSearchTerm.searchString === that.searchTerm;
    });

    // if there is no match, add this term
    if (matches.length === 0) {

      // add the new item
      that.recentSearches.unshift({ searchString: that.searchTerm });

      // limit to 5 recent search terms
      while (that.recentSearches.length > 5) {
        that.recentSearches.pop();
      }

      saveState();
    }
  }

  // --- functions
  this.executeSearch = function () {
    /// <summary>
    /// Searches twitter for the current search term.
    /// </summary>

    if ($.trim(this.searchTerm) === "") {
      return;
    }

    this.set("userMessage", "");
    this.set("isSearching", true);

    twitterSearchService.searchForKeyword(this.searchTerm, 1, function (tweets) {
      if (tweets.length > 0) {
        // store this search
        addSearchTermToRecentSearches();

        // navigate to the results view model
        searchResultsViewModel.init(that.searchTerm, tweets);
        app.navigate("#searchResultsView");
      } else {
        that.set("userMessage", "There were no matches for the given search term");
      }

      that.set("isSearching", false);
    });
  };

  this.loadState = function () {
    /// <summary>
    /// Loads the persisted view model state from local storage
    /// </summary>

    var state = localStorage.getItem("state");

    if (typeof (state) === 'string') {
      $.each(state.split(","), function (index, item) {
        if (item.trim() !== "") {
          that.recentSearches.push({ searchString: item });
        }
      });
    }
  };

  this.recentSearchClicked = function (e) {
    /// <summary>
    /// Handles clicks on recent search terms.
    /// </summary>
    var selectedSearchTerm = e.dataItem.searchString;
    this.set("searchTerm", selectedSearchTerm);
    this.executeSearch();
  };

  that = kendo.observable(this);
  return that;
}

 
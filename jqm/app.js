

var isWindowsPhone = navigator.userAgent.indexOf("Windows Phone OS 7.5") !== -1;

window.alert(navigator.userAgent);

if (isWindowsPhone) {
 // $.mobile.ajaxEnabled = false;
  setActiveStyleSheet("metro");

  $.mobile.page.prototype.options.headerTheme = "a"; 
  $.mobile.page.prototype.options.contentTheme = "a";
  $.mobile.page.prototype.options.footerTheme = "a";
}


// http://www.alistapart.com/articles/alternate/
function setActiveStyleSheet(title) {
  var i, a, main;
  for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if (a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

$("div[data-role='page']").live('pagecreate', function (event) {
  if (isWindowsPhone) {
    $("a[data-rel='back']").remove();
  }
});
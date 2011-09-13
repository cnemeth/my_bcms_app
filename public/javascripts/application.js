// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

/** @namespace */
var hedgeye = {};
/** Utility functions */
hedgeye.util = {
asyncJSInclude: function(path) {
// try {
var asyncjs = document.createElement('script');
asyncjs.type = 'text/javascript';
asyncjs.async = true;
asyncjs.src = path;
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(asyncjs);
// } catch (e) {
//   if ('Error loading script' === e.message) {
//     // ignore
//   } else { // we want to know
//     throw e;
//   }
// }
},
relativeTime: function (timeValue) {
var args = arguments,
values = timeValue.split(" "),
parsed_date,
relative_to,
delta;
timeValue = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
parsed_date = Date.parse(timeValue);
relative_to = (args.length > 1) ? args[1] : new Date();
delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
delta = delta + (relative_to.getTimezoneOffset() * 60);
if (delta < 60) {
return 'less than a minute ago';
} else if (delta < 120) {
return 'about a minute ago';
} else if (delta < (60 * 60)) {
return (parseInt(delta / 60)).toString() + ' minutes ago';
} else if (delta < (120 * 60)) {
return 'about an hour ago';
} else if (delta < (24 * 60 * 60)) {
return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
} else if (delta < (48 * 60 * 60)) {
return '1 day ago';
} else {
return (parseInt(delta / 86400)).toString() + ' days ago';
}
},
/**
* Truncate a +string+ to +length+ characters, adding an ellipsis (by default) or other +replacementText+ at your option.
* @function
*/
truncate: function (string, length, replacementText) {
string = String(string); // coerce
if (typeof replacementText === 'undefined') { replacementText = '...'; };
if (string.length > length) {
return string.substring(0, length - replacementText.length) + replacementText;
} else {
return string;
}
},
/**
* Repeat a +string+ +count+ times.
* @seealso http://stackoverflow.com/questions/202605/repeat-string-javascript
* @function
*/
repeat: function (string, count) {
return new Array(count + 1).join(string);
}
};
hedgeye.twitter = (function () {
'use strict';
/** @namespace */
var ns = {};
/** Configuration settings (as opposed to constants, etc. vital to the workings of the Twitter code) */
ns.config = {
/** For Tweet Button API */
related: {
primary: 'Hedgeye',
secondary: 'KeithMcCullough'
},
/** For all Hedgeye related accounts. */
//listId: 34714269,
listId: 23569917,
/** For ns.apiURL() */
proxyURL: 'twitter-api-app507085.apigee.com/'
};
/** @const */
ns.maxLength = 140;
/** For click handler */
ns.mutex = true;
/** Stores usernames */
ns.cache = {};
ns.show = function (jsonpURLs) {
var offset = 1, timeoutMaker;
timeoutMaker = function (jsonpURL) {
return function () {
hedgeye.util.asyncJSInclude(jsonpURL);
};
};
// Used to control the styling of the first tweet when there are multiple usernames.  Only meaningful on the Team page.
ns.restart = true;
jsonpURLs.forEach(function (jsonpURL) {
// We want the tweets ordered in a particular way, hence the offset and timing difference.
setTimeout(timeoutMaker(jsonpURL), offset * 100);
offset += 1;
});
};
ns.formatRetweet = function (tweet) {
var prefix = 'RT ',
suffix = ' via @' + tweet.user.screen_name, // added automatically by Twitter through the Tweet Button API
affixLength = prefix.length + suffix.length,
truncatedLength = ns.maxLength - affixLength;
return prefix + hedgeye.util.truncate(tweet.text, truncatedLength);
};
ns.template = {
url: function (url) {
return '<a href="' + String(url) + '">' + String(url) + '</a>';
},
reply: function (reply) {
return '<a href="http://twitter.com/' + String(reply.substring(1)) + '">' + String(reply) + '</a>';
},
/**
* Build a retweet link for the Tweet Button API.
*
* We could use a full-blown Tweet Button, but we don't want to deal with JS problems, styling its changes, etc.
*
* @seealso http://dev.twitter.com/pages/tweet_button, http://twitter.com/about/resources/tweetbutton
*/
retweetLink: function (tweet) {
var params = {}, url;
params.text = ns.formatRetweet(tweet);
params.via = tweet.user.screen_name;
if (params.via === ns.config.related.primary) {
params.related = ns.config.related.secondary;
} else {
params.related = ns.config.related.primary;
}
url = ['http://twitter.com/intent/tweet', jQuery.param(params)].join('?');
return '<a class="retweet" href="' + String(url) + '" target="_blank">Retweet</a>';
},
tweet: function (tweet) {
var html = [], profileURL, status, username;
username = tweet.user.screen_name;
profileURL = 'http://www.twitter.com/' + String(username);
status = tweet.text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, ns.template.url).replace(/\B@([_a-z0-9]+)/ig, ns.template.reply);
html.push('<section class="tweet-wrapper');
if (tweet.first) {
html.push(' first');
}
html.push('">');
html.push('<div class="twitter-profile">');
html.push('<a href="' + profileURL + '" class="btn-twitter-follow follow-link" target="_blank">Follow</a>');
html.push('<a href="' + profileURL + '" target="_blank"><img src="' + String(tweet.user.profile_image_url) + '" class="twitter-avatar thumbnail"></a>');
html.push('</div>');
html.push('<div class="content">');
html.push('<header class="tweet">');
if (typeof ns.cache[username] === 'undefined') {
html.push('<h4><a href="' + profileURL + '" target="_blank">' + String(tweet.user.name) + '</a></h4>');
}
html.push('</header>');
html.push('<p>' + String(status) + '</p>');
html.push('<footer><time class="timestamp"><a href="' + profileURL + '/statuses/' + String(tweet.id_str) + '" target="_blank">' + String(hedgeye.util.relativeTime(tweet.created_at)) + '</a></time>');
html.push(ns.template.retweetLink(tweet));
html.push('</footer>');
html.push('</div>');
html.push('</section>');
ns.cache[username] = true;
return html.join('');
},
tweets: function (tweets) {
var i, html = [];
for (i = 0; i < tweets.length; i += 1) {
var tweet = tweets[i];
if ((tweets.length > 1 && i === 0) || (tweets.length === 1 && ns.restart)) {
tweet.first = true;
ns.restart = false;
ns.cache = {};
}
html.push(ns.template.tweet(tweet));
}
return html.join('');
}
};
ns.jsonpCallback = function (tweets) {
var span = document.createElement('span');
$('#tweets').append(span);
span.innerHTML = ns.template.tweets(tweets); // Work around a bug in using jQuery's append method on IE when using HTML5 elements
ns.mutex = true;
};
/**
* Get the API base URL, either Twitter or the Apigee proxied one.
* The result of this function Must end in a '/'.
* @const
*/
ns.apiURL = function (withProxy) {
var url = [];
if (typeof withProxy === 'undefined') { withProxy = true; }
url.push('https:' === document.location.protocol ? 'https://' : 'http://');
url.push(withProxy ? ns.config.proxyURL : 'twitter.com/');
return url.join('');
};
/**
* @example ns.listStatusesURL({list_id: ns.config.listId})
* @seealso http://dev.twitter.com/doc/get/lists/statuses
* @seealso http://dev.twitter.com/doc/get/lists/members
*/
ns.listStatusesURL = function (params) {
if (!params) { params = {}; }
if (!params.callback) { params.callback = 'hedgeye.twitter.jsonpCallback'; }
return [ns.apiURL(), '1/lists/statuses.json?', jQuery.param(params)].join('');
};
/**
* @example ns.timelineURL({screen_name: 'keithmccullough', count: 5});
* @seealso http://dev.twitter.com/doc/get/statuses/user_timeline
*/
ns.userTimelineURL = function (params) {
if (!params) { params = {}; }
if (!params.callback) { params.callback = 'hedgeye.twitter.jsonpCallback'; }
return [ns.apiURL(), '1/statuses/user_timeline.json?', jQuery.param(params)].join('');
};
/**
* Update the filter UI to show that a JavaScript-based link has been selected.
* @function
*--
* TODO change to jQuery wrap() and unwrap()
*/
ns.selectFilter = function (username) {
var $lastSeen, $element;
if (ns.lastSeenUsername) {
$lastSeen = $('#' + ns.lastSeenUsername);
$lastSeen.html('<a href="#">' + $lastSeen.html() + '</a>');
}
$element = $('#' + username);
$element.html($element.children().first().html());
$element.addClass('current selected');
ns.lastSeenUsername = username;
};
/**
* DOM ready callback.
*
* @param options: Either {usernames: ['username1', 'username2', ...]} or {jsonpURLs: ['http://...?callback=functionName']}
* @returns a continuation, as it needs usernames to operate on.
* @function
*/
ns.ready = function (options) {
return function () {
var jsonpURLs, inspected = '';
if (options.usernames) {
jsonpURLs = options.usernames.map(function (u) { return ns.userTimelineURL({screen_name: u, count: 1}); }); 
} else if (options.jsonpURLs) {
jsonpURLs = options.jsonpURLs;
} else {
throw new Error('Argument Error: got unexpected options (options: ' + JSON.stringify(options) + ')');
}
ns.selectFilter('all-twitterers');
ns.show(jsonpURLs);
$("#twitter-menu li").click(function () {
var $lastSeen, $this = $(this), username;
username = $this.attr("id");
ns.selectFilter(username);
jQuery("#tweets .tweet-wrapper").remove();
if (ns.mutex) {
ns.mutex = false;
if (username === "all-twitterers") {
ns.show(jsonpURLs);
} else {
ns.show([ns.userTimelineURL({screen_name: username, count: 8})]);
}
}
});
};
};
return ns;
}());

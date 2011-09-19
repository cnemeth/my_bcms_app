Given /^an array of feed urls$/ do
  @feed_urls = []
end

When /^I make a call to the Feedzirra gem fetch and parse method$/ do
  @entries = sanitize_and_interleave( Feedzirra::Feed.fetch_and_parse(feed_urls) )
end

Then /^I should have the blog feeds contained in entries$/ do
  @entries != nil
end

Then /^I should see the interleaved entries of the feeds displayed in reverse chronological order$/ do
  pending # express the regexp above with the code you wish you had
end


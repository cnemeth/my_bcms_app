Given /^an array of feed urls$/ do
  @bp = BlogFeedsPortlet.new
end

When /^I make a call to the Feedzirra gem fetch and parse method$/ do
  @entries = @bp.render
end

Then /^I should have the blog feeds contained in entries$/ do
  @entries.should_not be nil
  @entries.is_a?(Fixnum).should be false
  @entries.count.should > 0
end

Then /^I should see the interleaved entries of the feeds displayed in reverse chronological order$/ do
  0.upto(@entries.count - 2) do | offset |
      latest_entry = @entries[offset]
      previous_entry = @entries[offset + 1]
      latest_entry.published.should >= previous_entry.published
  end
end


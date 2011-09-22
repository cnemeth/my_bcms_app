Given /^the blog feeds of the engineers$/ do
  @bp = BlogFeedsPortlet.new
  @entries = @bp.render
end

When /^the listing of blog entries$/ do
  @entries.count.should > 0
end

Then /^I should see the interleaved blog entries of the feeds displayed in reverse chronological order$/ do
  0.upto(@entries.count - 2) do | offset |
    latest_entry = @entries[offset]
    previous_entry = @entries[offset + 1]
    latest_entry.published.should >= previous_entry.published
  end
end

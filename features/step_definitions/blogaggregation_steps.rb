Given /^the blog feeds of the engineers$/ do
  @bp = BlogFeedsPortlet.new
  @entries = @bp.render
end

When /^I go to the blog feeds page$/ do
  
end

Then /^I should see the interleaved blog entries of the feeds displayed in reverse chronological order$/ do
  pending # express the regexp above with the code you wish you had
  0.upto(@entries.count - 2) do | offset |
    latest_entry = @entries[offset]
    previous_entry = @entries[offset + 1]
    latest_entry.published.should >= previous_entry.published
  end
end

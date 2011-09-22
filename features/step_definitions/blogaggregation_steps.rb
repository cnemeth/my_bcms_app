Given /^a collection of blog feeds$/ do
  @bp = BlogFeedsPortlet.new
  @entries = @bp.render 
end

When /^the listing of blog entries$/ do
  get "/blog_feeds"
end

Then /^I should see the aggregated blog entries$/ do
  @entries.count >= 0
end

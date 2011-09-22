require File.expand_path("../../spec_helper", __FILE__)

describe BlogFeedsPortlet do

  before(:each) do
    bp = BlogFeedsPortlet.new
    @entries = bp.render
  end

  it "displays zero or more blog entries" do
    @entries.count.should >= 0
    @entries.is_a?(Fixnum).should be false
  end

  it "aggregates entries of blog feeds" do
    # Build a frequency distribution of blog entries
    # for each author and check the length
    authors = Hash.new(0)
    @entries.each do | e |
      authors[e.author] += 1 
    end
    authors.length.should >= 4
  end

  it "keeps the aggregated blogs in reverse chronological order" do
    0.upto(@entries.count - 2) do | offset |
      latest_entry = @entries[offset]
      previous_entry = @entries[offset + 1]
      latest_entry.published.should >= previous_entry.published
    end
  end

end

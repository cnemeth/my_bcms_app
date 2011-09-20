require File.expand_path("../../spec_helper", __FILE__)

describe BlogFeedsPortlet do

  before(:each) do
    @bp = BlogFeedsPortlet.new
  end

  it "keeps the aggregated logs in reverse chronological order" do
    entries = @bp.render
    entries.should_not be nil
    entries.is_a?(Fixnum).should be false
    entries.count.should > 0
    0.upto(entries.count - 2) do | offset |
        latest_entry = entries[offset]
        previous_entry = entries[offset + 1]
        latest_entry.published.should >= previous_entry.published
    end
  end
end

require 'feedzirra'

class BlogFeedsPortlet < Portlet

  # Mark this as 'true' to allow the portlet's template to be editable via the CMS admin UI.
  enable_template_editor false
   
  FEED_URLS = [
    "http://feeds.feedburner.com/BenjaminOakes",
    "http://diegoscataglini.com/feed",
    "http://feeds.feedburner.com/PuttingTheFunIntoFunkworks",
    "http://oldfartdeveloper.blogspot.com/feeds/posts/default?alt=rss"
  ]  

  def render
    # Your Code Goes Here
    @entries = sanitize_and_interleave( Feedzirra::Feed.fetch_and_parse(FEED_URLS) )
  end
    
private

  def sanitize_and_interleave(feeds)
    entries = []
    feeds.each do | key, value |
      # Add check for
      # ERROR: undefined method `sanitize_entries!' for 0:Fixnum
      # This happens, for example, on network outage
      next unless value.is_a?(Feedzirra::Parser::RSS) || value.is_a?(Feedzirra::Parser::AtomFeedBurner)
      value.sanitize_entries!
      value.entries.each do | e |
        entries << e
      end
    end  
    sort_by_publish_date(entries)
  end

  def sort_by_publish_date(entries)
   entries.sort{ |a,b| b.published <=> a.published }
  end
end

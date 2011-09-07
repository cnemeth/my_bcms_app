require 'feedzirra'

class BlogFeedsPortlet < Portlet

  # Mark this as 'true' to allow the portlet's template to be editable via the CMS admin UI.
  enable_template_editor true 
     
  def render
    # Your Code Goes Here
    feed_urls = [
    "http://feeds.feedburner.com/BenjaminOakes",
    "http://diegoscataglini.com/feed",
    "http://feeds.feedburner.com/PuttingTheFunIntoFunkworks",
    "http://oldfartdeveloper.blogspot.com/feeds/posts/default?alt=rss"
    ] 

    @entries = sanitize_and_interleave( Feedzirra::Feed.fetch_and_parse(feed_urls) )

  end
    
private

  def sanitize_and_interleave(feeds)
    entries = []
    feeds.each do | key, value |
      value.sanitize_entries!
      value.entries.each do | e |
        entries << e
      end
    end  
    sort_by_publish_date(entries)
  end

  def sort_by_publish_date(entries)
   entries.sort{ |a,b| b.published.to_i <=> a.published.to_i }
  end

end

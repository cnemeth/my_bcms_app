class TwitterFeedsPortlet < Portlet

  # Mark this as 'true' to allow the portlet's template to be editable via the CMS admin UI.
  enable_template_editor false
     
  def render
    # Your Code Goes Here
    respond_to do |format|
      format.html { render "app/views/portlets/twitter_feeds/render.html.erb" }
    end
  end
    
end

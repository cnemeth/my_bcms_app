# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Bcmsheroku::Application.initialize!

# Congigure smtp connection
config.action_mailer.delivery_method = :smtp

# Configure ActionMaler
ActionMailer::Base.smtp_settings = {
 :address =>        "smtp.mse23.exchange.ms",
 :port =>           25,
 :domain =>         "hedgeye.com",
 :authentication => :login,
 :user_name =>      "cruisecontrol",
 :password =>       "theedge!23"
}

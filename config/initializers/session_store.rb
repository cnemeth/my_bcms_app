# Be sure to restart your server when you modify this file.

# Try commenting this out
Bcmsheroku::Application.config.session_store :cookie_store, :key => '_bcmsheroku_session'

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rails generate session_migration")
# Bcmsheroku::Application.config.session_store :active_record_store

# Session cache
ActionController::Base.session = { 
  :namespace   => '_dalli-rails2_session', 
  :secret => 'zVf235OHcyvjtMcxImSeO8S4JmIpR67CDXPcoj1L' 
} 

# require 'action_controller/session/dalli_store' 
ActionController::Base.session_store = :dalli_store 

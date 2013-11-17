require 'capybara/cucumber'
require 'selenium-webdriver'

# load configuration
require File.dirname(__FILE__) + '/lib/configuration';
Configuration.base_folder = File.dirname(__FILE__) + "/../../config/"
Configuration.load('common')
Configuration.load('env/' + ENV['ENVIRONMENT']) if ENV['ENVIRONMENT']
Configuration.load('browser/' + ENV['BROWSER']) if ENV['BROWSER']
Configuration.load(ENV['SETTINGS']) if ENV['SETTINGS']

Capybara.configure do |config|
  browser_symbol = Configuration.browser.to_sym
  config.default_driver = browser_symbol
  puts "Browser: " + Configuration.browser
  config.app_host = Configuration.base_url
  puts "BaseUrl: " + Configuration.base_url
  config.javascript_driver = browser_symbol
  config.run_server = false
  config.default_selector = :css
  config.default_wait_time = 30
end

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.register_driver :firefox do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new
  profile.assume_untrusted_certificate_issuer = false
  profile.native_events = false
  Capybara::Selenium::Driver.new(app, :profile => profile)
end


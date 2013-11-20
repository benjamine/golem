require 'headless'
require 'fileutils'

Before do
  if ENV['HEADLESS'] == 'true'
    # Use global to track & avoid registering Headless#destroy multiple times
    $has_started_headless ||= (
      headless = Headless.new
      headless.start
      at_exit{ headless.destroy }
      true
    )
  end
end

After do |scenario|
  save_failure_screenshot(scenario) if scenario.failed?
end

#  Takes a screenshot of the current state of the page if the scenario failed.
def save_failure_screenshot(scenario)
  name = "FAILED_#{scenario.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')}"
  save_page_screenshot name
end

def save_page_screenshot(name)
  screenshot_dir = "screenshots/"
  FileUtils.mkdir_p screenshot_dir unless File.directory? screenshot_dir
  filename = "#{screenshot_dir}/#{name}.png"
  save_screenshot(filename)
  # embed in cucumber HTML report
  embed filename, 'image/png'
end
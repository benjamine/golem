
Given(/^I visit Golem github page$/) do
  visit('/benjamine/golem')
end

Then(/^I see Golem Description$/) do
  page.has_content?('automatically provisioned virtual machine for headless web automation')
end

Then(/^I see Requirements$/) do
  page.has_content?('Requirements')
end

Then(/^I see Usage$/) do
  page.has_content?('Usage')
end

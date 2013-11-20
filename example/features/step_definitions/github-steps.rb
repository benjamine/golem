
Given(/^I visit Golem github page$/) do
  visit '/benjamine/golem'
end

Then(/^I see Golem Description$/) do
  page.should have_content 'automatically provisioned virtual machine for headless web automation'
end

Then(/^I see Requirements$/) do
  page.should have_content 'Requirements'
end

Then(/^I see Usage$/) do
  page.should have_content 'Usage'
end

When(/^I click on LICENSE$/) do
  click_link 'LICENSE'
end

Then(/^I see MIT license$/) do
  page.should have_content 'MIT license'
  page.should have_content 'Permission is hereby granted, free of charge, to any person '
end


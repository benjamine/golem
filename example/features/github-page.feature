
Feature: Project Github Page
  In Order to find Golem info
  As a web automation engineer
  I want a github page of the project

  Scenario: Find Golem basic info
    Given I visit Golem github page
    Then I see Golem Description
    And I see Requirements
    And I see Usage


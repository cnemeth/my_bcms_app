Feature: Blog Aggregation Description

  In order to display blog feeds of memebers of the engineering group
  As a developer
  I want to aggregate their blog feeds

  Scenario: Successful aggregation
    Given an array of blog feeds
    When I make a call to the Feedzirra gem fetch and parse method
    Then I should have the entries contained in the blog feeds

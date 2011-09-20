Feature: Blog Aggregation Description

  In order to display blog feeds of members of the engineering group
  As a developer
  I want to aggregate their blog feeds

  Scenario: Successful aggregation
    Given an array of feed urls
    When I make a call to the BlogFeedsPortlet.render method
    Then I should have the blog feeds contained in entries
    And I should see the interleaved entries of the feeds displayed in reverse chronological order

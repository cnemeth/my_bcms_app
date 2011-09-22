Feature: Blog Aggregation Description

  In order to display blog feeds of members of the engineering group
  As an editor 
  I want to aggregate their blog feeds

  Scenario: Blog aggregation
    Given a collection of blog feeds
    When I go to the listing of blog entries
    Then I should see the aggregated blog entries 

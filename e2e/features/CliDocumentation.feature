@cliDocumentation @test
Feature: CLI Documentation
  As a user
  I want the ability to navigate to the offical CLI Documentation
  So that I can become a better developer

  Scenario: Access CLI Documentation via my website
    Given I navigate to "CLI Documentation"
    Then I should be on the angular wiki page

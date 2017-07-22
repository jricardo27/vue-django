Feature: Check the app works.


    Scenario: Render the home page.
        When I visit site page "/"
        Then I should see "Welcome to your Django - Vue.js app!"

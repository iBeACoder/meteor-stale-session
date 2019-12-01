// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by stale-session.js.
import { name as packageName } from "meteor/punit:stale-session";

// Write your tests here!
// Here is an example.
Tinytest.add('stale-session - example', function (test) {
  test.equal(packageName, "stale-session");
});

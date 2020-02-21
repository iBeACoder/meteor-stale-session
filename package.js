Package.describe({
  name: 'punit:stale-session',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Handles stale session timeout in meteor.js',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/iBeACoder/meteor-stale-session.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.8.2');
  api.use('ecmascript');
  api.use('accounts-base', ['client', 'server']);
  api.use('jquery', 'client');
  api.mainModule('stale-session-client.js', 'client');
  api.mainModule('stale-session-server.js', 'server');
});

// Package.onTest(function (api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('punit:stale-session');
//   api.mainModule('stale-session-tests.js');
// });

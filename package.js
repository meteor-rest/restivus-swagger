Package.describe({
  name: 'apinf:restivus-swagger',
  version: '0.2.1',
  // Brief, one-line summary of the package.
  summary: 'Generate Swagger doc for API',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/apinf/restivus-swagger',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "url-parse": "1.0.5"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript','underscore','nimble:restivus@0.8.7']);
  api.addFiles('server/restivus-swagger.js', ['server']);
});

Package.onTest(function(api) {
  api.use(['ecmascript','underscore','nimble:restivus@0.8.7']);
  api.use('apinf:restivus-swagger');
  api.use('tinytest');
  api.addFiles('test.js');
});

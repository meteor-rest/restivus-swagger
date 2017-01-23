Package.describe({
  name: 'jykae:restivus-swagger',
  version: '0.2.2',
  summary: 'Generate Swagger doc for API',
  git: 'https://github.com/jykae/restivus-swagger',
  documentation: 'README.md'
});

Npm.depends({
  "url-parse": "1.0.5"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript','underscore','jykae:restivus@0.8.12']);
  api.addFiles('server/restivus-swagger.js', ['server']);
});

Package.onTest(function(api) {
  api.use(['ecmascript','underscore','jykae:restivus@0.8.12']);
  api.use('jykae:restivus-swagger');
  api.use('tinytest');
  api.addFiles('test.js');
});

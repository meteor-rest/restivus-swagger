Package.describe({
  name: 'ajkwak:restivus-swagger',
  version: '0.2.5',
  summary: 'Generate Swagger doc for API',
  git: 'https://github.com/alfredjkwak/restivus-swagger',
  documentation: 'README.md'
});

Npm.depends({
  "url-parse": "1.1.7"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript','underscore','ajkwak:restivus']);
  api.addFiles('server/restivus-swagger.js', ['server']);
});

Package.onTest(function(api) {
  api.use(['ecmascript','underscore','ajkwak:restivus']);
  api.use('ajkwak:restivus-swagger');
  api.use('tinytest');
  api.addFiles('test.js');
});

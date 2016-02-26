Package.describe({
  name: 'selaias:oauth-mollie',
  version: '0.2.0',
  summary: 'An implementation of the Mollie OAuth flow.',
  git: 'https://github.com/selaias/oauth-mollie.git',
  documentation: 'README.md'
});

Npm.depends({'request': "2.53.0"});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([
    'oauth2',
    'oauth',
    'service-configuration',
    'ecmascript',
    'underscore'
  ], ['client', 'server']);

  api.use(['http', 'selaias:meteor-mollie@0.1.0'], ['server']);

  api.use(['templating', 'random'], 'client');

  api.export('Mollie');

  api.addFiles(['mollie_configure.html', 'mollie_configure.js'], 'client');
  api.addFiles('mollie_server.js', 'server');
  api.addFiles('mollie_client.js', 'client');

});

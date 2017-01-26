// Extension to Restivus
// Parse URL
const ParsedURL = Npm.require('url-parse');
const URL = new ParsedURL(Meteor.absoluteUrl());

// Add swagger route and generate valid swagger.json
Restivus.prototype.addSwagger = function(swaggerPath) {
  // Set constants
  const restivus = this;
  const config = restivus._config;
  const swagger = restivus.swagger;

  // Call add Route
  restivus.addRoute(swaggerPath, {authRequired: false}, {
    get: function () {
      // Check if swagger configuration exists
      if(swagger === undefined ||
        swagger.meta === undefined) {
          return {"error": "Swagger configuration not given for Restivus."};
        }
      else {

        // Initialize swagger.json documentation object
        let doc = {};

        // Add main meta from config
        _.extend(doc, swagger.meta);

        // If host, basePath and schemes are not given in meta, autodetect
        if( !('host' in swagger.meta) &&
        !('basePath' in swagger.meta) &&
        !('schemes' in swagger.meta)) {
          // Get host info
          const url = {
            "host": URL.host,
            "basePath": ('/'+config.apiPath).slice(0,-1),
            "schemes": [URL.protocol.slice(0, -1)]
          }
          _.extend(doc, url);
        }

        // Add securityDefinitions for default authentication
        if(config.useDefaultAuth) {
          const security = {
            securityDefinitions: {
              userId: {
                type: 'apiKey',
                name: 'X-User-Id',
                in: 'header',
              },
              authToken: {
                type: 'apiKey',
                name: 'X-Auth-Token',
                in: 'header',
              },
            }
          }
          _.extend(doc, security);
        }

        // Loop through all routes
        let paths = {};
        _.each(restivus._routes, function(route) {
          // Exclude swagger and possible users paths
          if(route.path !== swaggerPath &&
            !route.path.includes('users') )
          {
            // Modify path parameter to swagger spec style
            // Replaces :param with {param}
            const newPath = route.path.replace(/:(\w+)/g, '{$1}');
            // Use path as key
            const key = '/'.concat(newPath);

            // Array of endpoint keys
            const routeEndpoints = _.keys(route.endpoints);

            // Exclude options from routeEndpoints array
            const endpoints = _.without(routeEndpoints, 'options');

            // Init currentPath
            paths[key] = {};
            let currentPath = paths[key];

            // Loop through endpoints
            _.each(endpoints, function(endpoint) {
              let currentEndpoint = route.endpoints[endpoint];

              // Add user-defined swagger metadata for endpoint if exists
              if(currentEndpoint.swagger !== undefined) {
                currentPath[endpoint] = currentEndpoint.swagger;
              // Add swagger metadata for default authentication endpoints
              } else if(config.useDefaultAuth) {
                const authTag = 'Authentication'
                if(route.path === 'login') {
                  currentPath[endpoint] = {
                    tags: [
                      authTag,
                    ],
                    description: 'Login',
                    parameters: [
                      {
                        name: 'authentication',
                        in: 'body',
                        description: 'User credentials',
                        required: true,
                        schema: {
                          $ref: '#/definitions/Authentication',
                        },
                      },
                    ],
                    responses: {
                      200: {
                        description: 'Successful login',
                      },
                      401: {
                        description: 'Unauthorized',
                      },
                    },
                  }
                } else if(route.path === 'logout' && endpoint === 'post') {
                  currentPath[endpoint] = {
                    tags: [
                      authTag,
                    ],
                    description: 'Logout',
                    responses: {
                      200: {
                        description: 'Successful logout',
                      },
                      401: {
                        description: 'Unauthorized',
                      },
                    },
                  }
                }
              }
            });
          }
        });

        // Add paths to Swagger doc
        doc.paths = paths;

        // Init definitions object
        let definitions = {};
        // Default authentication object definition
        if(config.useDefaultAuth) {
          _.extend(definitions, {
            Authentication: {
              type: 'object',
              required: [
                'username',
                'password',
              ],
              properties: {
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                }
              }
            },
          });
        }
        // Check if user-defined definitions
        if(swagger.definitions !== undefined) {
          _.extend(definitions, swagger.definitions);
        }
        // Attach all definitions to Swagger doc
        doc.definitions = definitions;

        // Return swagger.json
        return doc;
      }
    }
  });
};

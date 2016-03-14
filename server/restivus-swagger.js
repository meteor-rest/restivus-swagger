// Extension to Restivus

// Add swagger route and generate valid swagger.json
Restivus.prototype.addSwagger = function(path) {
  // Call add Route
  const restivus = this;
  const config = restivus._config;
  restivus.addRoute(path, {authRequired: false}, {
    get: function () {
      // Check if swagger meta configuration exists
      if(config.swagger) {
        // Initialize doc object
        let doc = {};
        // Add main meta from config
        _.extend(doc, config.swagger);

        // Loop through all routes
        let paths = {};
        _.each(restivus._routes, function(route) {
          // Exclude swagger and login paths
          if(route.path !== path &&
            route.path !== 'login' && route.path !== 'logout' )
          {
            // Use path as key
            let key = '/'.concat(route.path);

            // Exclude options from endpoints array
            let endpoints = _.without(_.keys(route.endpoints), 'options');

            // Init currentPath
            paths[key] = {};
            let currentPath = paths[key];

            // Loop through endpoints
            _.each(endpoints, function(endpoint) {
              let currentEndpoint = route.endpoints[endpoint];

              // Check that swagger metadata exists in endpoint config
              if(currentEndpoint.swagger) {
                currentPath[endpoint] = {
                  description: currentEndpoint.swagger.description,
                  responses: currentEndpoint.swagger.responses
                };
              } else {
                // Otherwise set undefined
                currentPath[endpoint] = {
                  description: "undefined",
                  responses: "undefined"
                };
              }
            });
          }
        });

        // Add paths to Swagger doc
        _.extend(doc, {"paths": paths});
        // Return swagger.json
        return doc;

      } else {
        // Error handling
        return {"error": "Swagger metadata not given in Restivus config."};
      }
    }
  });
};

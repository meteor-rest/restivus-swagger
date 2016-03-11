// Extension to Restivus prototype
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
        let paths = [];
        _.each(restivus._routes, function(route) {
          //console.log(route.path);
          //console.log(route.endpoints);

          // TODO: Format to swagger style
          paths.push(route.path);
        });
        _.extend(doc, {"paths": paths});

        return doc;
      } else {
        // Error handling
        return {"error": "Swagger not configured properly."};
      }
    }
  });
};

/* Main meta
{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Swagger API Team"
    },
    "license": {
      "name": "MIT"
    }
  },
  // Generate automatically from Restivus fields and domain server info
  "host": "petstore.swagger.io",
  "basePath": "/api",
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],

  */

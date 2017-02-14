## Keep development going on
<img src="http://oi68.tinypic.com/uro76.jpg" width="20%">

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/vjyrkka)

## Restivus Swagger plugin

Generate swagger.json for your Restivus API

Restivus: https://github.com/meteor-rest/restivus

Swagger: http://swagger.io/specification/

## How to use

Step 1: Install package

```meteor add mrest:restivus-swagger```

Step 2: Define and attach swagger object to Restivus

```js
APIV1 = new Restivus({
  ...
})

// Attach Restivus Swagger configuration
// - meta, definitions, params, tags
APIV1.swagger = {
  meta: {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "My API",
      description: "My REST API",
      termsOfService: "https://example.com/terms/",
      contact: {
        name: "Example team"
      },
      license: {
        name: "MIT"
      }
    }
  },
  definitions: {
    // Schema definitions for $refs, check spec http://swagger.io/specification/
    // Required for body parameters
  },
  params: {
    // Parameter object definitions to be used in endpoint configurations
    // Path and body parameter types supported in v0.2.0 
    petId: {
      name: "id",
      in: "path",
      description: "Pet ID",
      required: true,
      type: "string"
    }
  },
  tags: {
    // Swagger UI tag variables to be used in endpoint grouping
    pet: "Pets"
    ...
  }
}
```

Step 3: For each endpoint define swagger metadata in swagger attribute, check spec http://swagger.io/specification/

```js
endpoints: {
    get: {
      swagger: {
        tags: [
          APIV1.swagger.tags.pet
        ],
        description: "Returns a pet with ID",
        parameters: [
          APIV1.swagger.params.petId
        ],
        responses: {
          "200": {
            description: "Successful pets list"
          }
        }
      }
    }
```

Step 4: Define route for Swagger

```js
// Generates swagger.json to /api/v1/swagger.json
APIV1.addSwagger('swagger.json');
```

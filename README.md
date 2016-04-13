## Restivus Swagger plugin

Generate swagger.json for your Restivus API

## How to use

Step 1: Define and attach swagger object to Restivus

```
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

Step 2: For each endpoint define swagger metadata in swagger attribute, check spec http://swagger.io/specification/

```
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

Step 3: Define route for Swagger

```
// Generates swagger.json to /api/v1/swagger.json
APIV1.addSwagger('swagger.json');
```

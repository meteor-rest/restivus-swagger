## Restivus Swagger plugin

Currently supports only minimum required fields to provide valid Swagger 2.0

### How to use

Step 1: Give swagger main metadata (swagger & info are required) in swagger attribute for Restivus config object.

```
APIV1 = new Restivus({
  apiPath: 'api/',
  version: 'v1',
  defaultHeaders: {
    'Content-Type': 'application/json'
  },
  useDefaultAuth: true,
  prettyJson: true,
  enableCors: true,
  swagger: {
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
  }
```

Step 2: For each endpoint define swagger metadata in swagger attribute (supports "description", "responses", "tags")

```
endpoints: {
    get: {
      swagger: {
        tags: [
          "My endpoint"
        ]
        description: "Describe your endpoint here",
        responses: {
          "200": {
            description: "Describe response"
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

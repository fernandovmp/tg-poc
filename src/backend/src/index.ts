import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();

const openApiDocs = YAML.load(
    path.resolve(__dirname, './wwwroot/docs/openapi.yaml')
);
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocs));

app.listen(3030);

import YAML from 'yamljs';
import express from 'express';
import path from 'path';
import redoc from 'redoc-express';
import swaggerUi from 'swagger-ui-express';

const app = express();

const openApiPath = path.resolve(__dirname, './wwwroot/docs/openapi.yaml');
const openApiUri = '/docs/openapi.yaml';
const openApiDocs = YAML.load(openApiPath);

app.get(openApiUri, (req, res) => {
    res.sendFile(openApiPath);
});
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocs));
app.use(
    '/docs/redoc',
    redoc({
        specUrl: openApiUri,
        title: 'API Docs',
    })
);

app.listen(3030);

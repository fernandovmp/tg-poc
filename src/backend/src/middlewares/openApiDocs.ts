import { Express } from 'express';
import YAML from 'yamljs';
import path from 'path';
import redoc from 'redoc-express';
import swaggerUi from 'swagger-ui-express';

export function useOpenApiDocs(app: Express) {
    const openApiPath = path.resolve(__dirname, '../wwwroot/docs/openapi.yaml');
    const openApiUri = '/docs/openapi.yaml';
    const openApiDocs = YAML.load(openApiPath);

    app.get(openApiUri, (_, res) => {
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
    return app;
}

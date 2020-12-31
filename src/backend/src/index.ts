import 'reflect-metadata';

import express, { json } from 'express';

import { useOpenApiDocs } from './middlewares/openApiDocs';
import { useRoutingController } from './setup/useRoutingController';
import { useTypeOrm } from './setup/useTypeOrm';

const app = express();
app.use(json());
useOpenApiDocs(app);

useTypeOrm();
useRoutingController(app);

app.listen(3030);

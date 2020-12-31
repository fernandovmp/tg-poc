import dotnev from 'dotenv';
dotnev.config();

const config = process.env;

export default {
    port: config.PORT ?? 3030,
    ormType: config.ORM_TYPE,
    ormHost: config.ORM_HOST,
    ormPort: config.ORM_PORT,
    ormUsername: config.ORM_USERNAME,
    ormPassword: config.ORM_PASSWORD,
    ormDatabase: config.ORM_DATABASE,
};

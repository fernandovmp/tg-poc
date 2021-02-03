import dotnev from 'dotenv';
dotnev.config();

const config = process.env;

export default {
    port: config.PORT ?? 3030,
};

import dotenv from 'dotenv';

dotenv.config();

export default {
    server: {
        hostname: process.env.SERVER_HOSTNAME || 'localhost',
        port: process.env.SERVER_PORT || 3000
    },
    authorizedOrigin: process.env.AUTHORIZED_ORIGIN || '*'
};

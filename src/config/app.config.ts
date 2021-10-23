const appConfig = {
    port: +process.env.BACKEND_PORT || 3000,
    host: process.env.BACKEND_HOST || '0.0.0.0',
};

export default appConfig;

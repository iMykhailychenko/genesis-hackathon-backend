const authConfig = {
    accessKey: process.env.AUTH_SECRET_KEY || 'genesis',
    saltRounds: +process.env.AUTH_SALT_ROUNDS || 5,
};

export default authConfig;

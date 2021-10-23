const authConfig = {
    accessKey: process.env.AUTH_SECRET_KEY,
    saltRounds: +process.env.AUTH_SALT_ROUNDS,
};

export default authConfig;

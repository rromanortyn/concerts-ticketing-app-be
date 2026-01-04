const envKeys = {
  database: {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    username: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD',
    name: 'DATABASE_NAME',
    hostOutside: 'DATABASE_HOST_OUTER',
    portOutside: 'DATABASE_PORT_OUTER',
  },
  auth: {
    password: {
      secret: 'PASSWORD_SECRET',
    },
  },
  jwt: {
    access: {
      secret: 'ACCESS_TOKEN_SECRET',
      expiresIn: 'ACCESS_TOKEN_EXPIRES_IN',
    },
  },
}

export default envKeys

const config = {
  port: 4000,
  jwt_secret_key: 'khai',
  jwt_expire_access_token: 10, // 10 second
  jwt_expire_refresh_token: 30, //30 second
  initialDatabase: {
    access_tokens: [],
    refresh_tokens: [],
    users: [
      {
        username: 'admin',
        password: 'admin'
      }
    ],
    products: [
      {
        id: 1,
        name: 'Iphone'
      },
      {
        id: 2,
        name: 'Samsung'
      }
    ]
  }
}
export default config

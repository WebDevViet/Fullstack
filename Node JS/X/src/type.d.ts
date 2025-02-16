declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string

      BASE_URL: string
      PORT: string

      DEFAULT_SECRET_KEY: string

      ACCESS_TOKEN_SECRET_KEY: string
      ACCESS_TOKEN_EXPIRES_IN: string

      REFRESH_TOKEN_SECRET_KEY: string
      REFRESH_TOKEN_EXPIRES_IN: string

      IRON_SECRET_KEY: string

      EMAIL_VERIFICATION_TOKEN_SECRET_KEY: string
      EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: string

      FORGOT_PASSWORD_TOKEN_SECRET_KEY: string
      FORGOT_PASSWORD_TOKEN_EXPIRES_IN: string

      MONGO_DATABASE: string
      MONGO_HOST: string
      MONGO_USER: string
      MONGO_PASSWORD: string

      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GOOGLE_REDIRECT_URI: string

      CLIENT_OAUTH_LOGIN_URL: string
    }
  }
}

export {}

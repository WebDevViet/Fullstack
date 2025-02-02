export const bearerTokenRegex = /^Bearer [A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/

export const jwtRegex = /[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/

export const usernameRegex = /^(?!^\d+$)[A-Za-z0-9_]{4,15}$/

export const passwordRegex = /(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/

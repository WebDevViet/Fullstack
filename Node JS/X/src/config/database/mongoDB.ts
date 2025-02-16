/* eslint-disable no-console */
import chalk from 'chalk'
import { Collection, Db, MongoClient } from 'mongodb'
import RefreshToken from '~/api/auth/schemas/refreshTokenSchemas.ts'
import Follower from '~/api/users/schemas/followersSchemas.ts'
import User from '~/api/users/schemas/usersSchemas.ts'
const uri = 'mongodb://root:123456@localhost:27018/'

class MongoDB {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.MONGO_DATABASE)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })

      const refresh_tokens = this.db.collection('refresh_tokens') // Tạo TTL index cho trường expiresAt
      await refresh_tokens.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 })

      console.log(chalk.greenBright('Connected to MongoDB'))
    } catch (error) {
      console.log(chalk.redBright(`Error connecting to MongoDB`))
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection('refresh_tokens')
  }

  get followers(): Collection<Follower> {
    return this.db.collection('followers')
  }
}

export default new MongoDB()

import mongoose from 'mongoose'

export const configJWT = {
  JWT_EXP_ACCESS_TOKEN: 2, // 10 second
  JWT_EXP_REFRESH_TOKEN: 5, //30 second,
  audience: 'https://example.com', // FE
  issuer: 'https://auth.example.com' // BE
}

export const connectionMongo = async () => {
  mongoose.connection.on('connected', () => console.log('connected'))
  mongoose.connection.on('open', () => console.log('open'))
  mongoose.connection.on('disconnected', () => console.log('disconnected'))
  mongoose.connection.on('reconnected', () => console.log('reconnected'))
  mongoose.connection.on('disconnecting', () => console.log('disconnecting'))
  mongoose.connection.on('close', () => console.log('close'))
  await mongoose.connect(process.env.MONGO_HOST, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DATABASE,
    maxPoolSize: 50, // Số lượng kết nối tối đa trong pool
    minPoolSize: 10, // Số lượng kết nối tối thiểu trong pool
    serverSelectionTimeoutMS: 5000, // Thời gian chờ đợi để kết nối với server (ms)
    socketTimeoutMS: 45000, // Thời gian chờ đợi để nhận được phản hồi từ server sau khi gửi một yêu cầu (ms)
    family: 4 // Sử dụng IPv4
  })
}

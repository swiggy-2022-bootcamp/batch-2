import lodash from 'lodash'
const env = process.env.NODE_ENV || 'development'
import dev from './dev.js'

const baseConfig = {
    env,
    isDev: env === 'development',
    port: 4000,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '7d'
    }
}

let envConfig = dev

console.log('[' + new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) + '] ', lodash.merge(baseConfig, envConfig))

export default lodash.merge(baseConfig, envConfig);

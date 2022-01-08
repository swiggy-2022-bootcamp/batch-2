import lodash from 'lodash'
const env = process.env.NODE_ENV || 'development'
import dev from './dev.js'
import test from './testing.js'

const baseConfig = {
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    port: 3000,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '100d'
    }
}

let envConfig = {}

switch(env){
    case 'dev':
    case 'development':
        envConfig = dev
        break
    case 'test':
    case 'testing':
        envConfig = test
        break
    default:
        envConfig = dev
}


export default lodash.merge(baseConfig, envConfig);
import 'dotenv/config'
import env from 'env-var'

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(), 
    NODE_ENV: env.get('NODE_ENV').required().asString()
}
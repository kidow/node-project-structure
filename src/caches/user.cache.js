const redis = require('redis')
const bluebird = require('bluebird')
import UserRepo from '../repositories/user.repository'

const client = redis.createClient()
client.on('error', e => {
  console.error(`redis error : ${e}`)
})

bluebird.promisifyAll(client)

class UserCache {
  async store(user) {
    try {
      await this.client.hsetAsync('users:id', [user.id, user.uuid])
      await this.client.hsetAsync('users:email', [user.email, user.uuid])
      await this.client.hsetAsync('users:uuid', [
        user.uuid,
        JSON.stringify(user.toJSON())
      ])
    } catch (e) {
      // error 로깅
    }
  }

  async find(uuid) {
    if (uuid) {
      try {
        return client.hgetAsync('users:uuid', uuid)
      } catch (e) {
        // error 로깅
        return null
      }
    }
  }

  async findById(id) {
    if (id) {
      try {
        const uuid = await this.client.hgetAsync('users:id', id)
        return this.find(uuid)
      } catch (e) {
        // error 로깅
        return null
      }
    }
    return null
  }

  async findByEmail(email) {
    if (email) {
      try {
        const uuid = await client.hgetAsync('users:email', email)
        return this.find(uuid)
      } catch (e) {
        // error 로깅
        return null
      }
    }
  }
}

export default UserCache

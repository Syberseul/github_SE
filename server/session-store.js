function getRedisSessionId(sessionId) {
  return `session id: ${sessionId}`;
}

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }

  //get session from Redis
  async get(sessionId) {
    console.log("get session", sessionId);
    const id = getRedisSessionId(sessionId);
    const data = await this.client.get(id);
    if (!data) return null;
    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  //set session to Redis
  async set(sessionId, session, ttl) {
    console.log("set session", sessionId);
    const id = getRedisSessionId(sessionId);
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessionStr = JSON.stringify(session);
      if (ttl) {
        await this.client.setex(id, ttl, sessionStr);
      } else {
        await this.client.set(id, sessionStr);
      }
    } catch (err) {
      console.error(err);
    }
  }
  //remove session from Redis
  async destroy(sessionId) {
    console.log("destroy session", sessionId);
    const id = getRedisSessionId(sessionId);
    await this.client.del(id);
  }
}

module.exports = RedisSessionStore;

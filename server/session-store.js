function getRedisSessionId(sessionId) {
  return `session id: ${sessionId}`;
}

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }

  //get session from Redis
  async get(sessionId) {}
  //set session to Redis
  async set(sessionId, session, ttl) {}
  //remove session from Redis
  async destroy(sessionId) {}
}

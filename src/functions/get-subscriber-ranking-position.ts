import { redis } from "../redis/client"

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPositions({
  subscriberId
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:access-count', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
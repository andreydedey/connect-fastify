import { redis } from "../redis/client"

interface GetSubscriberInviteClickParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId
}: GetSubscriberInviteClickParams) {
  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
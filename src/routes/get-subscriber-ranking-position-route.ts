import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInviteCount } from '../functions/get_subscriber-invites-count'
import { getSubscriberRankingPositions } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/subscribers/:subscriberId/ranking/position',
        {
            // Documentação
            schema: {
                summary: 'Get subscriber ranking position',
                tags: ['referral'],
                params: z.object({
                    subscriberId: z.string(),
                }),
                response: {
                    200: z.object({
                        position: z.number().nullable(),
                    }),
                },
            },
        },
        async (request) => {
            const { subscriberId } = request.params

            const { position } = await getSubscriberRankingPositions({ subscriberId })

            return { position }
        }
    )
}
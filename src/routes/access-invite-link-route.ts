import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { object, z } from 'zod'
import { accessInviteLink } from '../functions/access-invite-link'
import { env } from '../env'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/invites/:subscriberId',
        {
            // body (trás as informações do recurso), searh params (filtros, paginação ?tamanho=G&cor=azul), route params (idenfificação de recurso) users/1

            // Documentação
            schema: {
                summary: 'Access invite link and redirects user',
                tags: ['referral'],
                params: z.object({
                    subscriberId: z.string(),
                }),
                response: {
                    302: z.null(),
                },
            },
        },
        async (request, response) => {
            const { subscriberId } = request.params

            // Criação de hashe no redis
            accessInviteLink({ subscriberId })

            const redirectUrl = new URL(env.WEB_URL)

            redirectUrl.searchParams.set('referrer', subscriberId)

            return response.redirect(redirectUrl.toString(), 302)
        }
    )
}
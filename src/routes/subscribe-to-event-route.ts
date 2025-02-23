import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { object, z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe_to_event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      // body (trás as informações do recurso), searh params (filtros, paginação ?tamanho=G&cor=azul), route params (idenfificação de recurso) users/1

      // Documentação
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, response) => {
      const { name, email, referrer } = request.body

      // Criação de inscrição no banco de dados
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer
      })

      return response.status(201).send({
        subscriberId
      })
    }
  )
}


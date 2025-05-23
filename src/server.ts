import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getRankingRoute } from './routes/get-ranking-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'nlw connect',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// routes
app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getRankingRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`🚀 Documentation http://localhost:${env.PORT}/docs`)
})

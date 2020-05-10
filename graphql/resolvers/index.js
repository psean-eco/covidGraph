
import { MQTTPubSub } from 'graphql-mqtt-subscriptions'
import { connect } from 'mqtt'
import {countryDataSubscriptionResolver} from './countryDataSubscriptionResolver'
import {countryStatsResolver} from './countryStatsResolver'
//not secrets
const clientConnObj = {
  username: 'covid-public-client',
  password: 'covid19',
  reconnectPeriod: 1000,
}
const client = connect('tcp://mr2r9za6fwi0wf.messaging.solace.cloud:1883', clientConnObj)
const RAW_DATA_TOPIC = 'jhu/csse/covid19/raw'

const pubsub = new MQTTPubSub({
  client,
})

export const resolvers = {
  Query: {
    countryStats: countryStatsResolver,
  },
  Subscription: {
    countryDataSubscription: {
      resolve:countryDataSubscriptionResolver,
      subscribe: (_, args) => pubsub.asyncIterator(RAW_DATA_TOPIC),
    },
  },
}

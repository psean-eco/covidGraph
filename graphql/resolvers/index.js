import { MQTTPubSub } from 'graphql-mqtt-subscriptions'
import { connect } from 'mqtt'

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
    countryStats: obj => {
      return obj
    },
  },
  Subscription: {
    countryDataSubscription: {
      resolve: payload => {
        if (payload.features) {
          const result = payload.features.map(item => {
            return {
              country: `${item.attributes.Country_Region}`,
              confirmedDeaths: `${item.attributes.Deaths}`,
              confirmedCases: `${item.attributes.Confirmed}`,
              recovered: `${item.attributes.Recovered}`,
            }
          })
          return result
        }
        return []
      },
      subscribe: (_, args) => pubsub.asyncIterator(RAW_DATA_TOPIC),
    },
  },
}

import {MQTTPubSub} from 'graphql-mqtt-subscriptions'
import {connect} from 'mqtt'

const clientConnObj = {
  username:'covid-public-client',
  password: 'covid19',
  reconnectPeriod: 1000,
}
const client = connect('tcp://mr2r9za6fwi0wf.messaging.solace.cloud:1883',clientConnObj)

const pubsub = new MQTTPubSub({
    client
});

export const resolvers = {
    Query: {
        covid: () => {
            return 'hello';
        }
    },
    Subscription: {
        subscribe2covid: {
            resolve: (payload) => {
                console.log(payload)
                return {}
            },
            subscribe: (_, args) => pubsub.asyncIterator(['jhu/csse/covid19/raw'])
        }
    }
}
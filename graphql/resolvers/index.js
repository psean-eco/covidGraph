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
        },
        countryStats: (obj) =>{
            return obj
        }

    },
    Subscription: {
        subscribe2covid: {
            resolve: (payload) => {
                if (payload.features){

                   const result = payload.features.slice(0,20).map((item)=>{
                        return {
                            country: `${item.attributes.Country_Region}`,
                            confirmedDeaths: `${item.attributes.Deaths}`,
                            confirmedCases:`${item.attributes.Confirmed}`,
                            recovered:`${item.attributes.Recovered}`

                       }
                    })
                    console.log('This is the result ',result)    
                    return result
                }
                return []
            },
            subscribe: (_, args) => pubsub.asyncIterator('jhu/csse/covid19/raw')
        }
    }
}
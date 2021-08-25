import { createApp, provide, h} from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import './index.css'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://btv-poc.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': import.meta.env.VITE_HASURA_SECRET
  }
})

createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
}).mount('#app')

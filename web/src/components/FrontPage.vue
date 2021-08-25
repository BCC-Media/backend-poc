<template>
  <div>
    <h1 class="text-2xl">BrunstadTV</h1>
    <div class="mt-2">
      <div v-if="!loading">
        <h2>Newest episodes</h2>
        <div class="flex -mx-2">
          <a href="#" class="mx-2 hover:text-gray-700" v-for="i in result.media" :key="i.id">
            <img class="h-auto w-48" src="https://brunstad.tv/static/images/placeholder.jpg"/>
            <span class="">{{ i.translated_fields[0].title }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'


defineProps({
  msg: String
})

const { result, loading } = useQuery(gql`
    query media {
      media {
        id
        type,
        translated_fields {
          title
        }
      }
    }
`)

</script>
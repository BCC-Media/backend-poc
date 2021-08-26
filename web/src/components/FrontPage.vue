<template>
  <div>
    <div class="mt-2">
      <div v-if="!mediaLoading && mediaResult != null">
        <h2>Newest episodes</h2>
        <div class="flex -mx-2">
          <a href="#" class="mx-2 hover:text-gray-700 shadow w-48 overflow-hidden" v-for="i in mediaResult.media" :key="i.id">
            <img class="h-auto" src="https://brunstad.tv/static/images/placeholder.jpg"/>
            <div class="p-4">
              <span class="">{{ i.translated_fields[0].title }}</span>
              <div v-html="i.translated_fields[0].description"/>
            </div>
          </a>
        </div>
      </div>
      <div v-if="!pageLoading && pageResult != null">
        <div v-for="(section, index) in pageResult.sections" :key="index">
          <h2>{{section.display_contract}}</h2>
          <div class="flex -mx-2" >
            <router-link
            :to="'/media/'+item.id"
            v-for="item in section.items"
            :key="item.id"
            class="mx-2 hover:text-gray-700 shadow w-48 overflow-hidden">
              <img class="h-auto" src="https://brunstad.tv/static/images/placeholder.jpg"/>
              <div class="p-4">
                <span class="">{{ item.translated_fields[0].title }}</span>
                <div v-html="item.translated_fields[0].description"/>
                <div v-html="item.video?.filename"/>
              </div>
            </router-link>
          </div>
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

const { result: mediaResult, loading: mediaLoading } = useQuery(gql`
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

const { result: pageResult, loading: pageLoading } = useQuery(gql`
    query page {
      sections:page_sections {
        display_contract
        items {
          id
          translated_fields {
            description
            longdescription
            title
          }
          video {
            filename
          }
        }
      }
    }
`)

</script>
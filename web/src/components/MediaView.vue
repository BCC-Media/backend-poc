<template>
  <div>
    <div>
        <a href="#" class="mx-2 hover:text-gray-700 shadow w-48 overflow-hidden">
            <div id="video"></div>
            <div class="p-4" v-if="media">
                <span class="">{{ media.translated_fields[0].title }}</span>
                <div v-html="media.translated_fields[0].description"/>
                <div v-html="media.video?.filename"/>
            </div>
        </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps, nextTick, onMounted, reactive, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useRoute } from 'vue-router'
import {  ref, computed } from 'vue'

defineProps({
  msg: String
})

const route = useRoute();

const { result: mediaResult, loading: mediaLoading, onResult } = useQuery(gql`
    query media {
      media:media_by_pk(id: ${route.params.id}){
        id
        type,
        translated_fields {
          title
        }
      }
    }
`)

const media = computed(() => mediaResult.value?.media)

onMounted(() => {
        
    onResult(() => {
        var player = window.player = createVideoJsPlayer('video', {
            src: {
                type: 'application/x-mpegURL',
                src: ''
            },
            subtitles: JSON.parse('[]'),
            videojs: {
                poster: 'https://brunstadtv.imgix.net/Avslutningsm_te-2-3.jpg',
                fluid: true
            },
            languagePreferenceDefaults: {
                subtitles: undefined,
                audio: "eng"
            }
        });
    })
});

</script>
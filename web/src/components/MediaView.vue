<template>
    <div>
        <div>
            <div id="video"></div>
            <div class="p-4" v-if="media">
                <span class="">{{ media.translated_fields[0].title }}</span>
                <div v-html="media.translated_fields[0].description" />
                <div v-html="media.video?.filename" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, nextTick, onMounted, reactive, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import amplitude from 'amplitude-js';
import posthog from 'posthog-js';

defineProps({
    msg: String,
});

const route = useRoute();

const {
    result: mediaResult,
    loading: mediaLoading,
    onResult,
} = useQuery(gql`
    query media {
      media:media_by_pk(id: ${route.params.id}){
        id
        type
        translated_fields {
          title
        }
        video_urls {
          type
          value
        }
      },
    }
`);

const media = computed(() => mediaResult.value?.media);

onMounted(() => {
    amplitude.getInstance().logEvent('media_play');
    posthog.capture('media_play', { media_id: route.params.id })
    onResult(() => {
        var video_url = media.value.video_urls[0];
        var player = (window.player = createVideoJsPlayer("video", {
            src: {
                type: video_url.type,
                src: video_url.value,
            },
            subtitles: JSON.parse("[]"),
            videojs: {
                poster: "https://brunstadtv.imgix.net/Avslutningsm_te-2-3.jpg",
                fluid: true,
            },
            languagePreferenceDefaults: {
                subtitles: undefined,
                audio: "eng",
            },
        }));
    });
});
</script>
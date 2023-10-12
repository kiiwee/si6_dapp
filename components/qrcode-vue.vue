<template>
    <qrcode-vue :value="value" :level="level" :render-as="renderAs" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue'

const value = ref('qrcode')
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
</script>
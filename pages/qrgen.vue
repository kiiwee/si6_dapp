<template>
    <div>
        <input v-model="qrtext" type="text" placeholder="Type here" class="input w-full max-w-xs" />

        <qrcode-vue :value="qrtext"></qrcode-vue>

    </div>
</template>

<script setup lang="ts">
const qrtext = ref('')

</script>

<style scoped></style>
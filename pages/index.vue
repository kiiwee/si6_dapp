<script setup lang="ts">
const route = useRoute()
const { data: itemJson } = await useFetch("https://bafybeifwrdj7ircxzaqkwzacdp3gkcamnhgawmflnyh7lccusd43niyvpu.ipfs.nftstorage.link/0000000000000000000000000000000000000000000000000000000000000001.json")
</script>

<template>
  <div>
    <NavBar />
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>

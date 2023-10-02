<template>
    <div>

        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h1 class="card-title">{{ itemJson.name }}</h1>
                <h2>{{ itemJson.description }}</h2>

                <h2 v-if="itemJson.size">Size: {{ itemJson.size }}</h2>
                <h2 v-if="itemJson.size_h">Size Height: {{ itemJson.size_h }}</h2>
                <h2 v-if="itemJson.size_w">Size Width: {{ itemJson.size_w }}</h2>
            </div>
            <figure><img src="/dummy.avif" alt="Shoes" /></figure>
        </div>
        {{ itemJson }}

    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: itemJson } = await useFetch("https://bafybeifwrdj7ircxzaqkwzacdp3gkcamnhgawmflnyh7lccusd43niyvpu.ipfs.nftstorage.link/000000000000000000000000000000000000000000000000000000000000000" + route.params.cid + ".json")

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.cid)
</script>

<style scoped></style>
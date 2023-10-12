<script setup lang="ts">
const route = useRoute()
const { data: itemJson } = await useFetch("https://bafybeifwrdj7ircxzaqkwzacdp3gkcamnhgawmflnyh7lccusd43niyvpu.ipfs.nftstorage.link/0000000000000000000000000000000000000000000000000000000000000001.json")
import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../stores/index'

const messageInput = ref(null as any)
const cryptoStore = useCryptoStore()
const { connectWallet } = useCryptoStore()
const { account } = storeToRefs(cryptoStore)
connectWallet()
</script>

<template>
  <div>

    <div class="flex flex-col items-center">
      <h1 class="text-5xl m-4">
        Landing Page
      </h1>
      <button v-if="!account" class="bg-green-300 rounded p-4" @click="connectWallet">
        Connect Wallet
      </button>
      <div v-if="account" class="mt-5">
        <button class="bg-yellow-300 rounded p-4 mt-10">
          {{ account }}
        </button>
      </div>
    </div>

  </div>
</template>

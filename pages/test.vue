
<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../stores/index'

const messageInput = ref(null as any)
const cryptoStore = useCryptoStore()
const { connectWallet, mint_token, getNFTs } = useCryptoStore()
getNFTs()

const { account, nfts, loading } = storeToRefs(cryptoStore)
connectWallet()
</script>
<template>
    <div class="flex flex-col items-center">
        <h1 class="text-5xl m-4">
            Customer Page
        </h1>
        <a class="bg-yellow-300 rounded p-4 mt-10">
            Your account Adress

        </a>
        <h2>{{ account }}</h2>
        <button v-if="!account" class="bg-green-300 rounded p-4" @click="connectWallet">
            Connect Wallet
        </button>
        <div class="mt-5 ">

            <button @click="mint_token(4, 100)" class="bg-yellow-300 m-5  rounded p-4 mt-10">
                mint token
            </button>
            <button @click="getNFTs()" class="bg-yellow-300 rounded m-5 p-4 mt-10">
                getNFTs
            </button>
        </div>
        <div v-if="!loading">
            <div v-for="item in nfts" class="card w-96 bg-base-100 shadow-xl columns-4">

                <div class="card-body">
                    <div v-if="item">
                        <figure><img :src="item.metadata.image" /></figure>
                    </div>
                    <h2 class="card-title">{{ item.metadata.name }}</h2>
                    <p>{{ item.metadata.description }}</p>
                    <p>Contract Adress: {{ item.contract.address }}</p>
                    {{ item.metadata.image }}
                    <h2 v-if="item.metadata.size">Size: {{ item.metadata.size }}</h2>
                    <h2 v-if="item.metadata.size_h">Size Height: {{ item.metadata.size_h }}</h2>
                    <h2 v-if="item.metadata.size_w">Size Width: {{ item.metadata.size_w }}</h2>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>
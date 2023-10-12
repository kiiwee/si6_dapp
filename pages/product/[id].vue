
<script setup lang="ts">
const contractAddress = '0x0a7A444497bA11357fEFA8a1aC10E1f2Ac0f916d'
// import contractABI from '../../MacDee.sol/MacDeeContract.json'
// const contractAddress = '0x35708b2605A08A471a80059a8D89d3E1B098FB06'
// import alchemy from '../plugins/alchemy'
const route = useRoute()

import axios from 'axios'
const address = '0x9e2BB71110d724d8712B94C5Ba4C07F2E7bcD3dA'

const baseURL = `https://eth-sepolia.g.alchemy.com/v2/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv`;
const url = `${baseURL}/getNFTMetadata/?contractAddress=${contractAddress}&tokenId=${route.params.id}`;
const config = {
    method: 'get',
    url: url,
};
const nft = ref({});
const itemJson = ref({})
axios(config)
    .then(response => {
        console.log(response['data'])
        nft.value = response['data']
        // itemJson.value = nft.metadata
        //nfts.value = response['data'].ownedNfts
        //loading.value = false;
    })
    .catch(error => console.log('error', error));

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.cid)
const qrtext = ref('')
</script>
<template>
    <div>
        <input v-model="qrtext" type="text" placeholder="Type here" class="input w-full max-w-xs" />

        <qrcode-vue :value="qrtext"></qrcode-vue>

        {{ nft.metadata }}

        <div v-if="nft.metadata">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h1 class="card-title">{{ nft.metadata.name }}</h1>
                    <h2>{{ nft.metadata.description }}</h2>

                    <h2 v-if="nft.metadata.size">Size: {{ nft.metadata.size }}</h2>
                    <h2 v-if="nft.metadata.size_h">Size Height: {{ nft.metadata.size_h }}</h2>
                    <h2 v-if="nft.metadata.size_w">Size Width: {{ nft.metadata.size_w }}</h2>
                </div>
                <figure><img src="/dummy.avif" alt="Shoes" /></figure>
            </div>
        </div>

    </div>
</template>


<style scoped></style>
<template>
    <div>
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-6xl">All Minted Assets</h1>

        </div>
        <div v-if="!loading" class="grid grid-cols-4 gap-4">
            <div v-for=" item  in  nfts " class="card  bg-base-100  shadow-xl ">

                <div class="card-body">
                    <!-- <div v-if="item">
                        <figure><img :src="item.raw.metadata.image" /></figure>
                    </div> -->
                    <h2 class="card-title">{{ item[0].metadata.name }}</h2>

                    <p>Description: {{ item[0].metadata.description }}</p>
                    <p>Token ID: {{ parseInt(item[0].id.tokenId, 16) }}</p>
                    <p>Supplier Name: {{ item[0].metadata.supplier_name }}</p>
                    <p>Country Origin: {{ item[0].metadata.country_origin }}</p>


                    <!-- <h2 v-if="item[0].metadata.properties">
                        <div v-for=" size  in  item[0].metadata.properties.size ">
                            <h2>{{ size }}</h2>
                        </div>
                    </h2> -->

                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Add for Production</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex  flex-col p-5 justify-center items-center grid-cols-1 gap-4">
            <div>
                <p class="text-gray-200 text-lg">Item Name: </p>
                <input v-model="state.name" type="text" placeholder="Type here"
                    class="input input-bordered input-accent w-full max-w-xs" />
            </div>
            <div>
                <p class="text-gray-200 text-lg">Quantity: </p>
                <input v-model="state.quantitiy" type="text" placeholder="Type here"
                    class="input input-bordered input-accent w-full max-w-xs" />
            </div>
            <div>
                <p class="text-gray-200 text-lg">Country of Origin: </p>
                <input v-model="state.country_origin" type="text" placeholder="Type here"
                    class="input input-bordered input-accent w-full max-w-xs" />
            </div>
            <div>
                <p class="text-gray-200 text-lg">Supplier Name: </p>
                <input v-model="state.supplier_name" type="text" placeholder="Type here"
                    class="input input-bordered input-accent w-full max-w-xs" />
            </div>
            <div>
                <p class="text-gray-200 text-lg">Description: </p>
                <input v-model="state.desc" type="text" placeholder="Type here"
                    class="input input-bordered input-accent w-full max-w-xs" />
            </div>
            <div>
                <p class="text-gray-200 text-lg">image REMOVE SOON: </p>
                <input v-model="state.image" type="text" placeholder="Type here"
                    class="input input-bordered input-accent w-full max-w-xs" />
            </div>
            <h1 class="text-gray-200 text-lgext-gray-200 text-2xl mt-5">Size: </h1>

            <div class="flex flex-row mb-2 gap-4">

                <div>
                    <p class="text-gray-200 text-lg">Width: </p>
                    <input v-model="state.size.size_w" type="text" placeholder="Type here"
                        class="input input-bordered input-accent w-full max-w-xs" />
                </div>
                <div>
                    <p class="text-gray-200 text-lg">Height: </p>
                    <input v-model="state.size.size_h" type="text" placeholder="Type here"
                        class="input input-bordered input-accent w-full max-w-xs" />
                </div>
                <div>
                    <p class="text-gray-200 text-lg">Length: </p>
                    <input v-model="state.size.size_l" type="text" placeholder="Type here"
                        class="input input-bordered input-accent w-full max-w-xs" />
                </div>
            </div>
            <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" />


            <button @click="onSubmit()" class="m-5 btn btn-outline btn-primary">Submit and Mint</button>

        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCryptoStore } from '../stores/index'

const messageInput = ref(null as any)
const cryptoStore = useCryptoStore()
const { connectWallet, mint_token, getNFTsByContract, getNFTs, mint_with_uri } = useCryptoStore()
getNFTsByContract()
const { account, nfts, loading } = storeToRefs(cryptoStore)

const ammount = ref('')
const tokenId = ref('')
const name = ref('')
const state = reactive({
    name: undefined,
    quantitiy: undefined,

    size: {

    },
})
</script>

<style scoped></style>
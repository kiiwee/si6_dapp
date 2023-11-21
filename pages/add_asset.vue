<template>
    <div>
        <div class="flex flex-row p-5 justify-center items-center">
            <h1 class="text-6xl">Mint Assets</h1>

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
const cryptoStore = useCryptoStore()
const { connectWallet, mintAsset, getNFTs, mint_with_uri } = useCryptoStore()
const state = reactive({
    name: undefined,
    quantitiy: undefined,

    size: {

    },
});
async function onSubmit() {
    // Do something with event.data
    console.log(state)
    // mint_with_uri()
    state.image = new File(['<DATA>'], '../public/pinpie.png', { type: 'image/jpg' });

    mintAsset(state)
}

</script>

<style scoped></style>
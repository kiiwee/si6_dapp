<script setup>
const wallet = useWalletStore()


</script>

<template>
    {{ wallet }}
    <div v-if="isConnected">
        Connected to {{ address }}
        <button @click="disconnect">Disconnect</button>
    </div>
    <button v-else @click="connect">
        Connect Wallet
    </button>
</template>
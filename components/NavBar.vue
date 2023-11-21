<template>
    <div>
        <div class="navbar bg-primary rounded-xl text-secondary">
            <NuxtLink to="/" class="flex-1">
                <p class="btn btn-ghost text-bold text-4xl">SI6 project</p>
            </NuxtLink>
            <NuxtLink to="/test" class="m-5">
                Test View </NuxtLink>
            <NuxtLink to="/add_asset" class="m-5">
                Mint Assets </NuxtLink>
            <NuxtLink to="/preview" class="m-5">
                Preview Assets </NuxtLink>
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">


                    <li>
                        <details>
                            <summary>
                                Assets
                            </summary>
                            <NuxtLink to="/asset/1">
                                Asset 1
                            </NuxtLink>
                            <NuxtLink to="/asset/3">
                                Asset 2
                            </NuxtLink>
                            <NuxtLink to="/asset/4">
                                Asset 3
                            </NuxtLink>
                            <NuxtLink to="/asset/5">
                                Asset 4
                            </NuxtLink>
                        </details>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>


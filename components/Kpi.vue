<template>
        <div class="flex flex-row justify-center m-auto bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 p-6 gap-8 rounded-lg border-2 border-purple-500">
            <div v-if="loading" class="animate-spin rounded-full border-t-2 border-b-2 border-purple-200 h-6 w-6" />
            <div v-else class="my-auto">
                <div class="text-lg text-purple-300">Balance {{ currency }}</div>
                <div class="text-4xl text-purple-100">{{ number }}</div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            required: false,
            default: 0
        },
        currency: {
            type: String,
            required: false,
            default: ''
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

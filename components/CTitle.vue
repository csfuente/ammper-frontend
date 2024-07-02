<template>
    <div class="container mx-auto px-4 md:px-8 py-4 text-center">
        <h1 class="text-3xl font-bold mb-2">{{ title }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>
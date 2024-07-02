<template>
    <div class="flex-flex-row gap-4">
        <NavBar />
        <CTitle title="Instituciones bancarias" />
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 w-1/4"></th>
                    <th scope="col" class="py-3 w-1/2">Nombre</th>
                    <th scope="col" class="py-3 w-1/4">País</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="institutions.length === 0" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>
                        <div class="animate-pulse bg-gray-200 h-16 w-1/4"></div>
                    </td>
                    <td class="py-4">
                        <div class="animate-pulse bg-gray-200 h-4 w-1/2"></div>
                    </td>
                    <td class="flex py-4 justify-center align-middle">
                        <div class="animate-pulse bg-gray-200 h-4 w-1/4 rounded-full"></div>
                    </td>
                </tr>
                <tr v-else v-for="institution in institutions" :key="institution.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" @click="redirectToBankDetail(institution.name)">
                    <td class="py-4">
                        <img v-if="institution.logo.length !== 0" :src="institution.logo" alt="Institution Logo" class="h-16">
                    </td>
                    <td class="py-4">{{ institution.display_name }}</td>
                    <td class="flex py-4 justify-center align-middle">
                        <img :src="getFlagUrl(institution.country_code)" :alt="institution.country_code" class="h-4 mt-6">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getInstitutions } from '~/helpers/getInstitutions';
export default {
    data() {
        return {
            institutions: []
        }
    },
    computed: {
        hasJwtLocalStorage() {
            return localStorage.getItem('jwt') !== null;
        }
    },
    async mounted() {
        if (!this.hasJwtLocalStorage) {
            this.$router.push('/login');
        }
        const expirationDate = localStorage.getItem('expirationDate');
        if (expirationDate && new Date(expirationDate) < new Date()) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('expirationDate');
            this.$router.push('/login');
        }
        this.institutions = await getInstitutions();
    },
    methods: {
        getFlagUrl(countryCode) {
            return `https://flagcdn.com/64x48/${countryCode.toLowerCase()}.png`;
        },
        redirectToBankDetail(id) {
            this.$router.push(`/bank/${id}`)
        }
    }
}
</script>
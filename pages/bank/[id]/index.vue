<template>
    <div class="flex-flex-row gap-4">
        <NavBar />
        <CTitle title="Cuentas del banco" />
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 w-1/2">Nombre</th>
                    <th scope="col" class="py-3 w-1/4">Número</th>
                    <th scope="col" class="py-3 w-1/4">Moneda</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!ready" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>
                        <div class="animate-pulse bg-gray-200 h-4 w-1/2"></div>
                    </td>
                    <td class="py-4">
                        <div class="animate-pulse bg-gray-200 h-4 w-1/4"></div>
                    </td>
                    <td class="flex py-4 justify-center align-middle">
                        <div class="animate-pulse bg-gray-200 h-4 w-1/4 rounded-full"></div>
                    </td>
                </tr>
                <tr v-else-if="accounts.length !== 0" v-for="account in accounts" :key="account.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" @click="redirectToAccountDetail(account.id)">
                    <td class="py-4">
                        {{ account.name }}
                    </td>
                    <td class="py-4">{{ account.number }}</td>
                    <td class="flex py-4 justify-center align-middle">
                        {{ account.currency }}
                    </td>
                </tr>
                <tr v-else>
                    <td class="py-4" colspan="3">No hay cuentas disponibles</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getAccounts } from '~/helpers/getAccounts';
import { getLink } from '~/helpers/getLink';

export default {
    data() {
        return {
            accounts: [],
            ready: false
        }
    },
    async mounted() {
        const name = this.$route.params.id;
        if (!name) {
            this.$router.push('/');
        }
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            this.$router.push('/login');
        }
        const expirationDate = localStorage.getItem('expirationDate');
        if (expirationDate && new Date(expirationDate) < new Date()) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('expirationDate');
            this.$router.push('/login');
        }
        if (!localStorage.getItem(name + 'Link')) {
            const link = await getLink(name);
            localStorage.setItem(name + 'Link', link);
        }
        const bankLink = localStorage.getItem(name + 'Link');
        this.accounts = await getAccounts(bankLink);
        this.ready = true;
    },
    methods: {
        redirectToAccountDetail(id) {
            this.$router.push(`/bank/${this.$route.params.id}/${id}`)
        }
    }
}
</script>
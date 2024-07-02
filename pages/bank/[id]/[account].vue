<template>
    <div class="flex-flex-row gap-4">
        <NavBar />
        <CTitle title="Transacciones" />
        <Kpi :number="balance" :currency="currency" :loading="!ready"/>
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 w-1/8">Fecha</th>
                    <th scope="col" class="py-3 w-1/2">Detalle</th>
                    <th scope="col" class="py-3 w-1/8">Monto</th>
                    <th scope="col" class="py-3 w-1/4">Tipo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!ready" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>
                        <div class="animate-pulse bg-gray-200 h-4 w-1/8"></div>
                    </td>
                    <td class="py-4">
                        <div class="animate-pulse bg-gray-200 h-4 w-1/2"></div>
                    </td>
                    <td class="flex py-4 justify-center align-middle">
                        <div class="animate-pulse bg-gray-200 h-4 w-1/8"></div>
                    </td>
                    <td class="flex py-4 justify-center align-middle">
                        <div class="animate-pulse bg-gray-200 h-4 w-1/4"></div>
                    </td>
                </tr>
                <tr v-else-if="transactions.length !== 0" v-for="transaction in transactions.sort((a, b) => new Date(b.value_date) - new Date(a.value_date))" :key="transaction.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="py-4">
                        {{ transaction.value_date }}
                    </td>
                    <td class="py-4">{{ transaction.description }}</td>
                    <td class="py-4">
                        {{ transaction.amount }}
                    </td>
                    <td class="py-4">
                        {{ transaction.type === 'INFLOW' ? 'Ingreso' : 'Egreso' }}
                    </td>
                </tr>
                <tr v-else>
                    <td class="py-4" colspan="4">No hay cuentas disponibles</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getLink } from '~/helpers/getLink';
import { getTransactions } from '~/helpers/getTransactions';

export default {
    data() {
        return {
            transactions: [],
            ready: false
        }
    },
    computed: {
        balance() {
            return this.transactions.reduce((acc, transaction) => {
                if (transaction.type === 'INFLOW') {
                    return acc + transaction.amount;
                }
                return acc - transaction.amount;
            }, 0);
        },
        currency() {
            if (this.transactions.length === 0) {
                return '';
            }
            return this.transactions[0].currency;
        }
    },
    async mounted() {
        const name = this.$route.params.id;
        const account = this.$route.params.account;
        if (!name || !account) {
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
        this.transactions = await getTransactions(bankLink, account);
        this.ready = true;
    }
}
</script>
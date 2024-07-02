<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 class="text-3xl font-bold mb-2">Registro</h1>
            <form class="space-y-6" @submit.prevent="register" method="POST">
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div class="mt-2">
                <input v-model="form.email" id="email" name="email" type="email" required class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                </div>
                <div class="mt-2">
                <input v-model="form.password" id="password" name="password" type="password" required class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                <label for="password2" class="block text-sm font-medium leading-6 text-gray-900">Ingresa nuevamente la contraseña</label>
                </div>
                <div class="mt-2">
                <input v-model="form.password2" id="password2" name="password2" type="password" required class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarse</button>
            </div>
            </form>

            <div v-if="error" class="text-red-500 text-sm pt-2">{{ error }}</div>

            <p class="mt-10 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?
            <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Ingresa aquí</router-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                password2: ''
            },
            error: '',
        }
    },
    methods: {
        async register() {
            this.error = '';
            if (this.form.password !== this.form.password2) {
                this.error = 'Las contraseñas no coinciden';
                return;
            }
            if (this.form.password.length < 8) {
                this.error = 'La contraseña debe tener al menos 8 caracteres';
                return;
            }
            const response = await fetch('https://ammper-backend.vercel.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.form)
            });
            if (response.ok) {
                this.$router.push('/login');
            } else {
                this.error = 'El correo ingresado ya se encuentra registrado';
            }
        }
    }
}
</script>
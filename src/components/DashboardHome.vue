<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { useAuthStore } from '@/stores/auth';

    const router = useRouter();
    const auth = useAuthStore();

    const products = ref([]);

    onMounted(async () => {
        try
        {
            console.log("token", auth.getAuthToken());
            const response = await axios.get('http://localhost:8000/api/products', {
                headers: {
                    'Authorization': `Bearer ${auth.getAuthToken()}`
                }
            });
            products.value = response.data;
        }
        catch (error)
        {
            if(error.status === 401)
            {
                router.push('/');
            }
            else
            {
                console.error('Ocorreu um erro a obter os produtos', error);
            }
        }
    });
</script>

<template>
    <section>
        <div class="products-grid">
            <div v-for="product in products" :key="product.id">
                {{ product.name }}
            </div>
        </div>
    </section>
</template>
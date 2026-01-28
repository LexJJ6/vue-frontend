<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { useAuthStore } from '@/stores/auth';
    import ProductCard from '@/components/ProductCard.vue';

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
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </section>
</template>

<style scoped>
section
{
    width: 100vw;
    min-height: calc(100vh - 60px); /* nao devia ser hardcoded, devia ter variavel no main.css da altura do header */
    padding-top: 5rem;
    background-color: rgb(240, 240, 240);
}
.products-grid
{
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 2%;
}
</style>
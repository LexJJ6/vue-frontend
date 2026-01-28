<script setup>
    import { onMounted, ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
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
        <RouterLink to="/dashboard/products/new-product" class="btn btn-primary btn-float">
            <span class="bi bi-plus">+</span>
        </RouterLink>
    </section>
</template>

<style scoped>
section
{
    width: 100vw;
    min-height: 100vh;
    padding-top: 5rem;
    background-color: rgb(240, 240, 240);
}
.products-grid
{
    padding: 4rem 0;
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1.2rem;
}

.btn-float {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background-color: #333333;
  color: white;
  text-decoration: none;
}

.btn-float:hover
{
    background-color: black;
}

.btn-float span {
  color: white;
  font-weight: bold;
}
</style>
<script setup>
  import { onMounted, ref } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import ProductCard from '@/components/ProductCard.vue';
  import { api } from '@/axios';

  const router = useRouter();
  const toast = useToast();

  const products = ref([]);
  const filteredProducts = ref([]);

  onMounted(async () => {
    try
    {
      const response = await api.get('/products');
      products.value = response.data; // para não ter de fazer novos pedidos
      filteredProducts.value = response.data;
    }
    catch (err)
    {
      if(err.status === 401)
      {
        toast.error('A sua sessão expirou');
        router.push('/');
      }
      else
      {
        toast.error('Ocorreu um erro ao obter os produtos');
        console.error('Ocorreu um erro ao obter os produtos', err);
      }
    }
  });

  const testeFiltro = () => {
    filteredProducts.value.splice(0,1);
  };
</script>

<template>
    <section>
        <div class="products-grid">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
        <RouterLink to="/dashboard/products/add" class="btn btn-primary btn-float">
            <span class="bi bi-plus">+</span>
        </RouterLink>
        <button @click="testeFiltro">teste</button>
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
<script setup>
  import { onMounted, ref } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import ProductCard from '@/components/ProductCard.vue';
  import { api } from '@/axios';
  import { ChevronDown, ChevronDownSquare, ChevronUp } from 'lucide-vue-next';

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

  const showFilters = ref(false);

  const toggleShowFilters = () => {
    showFilters.value = !showFilters.value;
    // filteredProducts.value.splice(0,1);
  };

  const filterName = ref('');
  const filterCategory = ref('');
  const filterMinPrice = ref('');
  const filterMaxPrice = ref('');
  const filterMinStock = ref('');
  const filterMaxStock = ref('');

  const applyFilters = () => {
    filteredProducts.value = products.value.filter((product) => {
      if(filterName.value !== '' && (!product.name.toLowerCase().includes(filterName.value.toLowerCase())))
      {
        return false;
      }
      if(filterCategory.value !== '' && (!product.category.toLowerCase().includes(filterCategory.value.toLowerCase())))
      {
        return false;
      }
      if(filterMinPrice.value !== '' && (product.price < (filterMinPrice.value * 100)))
      {
        return false;
      }
      if(filterMaxPrice.value !== '' && (product.price > (filterMaxPrice.value * 100)))
      {
        return false;
      }
      if(filterMinStock.value !== '' && (product.stock < filterMinStock.value))
      {
        return false;
      }
      if(filterMaxStock.value !== '' && (product.stock > filterMaxStock.value))
      {
        return false;
      }
      return true;
    });
  };

  const resetFilters = () => {
    filteredProducts.value = products.value;
    filterName.value = '';
    filterCategory.value = '';
    filterMinPrice.value = '';
    filterMaxPrice.value = '';
    filterMinStock.value = '';
    filterMaxStock.value = '';
  };
</script>

<template>
    <section>
        <div class="filters-section">
            <button @click="toggleShowFilters">
              <span>Filtrar Lista</span>
              <ChevronDown v-if="!showFilters" :size="20" :stroke-width="2" />
              <ChevronUp v-else :size="20" :stroke-width="2" />
            </button>
            <form class="filters-div" v-show="showFilters">
              <div class="input-wrapper">
                <label for="filter-name">Nome</label>
                <input
                  type="text"
                  v-model="filterName"
                  id="filter-name"
                />
              </div>
              <div class="input-wrapper">
                <label for="filter-category">Categoria</label>
                <input
                  type="text"
                  v-model="filterCategory"
                  id="filter-category"
                />
              </div>
              <div class="input-wrapper">
                <label for="filter-min-price">Preço mínimo</label>
                <input
                  type="number"
                  min="0"
                  v-model="filterMinPrice"
                  id="filter-min-price"
                />
              </div>
              <div class="input-wrapper">
                <label for="filter-max-price">Preço máximo</label>
                <input
                  type="number"
                  min="0"
                  v-model="filterMaxPrice"
                  id="filter-max-price"
                />
              </div>
              <div class="input-wrapper">
                <label for="filter-min-stock">Stock mínimo</label>
                <input
                  type="number"
                  min="0"
                  v-model="filterMinStock"
                  id="filter-min-stock"
                />
              </div>
              <div class="input-wrapper">
                <label for="filter-max-stock">Stock máximo</label>
                <input
                  type="number"
                  min="0"
                  v-model="filterMaxStock"
                  id="filter-max-stock"
                />
              </div>
              <button type="submit" @click.prevent="applyFilters">Aplicar Filtros</button>
              <button type="button" @click="resetFilters">Limpar Filtros</button>
            </form>
        </div>
        <div class="products-grid">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
        <RouterLink to="/dashboard/products/add" class="btn btn-primary btn-float">
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

.filters-section
{
    padding: 2rem 4rem 0;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.8rem;
}

.filters-section button
{
  all: unset;
  cursor: pointer;
  font-weight: 400;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;
}

.filters-div
{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    flex-wrap: wrap;
}

.filters-div button
{
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: #333333;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  align-self: last baseline;
}

.filters-div button:hover
{
  background-color: black;
}

.input-wrapper
{
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.input-wrapper input
{
  padding: 0.2rem 0.4rem;
}

.products-grid
{
    padding: 2rem 0;
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
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
  z-index: 20;
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
<script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { formatPrice } from '@/utils';
  import { api } from '@/axios';
  import { History } from 'lucide-vue-next';

  const router = useRouter();
  const toast = useToast();

  const loading = ref(false);
  const error = ref('');

  const selectedProductId = ref(null);
  const selectedProduct = ref(null);

  const quantity = ref('');

  const handleSubmit = async () => {
    error.value = '';
    loading.value = true;

    try
    {
      await api.post('/orders',
      {
        product_id: selectedProduct.value.id, // dado que name não é unique
        product_name: selectedProduct.value.name,
        unit_price: selectedProduct.value.price,
        quantity: quantity.value,
        subtotal: selectedProduct.value.price * quantity.value,
      });
      toast.success('Compra efetuada com sucesso');
      router.push('/dashboard');
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
        toast.error(err?.response?.data?.message || 'Ocorreu um erro ao efetuar a compra');
        console.error('Ocorreu um erro ao efetuar a compra', err);
      }
    }
    finally
    {
      loading.value = false;
    }
  };

  const products = ref([]);

  onMounted(async () => {
    try
    {
      const response = await api.get('/products');
      products.value = response.data;
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

  const getProduct = () => {
    selectedProduct.value = products.value.find(p => p.id === selectedProductId.value);
  };
</script>

<template>
  <div class="form-page">
    <div class="form-card">
      <h1 class="form-title">Simular Compra</h1>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-groups">
          <div class="form-group">
            <label for="product-name">Produto</label>
            <select @change="getProduct" v-model="selectedProductId" id="product-name" name="product-name">
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="quantity">Quantidade</label>
            <input
              type="number"
              id="quantity"
              v-model="quantity"
              required
              placeholder="Insira a quantidade"
              min="0"
            />
          </div>
          <div class="product-info">
          <p>Preço Unitário: {{ selectedProduct?.price ? `${formatPrice(selectedProduct?.price)} €` : '' }}</p>
          <p>Stock: {{ selectedProduct?.stock ? selectedProduct?.stock : '' }}</p>
          <p>Subtotal: {{ selectedProduct?.price ? `${formatPrice(selectedProduct?.price * quantity)} €` : '' }}</p>
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-submit">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Comprar</span>
        </button>

        <div class="error-message" :class="{ 'not-visible': !error }">
          <p v-if="error">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
  <RouterLink to="/dashboard/orders" class="btn btn-primary btn-float">
    <History />
  </RouterLink>
</template>

<style scoped>
section
{
    width: 100vw;
    min-height: 100vh;
    padding-top: 5rem;
    background-color: rgb(240, 240, 240);
}

.form-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f0f0;
  padding: 1rem;
}

.form-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  background: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  width: 90vw;
  max-width: min(90%, 800px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.form-title {
  width: 100%;
  text-align: center;
  font-size: 1.75rem;
  color: #111111;
  font-weight: 600;
  margin-top: 12px;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.form-groups {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.product-info
{
  padding: 1rem 0 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.4rem;
}

p,
label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333333;
}

select,
input {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

select:focus,
input:focus {
  outline: none;
  border-color: #555555;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #333333;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
  margin-top: 0.6rem;
}

.btn-submit:hover:not(:disabled) {
  background-color: #111111;
}

.btn-submit:disabled {
  background-color: #aaaaaa;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid #ffffff;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  width: 100%;
  height: 44px;
  background-color: rgb(248, 215, 218);
  border: 1px solid rgb(220, 53, 69);
  color: rgb(114, 28, 36);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  text-align: center;
  min-height: 1.2em;
  visibility: visible;
  font-size: 1rem;
}

.error-message.not-visible {
  visibility: hidden;
}

.error-message p {
  width: 100%;
  text-align: left;
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

.btn-float span {
  color: white;
  font-weight: bold;
}

@media (hover: hover)
{
.btn-submit:hover:not(:disabled) {
  background-color: #111111;
}

.btn-float:hover
{
    background-color: black;
}
}

@media screen and (max-width: 768px)
{
.form-page {
  min-height: calc(100vh - 60px);
  margin-top: 60px;
}
}
</style>
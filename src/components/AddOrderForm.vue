<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { api } from '@/axios';

  const router = useRouter();
  const toast = useToast();

  const name = ref('');
  const category = ref('');
  const price = ref(0);
  const stock = ref(0);
  const loading = ref(false);
  const error = ref('');

  const handleSubmit = async () => {
    error.value = '';
    loading.value = true;

    try
    {
      await api.post('/products',
      {
        name: name.value,
        category: category.value,
        price: price.value,
        stock: stock.value,
      });
      toast.success('Produto criado com sucesso');
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
        toast.error('Ocorreu um erro ao criar o produto');
        console.error('Ocorreu um erro ao criar o produto', err);
      }
    }
    finally
    {
      loading.value = false;
    }
  };
</script>

<template>
  <div class="form-page">
    <div class="form-card">
      <h1 class="form-title">Simular Compra</h1>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-groups">
          <div class="form-group">
            <label for="name">Nome</label>
            <input
              type="text"
              id="name"
              v-model="name"
              required
              placeholder="Insira o nome do produto"
            />
          </div>
          <div class="form-group">
            <label for="category">Categoria</label>
            <input
              type="text"
              id="category"
              v-model="category"
              required
              placeholder="Insira a categoria do produto"
            />
          </div>
          <div class="form-group">
            <label for="price">Preço (em cêntimos)</label>
            <input
              type="number"
              id="price"
              v-model="price"
              required
              placeholder="Insira o preço do produto"
              min="0"
            />
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input
              type="number"
              id="stock"
              v-model="stock"
              required
              placeholder="Insira a quantidade em estoque"
              min="0"
            />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-submit">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Criar</span>
        </button>

        <div class="error-message" :class="{ 'not-visible': !error }">
          <p v-if="error">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
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

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333333;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

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
</style>
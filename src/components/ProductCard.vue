<script setup>
  import { ref, defineProps } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { formatPrice } from '@/utils';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  import { useToast } from 'vue-toastification';

  defineProps({
    product: Object
  });

  const router = useRouter();
  const auth = useAuthStore();
  const toast = useToast();

  const deleted = ref(false);

  const deleteProduct = async (id) => {
    try
    {
      await axios.delete(`http://localhost:8000/api/products/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${auth.getAuthToken()}`
        }
      });
      toast.success('Produto eliminado com sucesso');
      deleted.value = true;
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
        toast.error('Ocorreu um erro ao eliminar o produto');
        console.error('Ocorreu um erro ao eliminar o produto', err);
      }
    }
  };
</script>

<template>
    <div class="product-card" :class="{ 'product-deleted': deleted }">
        <p class="product-name">{{ product.name }}</p>
        <p>Categoria: {{ product.category }}</p>
        <p>Preço: {{ formatPrice(product.price) }} €</p>
        <p>Stock: {{ product.stock }}</p>
        <div class="actions">
            <RouterLink :to="`/dashboard/products/edit/${product.id}`" class="btn-edit">Editar</RouterLink>
            <button @click="deleteProduct(product.id)" class="btn-delete">Eliminar</button>
        </div>
    </div>
</template>

<style scoped>
.product-card
{
    width: 30%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 6px;
    gap: 0.4rem;
    padding: 1rem;
    background-color: white;
}

.product-deleted
{
    display: none;
}

.product-name
{
    font-size: 1.2rem;
    font-weight: 600;
    border-bottom: 1px solid rgb(204, 204, 204);
    padding-bottom: 0.2rem;
}

.actions {
  display: flex;
  justify-content: end;
  margin-top: 0.4rem;
  gap: 0.6rem;
}

button
{
    all: unset;
}

.btn-edit,
.btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: #333333;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.btn-edit:hover {
  background-color: rgb(53, 160, 69);
}

.btn-delete:hover {
  background-color: rgb(220, 53, 69);
}
</style>
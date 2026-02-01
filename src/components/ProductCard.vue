<script setup>
  import { ref, defineProps } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { formatPrice } from '@/utils';
  import { useToast } from 'vue-toastification';
  import { api } from '@/axios';

  const props = defineProps({
    product: Object
  });

  const router = useRouter();
  const toast = useToast();

  const deleted = ref(false);

  const deleteProduct = async (id) => {
    try
    {
      await api.delete(`/products/${id}`);
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
        <p class="product-name">{{ props.product.name }}</p>
        <p>Categoria: {{ props.product.category }}</p>
        <p>Preço: {{ formatPrice(props.product.price) }} €</p>
        <p>Stock: {{ props.product.stock }}</p>
        <div class="actions">
            <RouterLink :to="`/dashboard/products/edit/${props.product.id}`" class="btn-edit">Editar</RouterLink>
            <button @click="deleteProduct(props.product.id)" class="btn-delete">Eliminar</button>
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

@media (hover: hover)
{
.btn-edit:hover {
  background-color: rgb(53, 160, 69);
}

.btn-delete:hover {
  background-color: rgb(220, 53, 69);
}
}

@media screen and (max-width: 768px)
{
.product-card
{
    width: 100%;
}
}
</style>
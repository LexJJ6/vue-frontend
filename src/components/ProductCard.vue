<script setup>
    import { defineProps } from 'vue';
    import { RouterLink } from 'vue-router';
    import { formatPrice } from '@/utils';
    import axios from 'axios';
    import { useToast } from 'vue-toastification';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';

    defineProps({
        product: Object
    });

    const toast = useToast();
    const auth = useAuthStore();
    const router = useRouter();

    const deleted = ref(false);

    const deleteProduct = async (id) => {
        // console.log(id)
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
            // router.push('/dashboard');
        }
        catch (error)
        {
            console.error(error);
            toast.error('Ocorreu um erro ao eliminar o produto');
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
            <RouterLink :to="`/dashboard/products/${product.id}/edit`" class="btn-edit">Editar</RouterLink>
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
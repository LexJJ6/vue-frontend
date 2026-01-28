<script setup>
    import { defineProps } from 'vue';
    import { RouterLink } from 'vue-router';
    import { formatPrice } from '@/utils';


    defineProps({
        product: Object
    });
</script>

<template>
    <div class="product-card">
        <p class="product-name">{{ product.name }}</p>
        <p>Categoria: {{ product.category }}</p>
        <p>Preço: {{ formatPrice(product.price) }} €</p>
        <p>Stock: {{ product.stock }}</p>
        <div class="actions">
            <RouterLink :to="`/dashboard/product/${product.id}`" class="btn-see-more">Ver Mais</RouterLink>
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
}

button
{
    all: unset;
}

.btn-see-more, .btn-edit, .btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: #333333;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.btn-see-more:hover, .btn-edit:hover, .btn-delete:hover {
  background-color: black;
}
</style>
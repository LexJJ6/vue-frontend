<script setup>
    import { defineProps } from 'vue';


    defineProps({
        product: Object
    });
</script>

<template>
    <div class="product-card">
        <p class="product-name">{{ product.name }}</p>
        <p>Categoria: {{ product.category }}</p>
        <p>Preço: {{ product.price }}</p>
        <p>Stock: {{ product.stock }}</p>
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
    margin-top: 1rem;
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
</style>
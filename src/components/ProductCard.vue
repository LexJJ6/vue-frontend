<script setup>
    import { defineProps } from 'vue';


    defineProps({
        product: Object
    });
</script>

<template>
    <div class="product-card">
        <p>Nome: {{ product.name }}</p>
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
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin-top: 1rem;
    gap: 0.4rem;
    padding: 1rem;
    background-color: white;
}
</style>
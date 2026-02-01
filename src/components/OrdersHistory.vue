<script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { formatPrice, formatDate } from '@/utils';
  import { useToast } from 'vue-toastification';
  import { api } from '@/axios';

  const router = useRouter();
  const toast = useToast();

  const orders = ref([]);

  onMounted(async () => {
    try
    {
      const response = await api.get('/orders');
      orders.value = response.data;
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
        toast.error('Ocorreu um erro ao obter as compras');
        console.error('Ocorreu um erro ao obter as compras', err);
      }
    }
  });
</script>

<template>
    <section>
        <div class="orders-list">
            <div class="order-card" v-for="order in orders" :key="order.id" >
              <p class="product-name">{{ order.product_name }}</p>
              <p>Preço Unitário: {{ formatPrice(order.unit_price) }} €</p>
              <p>Quantidade: {{ order.quantity }}</p>
              <p>Subtotal: {{ formatPrice(order.subtotal) }} €</p>
              <p>Data de compra: {{ formatDate(order.created_at) }}</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
section
{
    width: 100vw;
    min-height: 100vh;
    padding-top: 80px;
    background-color: rgb(240, 240, 240);
}

.orders-list
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

.order-card
{
    width: 100%;
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
.btn-float:hover
{
    background-color: black;
}
}

@media screen and (max-width: 768px)
{
}
</style>
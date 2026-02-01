<script setup>
  import { ref } from 'vue';
  import { RouterLink, useRouter, useRoute } from 'vue-router';
  import { web } from '@/axios';
  import { useToast } from 'vue-toastification';
  import { Menu, X } from 'lucide-vue-next';

  const router = useRouter();
  const toast = useToast();

  const loading = ref(false);

  const handleLogout = async () => {
    loading.value = true;
            
    try
    {
      await web.post('/logout');
      router.push('/');
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
        toast.error('Ocorreu um erro ao terminar a sessão');
      }
    }
    finally
    {
      loading.value = false;
    }
  };

  const isDashboardHome = () => {
    const route = useRoute();
    return route.path === '/dashboard';
  };

  const showSlidingMenu = ref(false);

  const openSlidingMenu = () => {
    console.log("sim")
    showSlidingMenu.value = true;
  };

  const closeSlidingMenu = () => {
    console.log("nao")
    showSlidingMenu.value = false;
  };
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/dashboard" class="header-logo">Área de Administração</RouterLink>
            <button @click="openSlidingMenu" class="btn-sliding-menu">
              <Menu :size="20" :stroke-width="2" />
            </button>
            <div class="header-actions">
              <RouterLink :class="[isDashboardHome() ? '' : 'display-none']" to="/dashboard/orders/add">Simular Compra</RouterLink>
              <form @submit.prevent="handleLogout">
                  <button class="btn-logout" type="submit" :disabled="loading">
                  <span>Terminar Sessão</span>
                  </button>
              </form>
            </div>
            <div v-if="showSlidingMenu" class="mb-header-sliding-menu">
              <div class="mb-header-actions">
                <X :size="20" :stroke-width="2" @click="closeSlidingMenu" />
                <RouterLink @click="closeSlidingMenu" :class="[isDashboardHome() ? '' : 'display-none']" to="/dashboard/orders/add">Simular Compra</RouterLink>
                <form @submit.prevent="handleLogout">
                    <button class="btn-logout" type="submit" :disabled="loading">
                    <span>Terminar Sessão</span>
                    </button>
                </form>
              </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
header
{
  width: 100vw;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: 1px solid #cccccc;
  z-index: 100;
}

nav
{
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2.6rem 3.6rem;
}

.header-logo
{
    color: black;
    font-size: 2rem;
}

.btn-sliding-menu
{
  display: none;
}

.mb-header-sliding-menu
{
  display: none;
}

.header-actions
{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.header-actions a,
.header-actions button
{
  padding-bottom: 0.2rem;
  border-bottom: 1px solid transparent;
}

.header-actions a:hover,
.header-actions button:hover
{
  border-bottom: 1px solid black;
}

.display-none
{
  display: none;
}

.btn-logout
{
  all: unset;
  color: black;
  font-size: 1rem;
  cursor: pointer;
}

@media screen and (max-width: 768px)
{
header
{
  width: 100vw;
  height: 60px;
}

nav
{
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
}

.header-logo
{
  font-size: 1.2rem;
}

.btn-sliding-menu
{
  all: unset;
  display: flex;
}

.header-actions
{
  display: none;
}

.mb-header-sliding-menu
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    color: black;
    padding: 2rem 1.6rem;
    z-index: 1000;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
}

.mb-header-actions
{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
}
}
</style>
<script setup>
  import { ref } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { web } from '@/axios';
  import { useToast } from 'vue-toastification';

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
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/dashboard" class="header-logo">Área de Administração</RouterLink>
            <form @submit.prevent="handleLogout">
                <button type="submit" :disabled="loading">
                <span>Terminar Sessão</span>
                </button>
            </form>
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
    z-index: 10;
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

button
{
    all: unset;
    color: black;
    font-size: 1rem;
    cursor: pointer;
}
</style>
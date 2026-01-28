<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useAuthStore } from '@/stores/auth';

    const router = useRouter();
    const auth = useAuthStore();

    const loading = ref(false);

    const handleLogout = async () => {
        loading.value = true;
            
        try
        {
            await auth.logout();
            router.push('/');
        }
        catch (err)
        {
            if(err.status === 401)
            {
                auth.logout();
                router.push('/');
            }
            else
            {
                window.alert('Erro no logout');
            }
        }
        finally
        {
            loading.value = false;
        }
    }
</script>

<template>
    <header>
      <RouterLink to="/dashboard" class="header-logo">Área de Administração</RouterLink>

      <form @submit.prevent="handleLogout">
        <button type="submit" :disabled="loading">
          <span v-if="loading">Saíndo...</span>
          <span v-else>Terminar Sessão</span>
        </button>
      </form>
    </header>
</template>

<style scoped>
header
{
    width: 100vw;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2.6rem 3.6rem;
    border-bottom: 1px solid #cccccc;
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
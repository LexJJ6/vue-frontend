<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from '@/axios';

    const router = useRouter();

    const loading = ref(false);
    const error = ref('');

    const handleLogout = async () => {
        loading.value = true;
            
        try
        {
            await axios.post('/api/logout');
            router.push('/login');
        }
        catch (err)
        {
            error.value = err.response?.data?.message || 'Erro no logout';
        }
        finally
        {
            loading.value = false;
        }
    }
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Área de Administração</h1>

      <form @submit.prevent="handleLogout">

        <button type="submit" :disabled="loading">
          <span v-if="loading">Saíndo...</span>
          <span v-else>Terminar Sessão</span>
        </button>

        <p class="error-message" v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
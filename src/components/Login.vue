<script setup>
    import { ref } from 'vue';
    import axios from '@/axios';

    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const error = ref('');

    const handleLogin = async () => {
        loading.value = true;
            
        try
        {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/login', {
            email: email.value,
            password: password.value
            });
        }
        catch (err)
        {
            error.value = err.response?.data?.message || 'Erro no login';
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

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Insira seu email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Insira sua senha"
          />
        </div>

        <button type="submit" :disabled="loading">
          <span v-if="loading">Entrando...</span>
          <span v-else>Login</span>
        </button>

        <p class="error-message" v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #3490dc;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  background: #8bbde0;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  // import { useAuthStore } from '@/stores/auth';
  import axios from 'axios';
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

  const router = useRouter();
  // const auth = useAuthStore();

  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  const error = ref('');

  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  const handleLogin = async () => {
    error.value = '';
    loading.value = true;

    try
    {
      // await auth.login(email.value, password.value);
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      await axios.post('http://localhost:8000/login', {
        email: email.value,
        password: password.value,
      });
      router.push('/dashboard');
    }
    catch (err)
    {
      error.value = err.response?.data?.message || 'Ocorreu um erro ao iniciar a sessão';
    }
    finally
    {
      loading.value = false;
    }
  };
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Área de Administração</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-groups">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Insira o seu email"
            />
          </div>

          <div class="form-group">
            <label for="password">Palavra-passe</label>

            <div class="password-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                placeholder="Insira a sua palavra-passe"
              />

              <button
                type="button"
                class="toggle-password"
                @click="togglePassword"
                aria-label="Mostrar/ocultar palavra-passe"
              >
                <EyeIcon v-if="!showPassword" class="icon" />
                <EyeSlashIcon v-else class="icon" />
              </button>
            </div>
          </div>
        </div>

        <button type="submit" :disabled="loading" class="btn-submit">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Iniciar Sessão</span>
        </button>

        <div class="error-message" :class="{ 'not-visible': !error }">
          <p v-if="error">{{ error }}</p>
        </div>
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
  background: #f0f0f0;
  padding: 1rem;
}

.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  background: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  width: 90vw;
  max-width: min(90%, 800px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.login-title {
  width: 100%;
  text-align: center;
  font-size: 1.75rem;
  color: #111111;
  font-weight: 600;
  margin-top: 12px;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.form-groups {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333333;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: #555555;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  padding-right: 3rem;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-40%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #555;
}

.toggle-password:hover {
  color: #111;
}

.icon {
  width: 20px;
  height: 20px;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #333333;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
  margin-top: 0.6rem;
}

.btn-submit:hover:not(:disabled) {
  background-color: #111111;
}

.btn-submit:disabled {
  background-color: #aaaaaa;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid #ffffff;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  width: 100%;
  height: 44px;
  background-color: rgb(248, 215, 218);
  border: 1px solid rgb(220, 53, 69);
  color: rgb(114, 28, 36);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  text-align: center;
  min-height: 1.2em;
  visibility: visible;
  font-size: 1rem;
}

.error-message.not-visible {
  visibility: hidden;
}

.error-message p {
  width: 100%;
  text-align: left;
}
</style>

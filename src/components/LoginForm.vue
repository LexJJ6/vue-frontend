<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  try {
    await auth.login(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro no login';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Área de Administração</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Insira o seu email"
            :class="{ 'input-error': error }"
          />
        </div>

        <div class="form-group">
          <label for="password">Palavra-passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Insira a sua palavra-passe"
            :class="{ 'input-error': error }"
          />
        </div>

        <button type="submit" :disabled="loading" class="btn-submit">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Iniciar Sessão</span>
        </button>

        <p class="error-message" v-if="error" aria-live="polite">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* ====== Layout ====== */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f0f0; /* cinza claro */
  padding: 1rem;
}

.login-card {
  background: #ffffff; /* branco */
  padding: 2.5rem 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); /* sombra suave */
  transition: transform 0.2s;
}

.login-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  color: #111111; /* quase preto */
  font-weight: 600;
}

/* ====== Form ====== */
.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333333; /* cinza escuro */
}

input {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid #cccccc; /* cinza médio */
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: #555555; /* cinza escuro no foco */
  box-shadow: 0 0 0 3px rgba(85, 85, 85, 0.2);
}

.input-error {
  border-color: #ff4d4f; /* vermelho para erro */
}

/* ====== Button ====== */
.btn-submit {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: #333333; /* cinza escuro */
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #111111; /* preto puro no hover */
}

.btn-submit:disabled {
  background-color: #aaaaaa; /* cinza claro quando desativado */
  cursor: not-allowed;
}

/* ====== Spinner ====== */
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

/* ====== Error ====== */
.error-message {
  color: #ff4d4f; /* vermelho suave */
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
}
</style>

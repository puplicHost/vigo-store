<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input id="name" v-model="form.name" type="text" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" required minlength="6" />
          </div>
          <button type="submit" :disabled="loading" class="btn-submit">
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
        <p class="auth-link">
          Already have an account? <NuxtLink to="/auth/login">Login</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')
const user = useState('user')

async function handleRegister() {
  loading.value = true
  error.value = ''
  
  try {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: form,
    })
    
    user.value = response.user
    localStorage.setItem('token', response.token)
    navigateTo('/')
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Registration failed'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Register - Figo Store',
})
</script>

<style scoped>
.auth-page {
  padding: 3rem 0;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
}

.auth-card {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 1rem;
}

.btn-submit:disabled {
  background: #9ca3af;
}

.error {
  color: #ef4444;
  margin-top: 1rem;
  text-align: center;
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
}

.auth-link a {
  color: #2563eb;
}
</style>

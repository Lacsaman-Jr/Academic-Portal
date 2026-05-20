<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['login'])

const role = ref('student') 
const userId = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMsg = ref('')

const setRole = (selectedRole: string) => {
  role.value = selectedRole
  userId.value = ''
  password.value = ''
  errorMsg.value = ''
}

const submitLogin = () => {
  if (!userId.value || !password.value) {
    const idName = role.value === 'student' ? 'Student ID' : 'Faculty ID'
    errorMsg.value = `Please enter both ${idName} and Password.`
    return
  }
  
  errorMsg.value = ''
  isLoading.value = true
  
  setTimeout(() => {
    isLoading.value = false
    emit('login', role.value) 
  }, 800)
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-left">
        <div class="brand">
          <div class="logo-icon">🏛️</div>
          <h1>Mindanao State University - Main Campus</h1>
          <p>Marawi City, Lanao del Sur, Philippines</p>
        </div>
        <div class="illustration">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
        </div>
      </div>
      
      <div class="login-right">
        <div class="form-wrapper">
          <div class="role-toggle">
            <button type="button" :class="{ active: role === 'student' }" @click="setRole('student')">Student</button>
            <button type="button" :class="{ active: role === 'professor' }" @click="setRole('professor')">Professor</button>
          </div>

          <h2>{{ role === 'student' ? 'MSU Student Portal' : 'MSU Faculty Portal' }}</h2>
          <p class="subtitle">
            Sign in to access your {{ role === 'student' ? 'Modules, Announcement, and Grades.' : 'Classes, Grading Sheets, and Modules.' }}
          </p>
          
          <form @submit.prevent="submitLogin" class="login-form">
            <div class="input-group">
              <label for="userId">{{ role === 'student' ? 'Student ID / Email' : 'Faculty ID / Email' }}</label>
              <input type="text" id="userId" v-model="userId" :placeholder="role === 'student' ? 'e.g. 2024*****' : 'e.g. 2024*****'" autocomplete="off" />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" placeholder="Enter your password" />
            </div>
            <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>
            <button type="submit" class="login-btn" :disabled="isLoading">
              {{ isLoading ? 'Authenticating...' : 'Sign In' }}
            </button>
          </form>
          
          <div class="footer-links">
            <a href="#">Forgot Password?</a>
            <a href="#">Need Help?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login-wrapper { 
    width: 100vw; 
    height: 100vh; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    background: #f1f5f9; 
    padding: 20px; 
  }
  
  .login-container { 
    width: 100%; 
    max-width: 1000px; 
    height: 600px; 
    background: white; 
    border-radius: 24px; 
    box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
    display: flex; 
    overflow: hidden; 
  }
  
  .login-left { 
    flex: 1; 
    background: #800000; 
    background-image: linear-gradient(135deg, #800000 0%, #4a0000 100%); 
    color: white; 
    padding: 50px; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    position: relative; 
    overflow: hidden; 
  }
  
  .brand { 
    position: relative; 
    z-index: 10; 
  }
  
  .logo-icon { 
    font-size: 3.5rem; 
    margin-bottom: 20px; 
  }
  
  .brand h1 { 
    margin: 0; 
    font-size: 2.2rem; 
    font-weight: 900; 
    color: #ffd700; 
    line-height: 1.2; 
  }
  
  .brand p { 
    margin: 10px 0 0 0; 
    font-size: 1.1rem; 
    opacity: 0.9; 
  }
  
  .shape { 
    position: absolute; 
    border-radius: 50%; 
    background: rgba(255, 215, 0, 0.1); 
  }
  
  .shape-1 { 
    width: 300px; 
    height: 300px; 
    bottom: -50px; 
    right: -50px; 
  }
  
  .shape-2 { 
    width: 150px; 
    height: 150px; 
    top: 20%; 
    right: -20px; 
    background: rgba(255, 255, 255, 0.05); 
  }
  
  .login-right { 
    flex: 1; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    padding: 40px; 
    background: white; 
  }
  
  .form-wrapper { 
    width: 100%; 
    max-width: 380px; 
  }
  
  .role-toggle { 
    display: flex; 
    background: #f1f5f9; 
    border-radius: 12px; 
    padding: 6px; 
    margin-bottom: 30px; 
  }
  
  .role-toggle button { 
    flex: 1; 
    padding: 12px; 
    border: none; 
    background: transparent; 
    border-radius: 8px; 
    font-weight: 800; 
    font-size: 0.9rem; 
    color: #64748b; 
    cursor: pointer; 
    transition: 0.3s; 
  }
  
  .role-toggle button.active { 
    background: white; 
    color: #800000; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
  }
  
  .form-wrapper h2 { 
    font-size: 2rem; 
    color: #1e293b; 
    margin: 0 0 10px 0; 
    font-weight: 900; 
  }
  
  .subtitle { 
    color: #64748b; 
    font-size: 0.95rem; 
    margin-bottom: 30px; 
    line-height: 1.5; 
  }
  
  .login-form { 
    display: flex; 
    flex-direction: column; 
    gap: 20px; 
  }
  
  .input-group { 
    display: flex; 
    flex-direction: column; 
    gap: 8px; 
  }
  
  .input-group label { 
    font-size: 0.85rem; 
    font-weight: 700; 
    color: #475569; 
    text-transform: uppercase; 
    letter-spacing: 0.5px; 
  }
  
  .input-group input { 
    padding: 14px 16px; 
    border: 2px solid #e2e8f0; 
    border-radius: 10px; 
    font-size: 1rem; 
    color: #1e293b; 
    transition: 0.3s; 
    outline: none; 
    background: white; 
  }
  
  .input-group input:focus { 
    border-color: #800000; 
    box-shadow: 0 0 0 4px rgba(128,0,0,0.1); 
  }
  
  .error-text { 
    color: #dc2626; 
    font-size: 0.85rem; 
    font-weight: 700; 
    margin: 0; 
  }
  
  .login-btn { 
    margin-top: 10px; 
    background: #800000; 
    color: #ffd700; 
    border: none; 
    padding: 16px; 
    border-radius: 10px; 
    font-size: 1.1rem; 
    font-weight: 800; 
    cursor: pointer; 
    transition: 0.3s; 
  }
  
  .login-btn:hover:not(:disabled) { 
    background: #600000; 
    transform: translateY(-2px); 
    box-shadow: 0 4px 12px rgba(128,0,0,0.2); 
  }
  
  .login-btn:disabled { 
    opacity: 0.7; 
    cursor: not-allowed; 
  }
  
  .footer-links { 
    margin-top: 30px; 
    display: flex; 
    justify-content: space-between; 
    font-size: 0.85rem; 
  }
  
  .footer-links a { 
    color: #800000; 
    text-decoration: none; 
    font-weight: 700; 
  }
  
  .footer-links a:hover { 
    text-decoration: underline; 
  }
</style>
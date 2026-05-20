<template>
  <div class="section-container" :class="{ 'dark-theme': isDarkMode }">
    <h2>Theme & Interface</h2>
    
    <div class="setting-group">
      <div class="setting-item">
        <div>
          <h4>Dark Mode</h4>
          <p>Toggle between light and dark themes.</p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="setting-item">
        <div>
          <h4>Language</h4>
          <p>Select your preferred portal language.</p>
        </div>
        <select v-model="selectedLanguage" class="form-select">
          <option value="en">English (US)</option>
          <option value="tl">Filipino</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <div class="setting-item">
        <div>
          <h4>Compact View</h4>
          <p>Reduce whitespace to fit more content on screen.</p>
        </div>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const isDarkMode = ref(false)
const selectedLanguage = ref('en')

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
  }
})

watch(isDarkMode, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
})
</script>

<style scoped>
  .section-container { 
    display: flex; 
    flex-direction: column; 
    gap: 20px; 
    padding: 20px; 
    border-radius: 12px; 
    transition: background-color 0.3s ease; 
  }
  
  h2 { 
    color: #1e293b; 
    border-bottom: 2px solid #f1f5f9; 
    padding-bottom: 10px; 
    margin-top: 0; 
    transition: color 0.3s; 
  }
  
  .setting-group { 
    display: flex; 
    flex-direction: column; 
    gap: 15px; 
  }
  
  .setting-item { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 15px; 
    background: #f8fafc; 
    border-radius: 12px; 
    border: 1px solid #e2e8f0; 
    transition: all 0.3s ease; 
  }
  
  .setting-item h4 { 
    margin: 0 0 5px 0; 
    color: #334155; 
    transition: color 0.3s; 
  }
  
  .setting-item p { 
    margin: 0; 
    font-size: 0.85rem; 
    color: #64748b; 
    transition: color 0.3s; 
  }
  
  .form-select { 
    padding: 8px 12px; 
    border-radius: 8px; 
    border: 1px solid #cbd5e1; 
    outline: none; 
    font-family: inherit; 
    background: #fff; 
    transition: all 0.3s ease; 
  }

  .switch { 
    position: relative; 
    display: inline-block; 
    width: 50px; 
    height: 26px; 
    flex-shrink: 0; 
  }
  
  .switch input { 
    opacity: 0; 
    width: 0; 
    height: 0; 
  }
  
  .slider { 
    position: absolute; 
    cursor: pointer; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    background-color: #cbd5e1; 
    transition: .4s; 
    border-radius: 34px; 
  }
  
  .slider:before { 
    position: absolute; 
    content: ""; 
    height: 18px; 
    width: 18px; 
    left: 4px; 
    bottom: 4px; 
    background-color: white; 
    transition: .4s; 
    border-radius: 50%; 
  }
  
  input:checked + .slider { 
    background-color: #800000; 
  }
  
  input:checked + .slider:before { 
    transform: translateX(24px); 
  }



.dark-theme {
  background-color: #0f172a; 
}
.dark-theme h2 { 
  color: #f8fafc; 
  border-bottom-color: #334155; 
}
.dark-theme .setting-item { 
  background: #1e293b; 
  border-color: #334155; 
}
.dark-theme .setting-item h4 { 
  color: #f1f5f9; 
}
.dark-theme .setting-item p { 
  color: #94a3b8; 
}
.dark-theme .form-select { 
  background: #0f172a; 
  color: #f1f5f9; 
  border-color: #475569; 
}
</style>
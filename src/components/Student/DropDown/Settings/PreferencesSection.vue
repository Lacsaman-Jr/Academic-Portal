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
import { ref, inject, Ref } from 'vue'

const isDarkMode = inject<Ref<boolean>>('isDarkMode', ref(false))
const selectedLanguage = ref('en')
</script>

<style scoped>
  .section-container { 
    background: white; 
    border-radius: 12px; 
    padding: 2rem; 
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
    max-width: 800px; 
    margin: 0 auto; 
    transition: all 0.3s ease;
  }
  
  h2 { 
    color: #800000; 
    margin: 0 0 1.5rem; 
    font-size: 1.5rem; 
    border-bottom: 2px solid #f1f5f9; 
    padding-bottom: 0.5rem; 
    transition: border-color 0.3s ease;
  }
  
  .setting-group { 
    display: flex; 
    flex-direction: column; 
    gap: 1.5rem; 
  }
  
  .setting-item { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding-bottom: 1.5rem; 
    border-bottom: 1px solid #f1f5f9; 
    transition: border-color 0.3s ease;
  }
  
  .setting-item:last-child { 
    border-bottom: none; 
    padding-bottom: 0; 
  }
  
  h4 { 
    margin: 0 0 0.25rem; 
    color: #334155; 
    font-size: 1.1rem; 
    transition: color 0.3s;
  }
  
  p { 
    margin: 0; 
    color: #64748b; 
    font-size: 0.9rem; 
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

  /* --- DARK THEME OVERRIDES FOR PREFERENCES --- */
  .dark-theme.section-container {
    background: #1e293b;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);
  }

  .dark-theme h2 {
    color: #ffd700;
    border-bottom-color: #334155;
  }

  .dark-theme .setting-item {
    border-bottom-color: #334155;
  }

  .dark-theme h4 {
    color: #f1f5f9;
  }

  .dark-theme p {
    color: #94a3b8;
  }

  .dark-theme .form-select {
    background: #0f172a;
    color: #f1f5f9;
    border-color: #475569;
  }

  .dark-theme .slider {
    background-color: #475569;
  }

  .dark-theme input:checked + .slider {
    background-color: #ffd700;
  }

  .dark-theme input:checked + .slider:before {
    background-color: #800000;
  }
</style>

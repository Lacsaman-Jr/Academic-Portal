<script setup lang="ts">
  import { ref } from 'vue'
  const props = defineProps(['subjects'])
  const activeSyllabus = ref(null)
</script>

<template>
  <div class="syllabus-view">
    <div v-if="!activeSyllabus" class="grid-dashboard">
      <div class="grid-5x7">
        <div v-for="sub in props.subjects" :key="sub.id" class="grid-tile" @click="activeSyllabus = sub">
          <div class="tile-code">{{ sub.code }} ({{ sub.units.toFixed(2) }} u)</div>
          <div class="tile-title">{{ sub.title }}</div>
          <div class="tile-action">Read Syllabus →</div>
        </div>
      </div>
    </div>

    <div v-else class="module-overlay">
      <div class="module-content">
        <button class="inner-back-btn" @click="activeSyllabus = null">← Back to List</button>
        
        <header class="module-header">
          <span class="badge">{{ activeSyllabus.code }} Syllabus</span>
          <h1>{{ activeSyllabus.title }}</h1>
        </header>
        <div class="info-section">
          <h3>Course Description</h3>
          <p>{{ activeSyllabus.description }}</p>
        </div>
        <div class="info-section highlight">
          <h3>Course Credits: {{ activeSyllabus.units.toFixed(2) }} Units</h3>
          <p>Retention Policy: Grade must be higher than 2.0 to proceed to following majors.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .grid-dashboard { 
    max-width: 1300px; 
    margin: 40px auto; 
    padding: 0 20px; 
  }
  
  .grid-5x7 { 
    display: grid; 
    grid-template-columns: repeat(5, 1fr); 
    gap: 15px; 
  }
  
  .grid-tile { 
    background: white; 
    border: 1px solid #e2e8f0; 
    border-radius: 15px; 
    padding: 13px; 
    cursor: pointer; 
    transition: 0.2s; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
  }
  
  .grid-tile:hover { 
    transform: translateY(-3px); 
    border-color: #800000; 
    box-shadow: 0 8px 12px rgba(0,0,0,0.1); 
  }
  
  .tile-code { 
    font-weight: 800; 
    color: #800000; 
    font-size: 0.8rem; 
  }
  
  .tile-title { 
    font-size: 0.9rem; 
    font-weight: 600; 
    color: #475569; 
    margin-top: 5px; 
  }
  
  .tile-action { 
    font-size: 0.65rem; 
    color: #94a3b8; 
    font-weight: bold; 
    margin-top: 5px; 
  }

  .module-overlay { 
    padding: 40px; 
    display: flex; 
    justify-content: center; 
    min-height: 100%; 
    background: #f8fafc; 
  }
  
  .module-content { 
    width: 100%; 
    max-width: 900px; 
    background: white; 
    padding: 60px; 
    border-radius: 16px; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
    position: relative; 
  }
  
  .inner-back-btn { 
    position: absolute; 
    top: 20px; 
    left: 20px; 
    background: #f1f5f9; 
    color: #64748b; 
    border: none; 
    padding: 8px 16px; 
    border-radius: 16px; 
    font-weight: bold; 
    cursor: pointer; 
    transition: 0.2s; 
  }
  
  .inner-back-btn:hover { 
    background: #e2e8f0; 
    color: #800000; 
  }
  
  .badge { 
    background: #800000; 
    color: #ffd700; 
    padding: 4px 12px; 
    border-radius: 12px; 
    font-weight: 800; 
    font-size: 0.75rem; 
  }
  
  .module-header h1 { 
    margin-top: 15px; 
    color: #1e293b; 
    font-size: 2rem; 
  }
  
  .info-section { 
    margin-top: 25px; 
  }
  
  .info-section h3 { 
    color: #800000; 
    font-size: 1.1rem; 
    margin-bottom: 10px; 
  }
  
  .info-section p { 
    font-size: 1.05rem; 
    line-height: 1.6; 
    color: #475569; 
  }
  
  .highlight { 
    background: #fffdf2; 
    padding: 20px; 
    border-radius: 10px; 
    border-left: 5px solid #ffd700; 
    margin-top: 30px; 
  }
</style>
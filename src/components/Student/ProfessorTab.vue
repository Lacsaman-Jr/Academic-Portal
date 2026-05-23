<script setup lang="ts">
  import { ref } from 'vue'
  const props = defineProps(['professors'])
  const activeProf = ref<any>(null)

  const getProfImageName = (fullName: string) => {
    if (!fullName) return '';
    const parts = fullName.split(',');
    if (parts.length < 2) return `/${fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg`;
    
    const lastName = parts[0].trim().toLowerCase();
    const firstName = parts[1].trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    
    return `/${firstName}${lastName}.jpg`; 
  }

  const handleImgError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  }
</script>

<template>
  <div class="prof-view">
    <div v-if="!activeProf" class="grid-dashboard">
      <div class="prof-grid-5">
        <div v-for="prof in props.professors" :key="prof.name" class="prof-card" @click="activeProf = prof">
          
          <div class="prof-avatar-container">
            <div class="prof-avatar">
              <img :src="getProfImageName(prof.name)" class="prof-real-img" @error="handleImgError" />
              <span class="letter-fallback">{{ prof.name.split(',')[0].slice(-1) }}</span>
            </div>
          </div>

          <div class="prof-name-text">{{ prof.name }}</div>
          <div class="prof-sub-text">{{ prof.expertise }}</div>
          
          <div class="mini-subjects" v-if="prof.subjects">
            <span v-for="sub in prof.subjects" :key="sub" class="mini-tag">{{ sub }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="module-overlay">
      <button class="back-btn" @click="activeProf = null">← Back to Directory</button>
      
      <div class="module-content">
        <header class="module-header">
          <span class="badge">Faculty Profile</span>
          
          <div class="header-profile-row">
            <div class="prof-avatar detail-avatar">
              <img :src="getProfImageName(activeProf.name)" class="prof-real-img" @error="handleImgError" />
              <span class="letter-fallback">{{ activeProf.name.split(',')[0].slice(-1) }}</span>
            </div>
            <div>
              <h1>{{ activeProf.name }}</h1>
              <p class="detail-expertise">{{ activeProf.expertise }}</p>
            </div>
          </div>
        </header>

        <div class="info-section consultation-box" v-if="activeProf.consultation">
          <h3>📅 Consultation Hours</h3>
          <p class="highlight-text">{{ activeProf.consultation }}</p>
        </div>

        <div class="info-section" v-if="activeProf.subjects">
          <h3>📚 Assigned Course Tracks</h3>
          <div class="subject-badge-container">
            <span v-for="sub in activeProf.subjects" :key="sub" class="large-subject-tag">
              {{ sub }}
            </span>
          </div>
        </div>

        <div class="info-section highlight">
          <h3>Specialization</h3>
          <p>{{ activeProf.expertise }}</p>
        </div>

        <div class="info-section">
          <h3>Biography & Expertise</h3>
          <p>{{ activeProf.description }}</p>
        </div>

        <div class="action-footer" v-if="activeProf.email">
          <a :href="'mailto:' + activeProf.email" class="email-action-btn">
            📧 Send Academic Email
          </a>
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
  
  .prof-grid-5 { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
    gap: 20px; 
  }
  
  .prof-card { 
  background: white; 
  border-radius: 15px; 
  padding: 22px 15px; 
  text-align: center; 
  border: 1px solid #e2e8f0; 
  cursor: pointer; 
  transition: 0.3s; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 12px;
}
  
  .prof-card:hover { 
    border-color: #800000; 
    transform: translateY(-5px); 
    box-shadow: 0 10px 15px rgba(0,0,0,0.05); 
  }
  
  .prof-avatar-container {
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
  }

  .prof-avatar { 
    width: 70px; 
    height: 70px; 
    background: #800000; 
    color: #ffd700; 
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-weight: 900; 
    font-size: 1.5rem; 
    position: relative;
    overflow: hidden;
    border: 2px solid #e2e8f0;
  }

  .header-profile-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 15px;
  }

  .detail-avatar {
    width: 90px;
    height: 90px;
    font-size: 2rem;
    flex-shrink: 0;
    border-color: #800000;
  }

  .prof-real-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    background: white;
  }

  .letter-fallback {
    position: relative;
    z-index: 1;
  }
  
  .prof-name-text { 
    font-weight: 800; 
    color: #1e293b; 
    font-size: 0.95rem; 
    margin-bottom: 5px; 
  }
  
  .prof-sub-text { 
    font-size: 0.75rem; 
    color: #64748b; 
    font-weight: 600; 
    margin-bottom: 10px;
  }

  .mini-subjects {
    display: flex;
    gap: 6px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: auto;
  }

  .mini-tag {
    background: #f1f5f9;
    color: #475569;
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 6px;
    font-weight: 700;
  }

  .module-overlay { 
    padding: 40px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    min-height: 100%; 
    background: #f8fafc; 
  }
  
  .back-btn { 
    align-self: flex-start; 
    margin-left: calc(50% - 450px); 
    background: #1e293b; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    border-radius: 16px; 
    cursor: pointer; 
    margin-bottom: 20px; 
    font-weight: bold; 
    transition: 0.2s;
  }

  .back-btn:hover {
    background: #800000;
  }
  
  .module-content { 
    width: 100%; 
    max-width: 900px; 
    background: white; 
    padding: 40px; 
    border-radius: 16px; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
  }
  
  .badge { 
    background: #800000; 
    color: #ffd700; 
    padding: 4px 12px; 
    border-radius: 12px; 
    font-weight: 800; 
    font-size: 0.75rem; 
  }
  
  h1 { 
    color: #1e293b; 
    margin: 0 0 4px 0;
    font-size: 2rem; 
  }

  .detail-expertise {
    margin: 0;
    color: #64748b;
    font-weight: 500;
    font-size: 1rem;
  }
  
  .info-section { 
    margin-top: 25px; 
  }
  
  .info-section h3 { 
    color: #800000; 
    font-size: 1rem; 
    margin-bottom: 8px; 
    text-transform: uppercase; 
    letter-spacing: 1px; 
  }
  
  .info-section p { 
    font-size: 1.05rem; 
    line-height: 1.6; 
    color: #334155; 
    margin: 0;
  }

  .consultation-box {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 16px 20px;
    border-radius: 12px;
  }

  .consultation-box h3 {
    color: #16a34a !important;
  }

  .highlight-text {
    font-weight: 700;
    color: #14532d;
    font-size: 1.1rem;
  }

  .subject-badge-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .large-subject-tag {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
    padding: 6px 14px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.9rem;
  }
  
  .highlight { 
    background: #fffdf2; 
    padding: 20px; 
    border-radius: 10px; 
    border-left: 5px solid #ffd700; 
  }

  .action-footer {
    margin-top: 35px;
    border-top: 1px solid #e2e8f0;
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .email-action-btn {
    background: #800000;
    color: white;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    box-shadow: 0 4px 6px rgba(128, 0, 0, 0.15);
    transition: 0.2s;
  }

  .email-action-btn:hover {
    background: #600000;
    transform: translateY(-2px);
  }
</style>

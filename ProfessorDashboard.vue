<script setup lang="ts">
import { ref } from 'vue'
import ProfManageClassTab from '../components/ProfManageClassTab.vue'
import ProfAnnouncementTab from '../components/ProfAnnouncementTab.vue'

const props = defineProps(['announcementsData'])
const emit = defineEmits(['logout', 'add-announcement'])

const currentTab = ref('manage')

// Fake assigned classes for the Professor
const myClasses = ref([
  { id: 'CCC101', code: 'CCC101', title: 'Computer Programming 1', section: 'Sec A', students: 35 },
  { id: 'CCC102', code: 'CCC102', title: 'Computer Programming 2', section: 'Sec B', students: 40 },
])
</script>

<template>
  <div class="prof-app">
    <header class="prof-top-nav">
      <div class="nav-left">
        <div class="logo">MSU Faculty Portal</div>
        <nav class="tabs">
          <button :class="{ active: currentTab === 'manage' }" @click="currentTab = 'manage'">Manage Classes</button>
          <button :class="{ active: currentTab === 'announcements' }" @click="currentTab = 'announcements'">Announcements</button>
        </nav>
      </div>
      <div class="nav-right">
        <span class="welcome">Prof. Lucman</span>
        <button class="logout-btn" @click="emit('logout')">Sign Out</button>
      </div>
    </header>

    <main class="prof-content">
      <ProfManageClassTab 
        v-if="currentTab === 'manage'" 
        :classes="myClasses" 
      />
      
      <ProfAnnouncementTab 
        v-if="currentTab === 'announcements'" 
        :classes="myClasses" 
        :announcementsData="props.announcementsData"
        @add-announcement="(subjectId, post) => emit('add-announcement', subjectId, post)"
      />
    </main>
  </div>
</template>

<style scoped>
.prof-app { width: 100vw; height: 100vh; display: flex; flex-direction: column; background: #f8fafc; overflow: hidden; }
.prof-top-nav { background: #1e293b; color: white; padding: 0 40px; height: 75px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 100; }
.nav-left { display: flex; align-items: center; gap: 40px; height: 100%; }
.logo { font-weight: 900; color: #ffd700; font-size: 1.2rem; }
.tabs { display: flex; height: 100%; align-items: flex-end; gap: 10px; }
.tabs button { background: transparent; border: none; color: #cbd5e1; padding: 15px 20px; cursor: pointer; font-weight: 700; border-bottom: 3px solid transparent; transition: 0.2s; }
.tabs button.active { color: white; border-bottom: 3px solid #ffd700; }
.nav-right { display: flex; align-items: center; gap: 20px; }
.welcome { font-size: 0.95rem; font-weight: 600; color: #cbd5e1; }
.logout-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; }
.logout-btn:hover { background: #ef4444; border-color: #ef4444; }
.prof-content { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
</style>
<script setup lang="ts">
import { ref } from 'vue'
import ProfAnnouncementTab from '../components/Professor/ProfAnnouncementTab.vue'
import ProfManageClassTab from '../components/Professor/ProfManageClassTab.vue'

import Prof_Settings from '../components/Professor/DropDown/Prof_Settings.vue'
import Prof_About from '../components/Professor/DropDown/Prof_About.vue'
import MSUCalendarTab from '../components/Student/MSUCalendarTab.vue'

const props = defineProps(['announcementsData'])
const emit = defineEmits(['logout', 'add-announcement'])

const currentTab = ref('manage')
const isDropdownOpen = ref(false) 

const myClasses = ref([
  { id: 'CCC101', code: 'CCC101', title: 'Computer Programming 1', section: 'Sec A', students: 35 },
  { id: 'CCC102', code: 'CCC102', title: 'Computer Programming 2', section: 'Sec B', students: 40 },
])

const handleDropdownClick = (option: string) => {
  isDropdownOpen.value = false;
  if (option === 'logout') {
    emit('logout');
  } else {
    currentTab.value = option;
  }
}
</script>

<template>
  <div class="prof-app">
    <header class="prof-top-nav">
      
      <div class="nav-left">
        
        <div class="brand-wrapper" style="display: flex; align-items: center; gap: 15px;">
          <div class="dropdown-container">
            <button class="menu-btn" @click="isDropdownOpen = !isDropdownOpen">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <button @click="handleDropdownClick('settings')">Settings</button>
              <button @click="handleDropdownClick('about')">About</button>
              <button class="logout-opt" @click="handleDropdownClick('logout')">Sign Out</button>
            </div>
          </div>
          <div class="logo">MSU Faculty Portal</div>
        </div>

        <nav class="tabs">
          <button :class="{ active: currentTab === 'manage' }" @click="currentTab = 'manage'">Manage Classes</button>
          <button :class="{ active: currentTab === 'announcements' }" @click="currentTab = 'announcements'">Announcements</button>
          <button :class="{ active: currentTab === 'calendar' }" @click="currentTab = 'calendar'">Calendar</button>
        </nav>
      </div>
      
      <div class="nav-right">
        <span class="welcome">Prof. Lucman</span>
        </div>
      
    </header>

    <main class="prof-content">
      <ProfManageClassTab 
        v-if="currentTab === 'manage'" 
        :classes="myClasses" 
      />
      
      <ProfAnnouncementTab 
        v-else-if="currentTab === 'announcements'" 
        :classes="myClasses" 
        :announcementsData="props.announcementsData"
        @add-announcement="(subjectId, post) => emit('add-announcement', subjectId, post)"
      />
      
      <MSUCalendarTab 
        v-if="currentTab === 'calendar'"
        :classes="myClasses" 
       />

      <Prof_Settings v-else-if="currentTab === 'settings'" />
      <Prof_AccountSettings v-else-if="currentTab === 'account-settings'" />
      <Prof_About v-else-if="currentTab === 'about'" />
    </main>
  </div>
</template>

<style scoped>
  .prof-app { 
    width: 100vw; 
    height: 100vh; 
    display: flex; 
    flex-direction: column; 
    background: #f8fafc; 
    overflow: hidden; 
  }
  
  .prof-top-nav { 
    background: #1e293b; 
    color: white; 
    padding: 0 40px; 
    height: 75px; 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
    z-index: 100; 
  }
  
  .nav-left { 
    display: flex; 
    align-items: center; 
    gap: 40px; 
    height: 100%; 
  }
  
  .logo { 
    font-weight: 900; 
    color: #ffd700; 
    font-size: 1.2rem; 
  }
  
  .tabs { 
    display: flex; 
    height: 100%; 
    align-items: flex-end; 
    gap: 10px; 
  }
  
  .tabs button { 
    background: transparent; 
    border: none; 
    color: #cbd5e1; 
    padding: 15px 20px; 
    cursor: pointer; 
    font-weight: 700; 
    border-bottom: 3px solid transparent; 
    transition: 0.2s; 
  }
  
  .tabs button.active { 
    color: white; 
    border-bottom: 3px solid #ffd700; 
  }
  
  .nav-right { 
    display: flex; 
    align-items: center; 
    gap: 20px; 
  }
  
  .welcome { 
    font-size: 0.95rem; 
    font-weight: 600; 
    color: #cbd5e1; 
  }

  .logout-btn { 
    background: rgba(255,255,255,0.1); 
    border: 1px solid rgba(255,255,255,0.2); 
    color: white; 
    padding: 8px 16px; 
    border-radius: 6px; 
    font-weight: bold; 
    cursor: pointer; 
    transition: 0.2s; 
  }
  
  .logout-btn:hover { 
    background: #ef4444; 
    border-color: #ef4444; 
  }

  .prof-content { 
    flex: 1; 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
  }

  .dropdown-container { 
    position: relative; 
    display: flex; 
    align-items: center; 
  }
  
  .menu-btn { 
    background: transparent; 
    border: none; 
    color: white; 
    cursor: pointer; 
    padding: 5px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    transition: 0.2s; 
    border-radius: 8px;
  }
  
  .menu-btn:hover { 
    background: rgba(255,255,255,0.1); 
  }

  .dropdown-menu { 
    position: absolute; 
    top: 130%; 
    left: 0; 
    background: white; 
    border-radius: 12px; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.15); 
    width: 220px; 
    display: flex; 
    flex-direction: column; 
    overflow: hidden; 
    z-index: 200; 
    border: 1px solid #e2e8f0;
  }
  
  .dropdown-menu button { 
    padding: 15px 20px; 
    background: transparent; 
    border: none; 
    text-align: left; 
    font-size: 0.95rem; 
    font-weight: 700; 
    color: #334155; 
    cursor: pointer; 
    transition: 0.2s; 
    border-bottom: 1px solid #f1f5f9; 
    opacity: 1; 
  }
  
  .dropdown-menu button:last-child { 
    border-bottom: none; 
  }
  
  .dropdown-menu button:hover { 
    background: #f8fafc; 
    color: #800000; 
    padding-left: 25px; 
  }
  
  .dropdown-menu button.logout-opt { 
    color: #e11d48; 
  }
  
  .dropdown-menu button.logout-opt:hover { 
    color: #be123c; 
    background: #fff1f2; 
  }
</style>

<template>
  <div class="settings-wrapper">
    <div class="settings-header">
      <h1>Settings</h1>
      <p>Manage your preferences, account security, and notification configurations.</p>
    </div>
    
    <div class="settings-container">
      <aside class="settings-sidebar">
        <button 
          :class="{ active: activeSection === 'preferences' }" 
          @click="activeSection = 'preferences'"
        >
          🎨 Preferences
        </button>
        <button 
          :class="{ active: activeSection === 'account' }" 
          @click="activeSection = 'account'"
        >
          👤 Account Settings
        </button>
        <button 
          :class="{ active: activeSection === 'notifications' }" 
          @click="activeSection = 'notifications'"
        >
          🔔 Notifications
        </button>
        <button 
          :class="{ active: activeSection === 'advanced' }" 
          @click="activeSection = 'advanced'"
        >
          🛠️ Advanced / Etc
        </button>
      </aside>

      <main class="settings-content">
        <PreferencesSection v-if="activeSection === 'preferences'" />
        <AccountSection v-if="activeSection === 'account'" />
        <NotificationsSection v-if="activeSection === 'notifications'" />
        <AdvancedSection v-if="activeSection === 'advanced'" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PreferencesSection from './Settings/PreferencesSection.vue'
import AccountSection from './Settings/AccountSection.vue'
import NotificationsSection from './Settings/NotificationsSection.vue'
import AdvancedSection from './Settings/AdvancedSection.vue'

const activeSection = ref('preferences')
</script>

<style scoped>
.settings-wrapper { 
  padding: 20px; 
  height: 100%; 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  box-sizing: border-box; 
}

.settings-header { 
  background: white; 
  padding: 25px 30px; 
  border-radius: 16px; 
  border: 1px solid #e2e8f0; 
  border-left: 8px solid #800000; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
}

.settings-header h1 { 
  margin: 0 0 5px 0; 
  font-size: 1.8rem; color: #1e293b; 
  font-weight: 900; 
}

.settings-header p { 
  margin: 0; 
  color: #64748b; 
  font-size: 1rem; 
}

.settings-container { 
  display: flex; 
  flex: 1; 
  gap: 20px; 
  min-height: 0; 
}

.settings-sidebar { 
  width: 250px; 
  background: white; 
  padding: 20px 15px; 
  border-radius: 16px; 
  border: 1px solid #e2e8f0; 
  display: flex; 
  flex-direction: column; 
  gap: 10px; 
  overflow-y: auto; 
}

.settings-sidebar button { 
  padding: 15px 20px; 
  border: none; 
  background: transparent; 
  text-align: left; 
  font-size: 1rem; 
  font-weight: 600; 
  color: #64748b; 
  border-radius: 12px; 
  cursor: pointer; 
  transition: all 0.2s ease; 
  display: flex; 
  align-items: center; 
  gap: 10px; 
}

.settings-sidebar button:hover { 
  background: #f8fafc; 
  color: #1e293b; 
}

.settings-sidebar button.active { 
  background: #800000; 
  color: white; 
  box-shadow: 0 4px 10px rgba(128,0,0,0.2); 
}

.settings-content { 
  flex: 1; 
  background: white; 
  border-radius: 16px; 
  border: 1px solid #e2e8f0; 
  padding: 30px; 
  overflow-y: auto; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
}

</style>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  professors: any[]
}>()

const activeProf = ref<any>(null)

const getInitials = (fullName: string | undefined | null): string => {
  if (!fullName || typeof fullName !== 'string') return 'P'
  const cleanName = fullName.replace(/^(Prof\.|Professor|Dr\.)\s+/i, '').trim()
  const words = cleanName.split(' ').filter(word => word.length > 0)
  
  if (words.length >= 2 && words[0] && words[1]) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
  }
  if (words.length === 1 && words[0]) {
    return words[0].charAt(0).toUpperCase()
  }
  return 'P'
}
</script>

<template>
  <div class="prof-view-container">
    
    <div v-if="!activeProf" class="directory-dashboard">
      <div class="professors-grid-layout">
        <div 
          v-for="prof in props.professors" 
          :key="prof?.name || Math.random().toString()" 
          class="professor-card" 
          @click="activeProf = prof"
        >
          <div class="avatar-circle">
            <span class="initials-text">{{ getInitials(prof?.name) }}</span>
          </div>
          
          <h3 class="faculty-full-name">{{ prof?.name || 'Faculty Member' }}</h3>
          <p class="faculty-rank-role">{{ prof?.['DESIGNATION'] || prof?.role || 'Faculty' }}</p>
          <p class="faculty-specialization-tag">🎯 {{ prof?.['SPECIALIZATION'] || prof?.specialization || 'Computer Science' }}</p>
        </div>
      </div>
    </div>

    <div v-else class="detailed-profile-wrapper">
      <button class="back-to-directory-btn" @click="activeProf = null">← Back to Directory</button>
      
      <div class="two-column-profile-layout">
        
        <div class="profile-left-sidebar">
          <div class="avatar-circle large-avatar">
            <span class="initials-text">{{ getInitials(activeProf?.name) }}</span>
          </div>
          <h2 class="sidebar-faculty-name">{{ activeProf?.name || 'Faculty Member' }}</h2>
          <p class="sidebar-faculty-specialization">{{ activeProf?.['SPECIALIZATION'] || activeProf?.specialization }}</p>
        </div>

        <div class="profile-right-sheet-panel">
          <div class="academic-profile-sheet-card">
            <span class="profile-sheet-badge">Faculty Profile Sheet</span>

            <div class="profile-data-block">
              <h4 class="data-block-label">PRIMARY SPECIALIZATION</h4>
              <p class="data-block-text-value">
                🎨 {{ activeProf?.['SPECIALIZATION'] || activeProf?.specialization || 'Not Specified' }}
              </p>
            </div>

            <div class="profile-data-block consultation-box-container">
              <h4 class="data-block-label consultation-label">📅 CONSULTATION HOURS</h4>
              <p class="consultation-hours-text">
                {{ activeProf?.['CONSULTATION'] || activeProf?.consultation || 'Available by Email Appointment' }}
              </p>
            </div>

            <div class="profile-data-block">
              <h4 class="data-block-label">📚 HANDLED COURSES</h4>
              <div class="courses-flex-chips-group">
                <template v-if="Array.isArray(activeProf?.['HANDLED COURSES'] || activeProf?.handledCourses)">
                  <span 
                    v-for="course in (activeProf?.['HANDLED COURSES'] || activeProf?.handledCourses)" 
                    :key="course" 
                    class="badge-course-chip"
                  >
                    {{ course }}
                  </span>
                </template>
                <template v-else-if="activeProf?.['HANDLED COURSES'] || activeProf?.handledCourses">
                  <span class="badge-course-chip">
                    {{ activeProf?.['HANDLED COURSES'] || activeProf?.handledCourses }}
                  </span>
                </template>
                <template v-else>
                  <span class="badge-course-chip empty-fallback-chip">General Track Courses</span>
                </template>
              </div>
            </div>

            <div class="profile-data-block">
              <h4 class="data-block-label">BIOGRAPHY & ACADEMIC BACKGROUND</h4>
              <p class="data-block-text-value biography-body-text">
                {{ activeProf?.['BIOGRAPHY'] || activeProf?.biography || activeProf?.description || 'Biographical statement is currently being updated by the department administration.' }}
              </p>
            </div>

            <div class="profile-data-block email-display-footer-bar">
              <h4 class="data-block-label">OFFICIAL EMAIL ADDRESS</h4>
              <div class="email-flex-container-row">
                <p class="email-monospace-display">
                  <code>{{ activeProf?.['EMAIL ADDRESS'] || activeProf?.email || 'faculty@msu.edu.ph' }}</code>
                </p>
                <a 
                  v-if="activeProf?.['EMAIL ADDRESS'] || activeProf?.email"
                  :href="'mailto:' + (activeProf?.['EMAIL ADDRESS'] || activeProf?.email)" 
                  class="send-email-action-link"
                >
                  ✉️ Send Email
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
  .prof-view-container { font-family: system-ui, -apple-system, sans-serif; padding: 24px; min-height: 85vh; background-color: #f8fafc; color: #1e293b; }
  .directory-dashboard { max-width: 1300px; margin: 0 auto; }
  
  .professors-grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 28px; }
  
  .professor-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px 20px; text-align: center; cursor: pointer; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease; }
  .professor-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -3px rgba(0,0,0,0.08); }
  
  .avatar-circle { width: 96px; height: 96px; background-color: #800000; color: #ffd700; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(128, 0, 0, 0.15); }
  .avatar-circle .initials-text { font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; }
  
  .faculty-full-name { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 20px 0 6px 0; line-height: 1.3; }
  .faculty-rank-role { font-size: 0.8rem; font-weight: 700; color: #475569; background-color: #f1f5f9; padding: 3px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.02em; }
  .faculty-specialization-tag { font-size: 0.9rem; color: #2563eb; font-weight: 600; margin: 12px 0 0 0; }

  .detailed-profile-wrapper { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
  .back-to-directory-btn { align-self: flex-start; background-color: #1e293b; color: #ffffff; border: none; padding: 12px 24px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 0.9rem; transition: background-color 0.15s ease; }
  .back-to-directory-btn:hover { background-color: #0f172a; }

  .two-column-profile-layout { display: flex; gap: 32px; width: 100%; align-items: flex-start; flex-wrap: wrap; }
  
  .profile-left-sidebar { flex: 1; min-width: 260px; max-width: 320px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 40px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
  .large-avatar { width: 140px; height: 140px; }
  .large-avatar .initials-text { font-size: 2.8rem; }
  .sidebar-faculty-name { font-size: 1.55rem; font-weight: 800; color: #0f172a; margin: 18px 0 6px 0; line-height: 1.25; }
  .sidebar-faculty-specialization { font-weight: 600; color: #64748b; font-size: 0.9rem; margin: 0; }

  .profile-right-sheet-panel { flex: 2.5; min-width: 320px; }
  .academic-profile-sheet-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 44px 40px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); position: relative; }
  
  .profile-sheet-badge { position: absolute; top: 20px; left: 40px; background-color: #800000; color: #ffd700; padding: 4px 14px; border-radius: 20px; font-weight: 800; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; }
  
  .profile-data-block { margin-top: 32px; border-bottom: 1px solid #f1f5f9; padding-bottom: 24px; }
  .profile-data-block:last-of-type { border-bottom: none; padding-bottom: 0; }
  
  .data-block-label { font-size: 0.8rem; font-weight: 800; color: #800000; margin-bottom: 12px; margin-top: 0; letter-spacing: 0.06em; }
  .data-block-text-value { color: #334155; font-size: 1.05rem; font-weight: 600; margin: 0; }
  .biography-body-text { line-height: 1.65; color: #475569; font-weight: 400; }

  .consultation-box-container { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; padding: 20px; margin-top: 28px; }
  .consultation-label { color: #16a34a; margin-bottom: 8px; }
  .consultation-hours-text { font-size: 1.25rem; font-weight: 800; color: #14532d; margin: 0; }

  .courses-flex-chips-group { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
  .badge-course-chip { background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.02em; }
  .empty-fallback-chip { background-color: #f1f5f9; border-color: #cbd5e1; color: #475569; font-weight: 500; font-style: italic; }

  .email-display-footer-bar { background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 20px; margin-top: 28px; }
  .email-flex-container-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
  .email-monospace-display { margin: 0; }
  .email-monospace-display code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 1.1rem; color: #0f172a; font-weight: 700; background-color: #e2e8f0; padding: 4px 10px; border-radius: 6px; }
  
  .send-email-action-link { background-color: #800000; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; box-shadow: 0 2px 4px rgba(128, 0, 0, 0.1); transition: background-color 0.15s ease; }
  .send-email-action-link:hover { background-color: #600000; }
</style>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import Login from './components/Login.vue'
import StudentDashboard from './components/StudentDashboard.vue'
import ProfessorDashboard from './components/ProfessorDashboard.vue'

const isLoggedIn = ref(false)
const userRole = ref('')

// --- GLOBAL DARK MODE STATE ---
const isDarkMode = ref(false)
provide('isDarkMode', isDarkMode)

// Update the body background dynamically to prevent white scroll-bounces
watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.body.style.backgroundColor = '#0f172a'
  } else {
    document.body.style.backgroundColor = '#f8fafc'
  }
}, { immediate: true })

const handleLogin = (role: string) => {
  userRole.value = role
  isLoggedIn.value = true 
}

const handleLogout = () => {
  isLoggedIn.value = false
  userRole.value = ''
}

const announcementsData = ref<Record<string, any[]>>({
  'CCC101': [
    { type: 'Announcement', date: new Date().toISOString(), author: 'Professor Elcana', content: 'Welcome to Computer Programming 1! Please review the syllabus.' }
  ],
  'CCC102': [
    { type: 'Requirement', date: new Date().toISOString(), author: 'Professor Isra', content: 'Submit your OOP Project Proposal by Friday.' }
  ]
})

const addAnnouncement = (subjectId: string, post: any) => {
  const currentPosts = announcementsData.value[subjectId] || []
  
  announcementsData.value = {
    ...announcementsData.value,
    [subjectId]: [post, ...currentPosts] 
  }
}
</script>

<template>
  <Login v-if="!isLoggedIn" @login="handleLogin" />
  
  <StudentDashboard 
    v-else-if="userRole === 'student'" 
    :announcementsData="announcementsData"
    @logout="handleLogout" 
  />
  
  <ProfessorDashboard 
    v-else-if="userRole === 'professor'" 
    :announcementsData="announcementsData"
    @add-announcement="addAnnouncement"
    @logout="handleLogout" 
  />
</template>

<style>
  #app {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    text-align: left !important;
    height: 100vh;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    transition: background-color 0.3s ease;
  }
</style>

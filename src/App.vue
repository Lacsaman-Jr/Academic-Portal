<script setup lang="ts">
import { sharedAnnouncements } from './utils/sharedAnnouncements';
import { ref, computed } from 'vue'
import Login from './components/Login.vue'
import StudentDashboard from './components/StudentDashboard.vue'
import ProfessorDashboard from './components/ProfessorDashboard.vue'

const isLoggedIn = ref(false)
const userRole = ref('')

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
    { type: 'Announcement', date: 'May 23, 2026', title: 'Welcome!', content: 'Welcome to Programming 1!', author: 'Professor Elcana', scope: 'Professor Announcement' }
  ],
  'CCC102': [
    { type: 'Requirement', date: 'May 24, 2026', title: 'Project Proposal', content: 'Submit your OOP Proposal by Friday.', author: 'Professor Isra', scope: 'Professor Announcement' }
  ]
})

const flattenedAnnouncements = computed(() => {
  const professorPosts = Object.values(announcementsData.value).flat();
  return [...sharedAnnouncements.value, ...professorPosts];
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
    :subjects="[]"
    :announcementsData="flattenedAnnouncements"
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
    width: 100vw;
    height: 100vh;
  }

  * { box-sizing: border-box; }
  body, html { 
    margin: 0; padding: 0; background: #f8fafc; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    overflow: hidden; width: 100vw; height: 100vh; 
  }
</style>

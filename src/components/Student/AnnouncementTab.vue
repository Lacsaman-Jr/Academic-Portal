<template>
  <div class="announcement-container">
    <div class="header-section">
      <h2>📢 Academic Portal Announcements</h2>
      <p>Stay updated with the latest news, notices, and events across all campus levels.</p>
    </div>

    <div class="filter-container">
      <button 
        v-for="tab in filterTabs" 
        :key="tab"
        :class="['filter-btn', { active: activeFilter === tab }]"
        @click="activeFilter = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="announcements-grid">
      <div 
        v-for="(announcement, index) in filteredAnnouncements" 
        :key="index" 
        class="announcement-card"
        :style="{ borderColor: getScopeColor(announcement.scope) }"
      >
        <div class="card-meta">
          <span class="date-tag">📅 {{ announcement.date }}</span>
          <span :class="['scope-badge', announcement.scope.toLowerCase().replace(' ', '-')]">
            {{ announcement.scope }}
          </span>
        </div>
        <h3 class="announcement-title">{{ announcement.title }}</h3>
        <p class="announcement-content">{{ announcement.content }}</p>
        <div class="card-footer">
          <span class="author">Posted by: <strong>{{ announcement.author }}</strong></span>
        </div>
      </div>

      <div v-if="filteredAnnouncements.length === 0" class="empty-state">
        📭 No current announcements for this level.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Announcement {
  title: string;
  content: string;
  date: string;
  scope: 'Campus-Wide' | 'College-Level' | 'Department-Level';
  author: string;
}

const activeFilter = ref('All');
const filterTabs = ['All', 'Campus-Wide', 'College-Level', 'Department-Level'];

const announcements = ref<Announcement[]>([
  {
    title: 'Filing of Candidacy for EleCSyon 2026 ',
    content: 'Are you ready to lead and serve the computing community? The filing of certificates of candidacy for the upcoming POINTERS Computing Society Departmental Elections is now officially open. For the full list of available positions, eligibility requirements, and evaluation descriptions, please check the pinned post on our official POINTERS Facebook Page.',
    date: 'April 20, 2026',
    scope: 'Department-Level',
    author: 'POINTERS Computing Society'
  },
  {
    title: 'KASADYA 2026 Day 3',
    content: 'Get ready for Day 3 of KASADYA 2026 on May 14, 2026! Join us tomorrow for a full day of celebration featuring our CICS departmental exhibit booths, cultural presentations, and the final rounds of our inter-college sports tournaments. Let\'s show our maroon spirit and support our computing teams!',    
    date: 'May 5, 2026',
    scope: 'College-Level',
    author: 'CICS-BYTES'
  },
  {
    title: 'SSG Parliamentary Election 2026',
    content: 'Exercise your right to vote! The Supreme Student Government Parliamentary Elections will officially take place on May 21, 2026. Please log into your university student accounts or visit your designated polling stations to cast your ballots.',
    date: 'May 14, 2026',
    scope: 'Campus-Wide',
    author: 'MSU - Main Supreme Student Government'
  }
]);

const filteredAnnouncements = computed(() => {
  if (activeFilter.value === 'All') {
    return announcements.value;
  }
  return announcements.value.filter(item => item.scope === activeFilter.value);
});

const getScopeColor = (scope: string) => {
  if (scope === 'Campus-Wide') return '#800000';
  if (scope === 'College-Level') return '#4647a1';
  return '#a30053';
};
</script>

<style scoped>
.announcement-container {
  padding: 24px;
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
  min-height: 80vh;
}

.header-section {
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 16px;
}

.header-section h2 {
  color: #800000;
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.header-section p {
  color: #4b5563;
  font-size: 1rem;
}

.filter-container {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background-color: white;
  border-radius: 9999px;
  color: #4b5563;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.filter-btn.active {
  background-color: #800000;
  color: white;
  border-color: #800000;
}

.announcements-grid {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 900px;
}

.announcement-card {
  background: white;
  border-left: 5px solid #d1d5db;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.announcement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.date-tag {
  font-size: 0.85rem;
  color: #6b7280;
}

.scope-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  text-transform: uppercase;
}
.scope-badge.campus-wide { background-color: #fbefff; color: #800000; }
.scope-badge.college-level { background-color: #e3e4f9; color: #393a80; }
.scope-badge.department-level { background-color: #fce7f1; color: #850043; }

.announcement-title {
  font-size: 1.25rem;
  color: #111827;
  margin: 0 0 10px 0;
}

.announcement-content {
  color: #374151;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 16px;
}

.card-footer {
  font-size: 0.85rem;
  color: #6b7280;
  border-top: 1px solid #f3f4f6;
  padding-top: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
  background: white;
  border-radius: 8px;
  border: 1px dashed #d1d5db;
}
</style>

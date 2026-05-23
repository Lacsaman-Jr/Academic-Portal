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
          <span>Posted by: <strong>{{ announcement.author }}</strong></span>
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

const props = defineProps<{
  subjects?: any[];
  announcementsData?: any[];
}>();

const activeFilter = ref('All');
const filterTabs = ['All', 'Professor Announcement', 'Campus-Wide', 'College-Level', 'Department-Level'];

const combinedAnnouncements = computed(() => {
  const baseAnnouncements = [
    {
      date: 'May 23, 2026',
      scope: 'Campus-Wide',
      title: 'Welcome to the MSU Portal',
      content: 'The official campus portal announcement board is now online.',
      author: 'System Administrator'
    }
  ];

  const liveList = (props.announcementsData ?? []).map(item => ({
    date: item.date || 'Just now',
    scope: item.scope || 'Professor Announcement',
    title: item.title || 'Class Update',
    content: item.content || item.body || 'No content provided.',
    author: item.professorName || item.author || 'Department Faculty'
  }));

  return [...liveList, ...baseAnnouncements];
});

const filteredAnnouncements = computed(() => {
  if (activeFilter.value === 'All') return combinedAnnouncements.value;
  return combinedAnnouncements.value.filter(item => item.scope === activeFilter.value);
});

const getScopeColor = (scope: string) => {
  const colors: Record<string, string> = {
    'Professor Announcement': '#ffd700',
    'Campus-Wide': '#800000',
    'College-Level': '#4647a1',
    'Department-Level': '#a30053'
  };
  return colors[scope] || '#d1d5db';
};
</script>

<style scoped>
.announcement-container { padding: 24px; background-color: #f9fafb; min-height: 70vh; }
.header-section { margin-bottom: 24px; border-bottom: 2px solid #e5e7eb; padding-bottom: 16px; text-align: left; }
.header-section h2 { color: #800000; margin: 0 0 8px 0; }
.filter-container { display: flex; gap: 12px; margin-bottom: 24px; }
.filter-btn { padding: 8px 16px; border: 1px solid #d1d5db; background-color: white; border-radius: 9999px; cursor: pointer; }
.filter-btn.active { background-color: #800000; color: white; border-color: #800000; }
.announcements-grid { display: flex; flex-direction: column; gap: 16px; max-width: 800px; }
.announcement-card { background: white; border-left: 5px solid; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.scope-badge { font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; }
.empty-state { text-align: center; padding: 32px; background: white; border-radius: 8px; border: 1px dashed #d1d5db; }
</style>

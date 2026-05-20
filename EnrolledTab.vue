<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps(['subjects', 'professors', 'isUnlocked'])

  const enrolledSubjectsList = computed(() => {
    return props.subjects.filter((s: any) => props.isUnlocked(s) && !s.completed)
  })
</script>

<template>
  <div class="list-view">
    <div class="table-container">
      <table class="enrolled-table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Description</th>
            <th>Unit</th>
            <th>Professor</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sub, idx) in enrolledSubjectsList" :key="sub.id">
            <td class="bold-maroon">{{ sub.code }}</td>
            <td>{{ sub.title }}</td>
            <td>{{ sub.units.toFixed(2) }} u</td>
            <td>{{ props.professors[idx % props.professors.length].name }}</td>
            <td class="sched-cell">MWF 09:00 - 10:30 AM</td>
          </tr>
          <tr v-if="enrolledSubjectsList.length === 0">
            <td colspan="5" style="text-align: center; padding: 50px; color: #94a3b8;">No subjects currently enrolled. Finish prerequisites to unlock more.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.list-view { 
    max-width: 1200px; 
    margin: 40px auto; 
    padding: 0 20px; 
  }
  
  .table-container { 
    background: white; 
    border-radius: 15px; 
    overflow: hidden; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.08); 
  }
  
  .enrolled-table { 
    width: 100%; 
    border-collapse: collapse; 
    text-align: left; 
  }
  
  .enrolled-table th { 
    background: #800000; 
    color: #ffd700; 
    padding: 18px; 
    font-size: 0.9rem; 
  }
  
  .enrolled-table td { 
    padding: 18px; 
    border-bottom: 1px solid #f1f5f9; 
    color: #475569; 
    font-size: 0.85rem; 
  }
  
  .bold-maroon { 
    font-weight: 800; 
    color: #800000 !important; 
  }
  
  .sched-cell { 
    font-family: monospace; 
    font-weight: 700; 
    color: #1e293b; 
  }
</style>

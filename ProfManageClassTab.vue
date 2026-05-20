<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['classes'])

const activeClass = ref<any>(null)

// Fake student list
const students = ref([
  { id: '2024-003', name: 'Lacsaman, Abdullah A.', attendance: 'Present', grade: '1.00' },
  { id: '2024-003', name: 'Maruhom, Norjannah A.', attendance: 'Present', grade: '2.00' },
  { id: '2024-001', name: 'Mindaya, Hanirah M.', attendance: 'Present', grade: '1.75' },
  { id: '2024-002', name: 'Taher, Marjaan D.', attendance: 'Absent', grade: '1.75' }
])
</script>

<template>
  <div class="manage-wrapper">
    <div v-if="!activeClass" class="class-grid">
      <div v-for="cls in props.classes" :key="cls.id" class="class-card">
        <div class="card-head">
          <h2>{{ cls.code }}</h2>
          <span class="badge">{{ cls.section }}</span>
        </div>
        <p>{{ cls.title }}</p>
        <div class="card-foot">
          <span>👥 {{ cls.students }} Students</span>
          <button class="open-btn" @click="activeClass = cls">Open Class ➔</button>
        </div>
      </div>
    </div>

    <div v-else class="class-detail">
      <div class="detail-header">
        <button class="back-btn" @click="activeClass = null">← Back to Dashboard</button>
        <div class="title-group">
          <h1>{{ activeClass.code }} - {{ activeClass.title }}</h1>
          <p>Section: {{ activeClass.section }}</p>
        </div>
        <button class="save-btn">Save Changes</button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Attendance</th>
              <th>Final Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in students" :key="s.id">
              <td class="bold">{{ s.id }}</td>
              <td>{{ s.name }}</td>
              <td>
                <select v-model="s.attendance" :class="s.attendance.toLowerCase()">
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              </td>
              <td>
                <input type="text" v-model="s.grade" class="grade-input" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manage-wrapper { padding: 40px; height: 100%; overflow-y: auto; }
.class-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 25px; max-width: 1200px; margin: 0 auto; }
.class-card { background: white; border-radius: 12px; padding: 25px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
.card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.card-head h2 { margin: 0; color: #800000; font-size: 1.5rem; font-weight: 900; }
.badge { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: bold; }
.class-card p { font-size: 1.1rem; color: #334155; margin: 0 0 20px 0; font-weight: 600; }
.card-foot { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 15px; }
.card-foot span { font-size: 0.9rem; color: #64748b; font-weight: 600; }
.open-btn { background: #1e293b; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }

.class-detail { max-width: 1200px; margin: 0 auto; }
.detail-header { display: flex; align-items: center; justify-content: space-between; background: white; padding: 25px 30px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px; }
.back-btn { background: #4f4f4f; border: none; padding: 10px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; }
.title-group h1 { margin: 0 0 5px 0; font-size: 1.5rem; color: #1e293b; }
.title-group p { margin: 0; color: #64748b; font-size: 0.95rem; }
.save-btn { background: #800000; color: #ffd700; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; }

.table-container { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
table { width: 100%; border-collapse: collapse; text-align: left; }
th { background: #f8fafc; padding: 15px 20px; font-size: 0.85rem; color: #64748b; text-transform: uppercase; }
td { padding: 15px 20px; border-top: 1px solid #f1f5f9; color: #334155; }
.bold { font-weight: bold; color: #1e293b; }
select { padding: 6px 12px; border-radius: 6px; font-weight: bold; outline: none; border: 1px solid #cbd5e1; }
select.present { color: #16a34a; background: #f0fdf4; }
select.absent { color: #dc2626; background: #fef2f2; }
.grade-input { width: 80px; padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: bold; text-align: center; }
</style>
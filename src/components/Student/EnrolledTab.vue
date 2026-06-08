<template>
  <div class="enrollment-container">
    <div class="header-section">
      <div class="header-title-area">
        <h2>🎒 Enrolled Academic Load</h2>
        <p>Academic Year 2025–2026 | Manage your current courses, faculty details, and schedules.</p>
      </div>
      
      <div class="student-profile-badge">
        <div class="profile-avatar">KB</div>
        <div class="profile-info">
          <span class="student-name">Kathryn Bernardo</span>
          <span class="student-meta">First Year Student | Academic Portal</span>
        </div>
      </div>
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

    <div class="summary-cards" v-if="filteredCourses.length > 0">
      <div class="stat-card">
        <span class="stat-label">Total Load</span>
        <span class="stat-value">{{ totalUnits }} Units</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Enrolled Subjects</span>
        <span class="stat-value">{{ filteredCourses.length }} Classes</span>
      </div>
    </div>

    <div class="courses-grid">
      <div 
        v-for="(course, index) in filteredCourses" 
        :key="index" 
        class="course-card"
        :style="{ borderColor: getTypeColor(course.type) }"
      >
        <div class="card-meta">
          <div class="meta-left">
            <span class="code-tag">🔑 {{ course.code }}</span>
            <span class="section-tag">Section {{ course.section }}</span>
          </div>
          <span :class="['type-badge', course.type.toLowerCase().replace(' ', '-')]">
            {{ course.type }}
          </span>
        </div>
        
        <h3 class="course-title">{{ course.title }}</h3>
        
        <div class="course-details">
          <div class="detail-item">
            <span class="icon">🕒</span>
            <div>
              <strong>Schedule:</strong> {{ course.schedule }} 
              <span :class="['room-tag', { 'tba-highlight': course.room.toUpperCase() === 'ROOM TBA' }]">
                ({{ course.room }})
              </span>
            </div>
          </div>
          <div class="detail-item">
            <span class="icon">📐</span>
            <div><strong>Units:</strong> {{ course.units }} Units</div>
          </div>
          <div class="detail-item">
            <span class="icon">👤</span>
            <div><strong>Instructor:</strong> {{ course.instructor }}</div>
          </div>
        </div>

        <div class="card-footer">
          <span class="status">Status: <strong class="status-active">Officially Enrolled</strong></span>
          <span class="term-badge">📆 {{ course.term }}</span>
        </div>
      </div>

      <div v-if="filteredCourses.length === 0" class="empty-state">
        📭 No courses found or enrolled for this selected term.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Course {
  code: string;
  section: string;
  title: string;
  units: number;
  schedule: string;
  room: string;
  instructor: string;
  type: 'Lecture' | 'Laboratory' | 'Major-Req' | 'Gen-Ed';
  term: '1st Semester' | '2nd Semester';
}

const activeFilter = ref('All');
const filterTabs = ['All', '1st Semester', '2nd Semester'];

const enrolledCourses = ref<Course[]>([
  // --- FIRST SEMESTER COURSES ---
  {
    code: 'CCC100',
    section: 'CcDd',
    title: 'Fundamentals of Computing',
    units: 3,
    schedule: 'Mon/Wed 8:30 AM - 10:00 AM', 
    room: 'Room TBA',
    instructor: 'MONDEJAR, Jeffrey Maceda',
    type: 'Major-Req',
    term: '1st Semester'
  },
  {
    code: 'PED11',
    section: 'Bb1',
    title: 'PATHFit1: Movement Competency Training',
    units: 2,
    schedule: 'Mon/Wed 7:00 AM - 8:30 AM',
    room: 'Room TBA',
    instructor: 'SILANG, Maria Fatima Acma',
    type: 'Gen-Ed',
    term: '1st Semester'
  },
  {
    code: 'MAT051',
    section: 'GgYy',
    title: 'Calculus 1',
    units: 5,
    schedule: 'Mon/Tue/Wed/Thu 1:00 PM - 2:30 PM',
    room: 'Room TBA',
    instructor: 'ROSALEJOS, Gloria Alipan',
    type: 'Major-Req',
    term: '1st Semester'
  },
  {
    code: 'NST001',
    section: 'C1-22',
    title: 'National Service Training Program I',
    units: 3,
    schedule: 'Sat 9:00 AM - 11:30 AM',
    room: 'Room TBA',
    instructor: 'AMPUAN, Azimah Disoma',
    type: 'Gen-Ed',
    term: '1st Semester'
  },
  {
    code: 'FIL101',
    section: 'Ff1',
    title: 'Wika at Kultura sa Mapayapang Lipunan',
    units: 3,
    schedule: 'Mon/Wed 10:30 AM - 12:00 PM', 
    room: 'Room TBA',
    instructor: 'MUSTAPHA, Anida Sheik',
    type: 'Gen-Ed',
    term: '1st Semester'
  },
  {
    code: 'CCC101',
    section: 'UuVv',
    title: 'Computer Programming 1',
    units: 3,
    schedule: 'Tue/Thu 7:00 AM - 8:30 AM',
    room: 'Room TBA',
    instructor: 'CAGOCO, Appogel Fuentes',
    type: 'Major-Req',
    term: '1st Semester'
  },
  {
    code: 'GEC105',
    section: 'Xx',
    title: 'Readings in Philippine History',
    units: 3,
    schedule: 'Tue/Thu 10:30 AM - 12:00 PM', 
    room: 'Room TBA',
    instructor: 'SAYSON, Zizzle Dawn Abecia',
    type: 'Gen-Ed',
    term: '1st Semester'
  },

  // --- SECOND SEMESTER COURSES ---
  {
    code: 'CCC102',
    section: 'CcDd',
    title: 'Computer Programming 2',
    units: 3,
    schedule: 'Fri 9:00 AM - 12:00 PM',
    room: 'Room TBA',
    instructor: 'ISRA, Johaira Rasuman',
    type: 'Major-Req',
    term: '2nd Semester'
  },
  {
    code: 'PED12',
    section: 'Vv3',
    title: 'PATHFit2: Exercise-based Fitness Activities',
    units: 2,
    schedule: 'Mon/Wed 10:00 AM - 11:00 AM',
    room: 'Room TBA',
    instructor: 'BELGA, Ellen Grace Aman',
    type: 'Gen-Ed',
    term: '2nd Semester'
  },
  {
    code: 'MAT051',
    section: 'GgYy',
    title: 'Calculus 1',
    units: 5, 
    schedule: 'Mon/Tue/Wed/Thu 2:30 PM - 4:00 PM',
    room: 'Room TBA',
    instructor: 'RAKIM, Raicah Cayongcat',
    type: 'Major-Req',
    term: '2nd Semester'
  },
  {
    code: 'NST002',
    section: 'C2-22',
    title: 'National Service Training Program II',
    units: 3,
    schedule: 'Sat 9:00 AM - 11:30 AM',
    room: 'Room TBA',
    instructor: 'AMPUAN, Azimah Disoma',
    type: 'Gen-Ed',
    term: '2nd Semester'
  },
  {
    code: 'FIL102',
    section: 'Ff4',
    title: 'Ekokritisismo at Pagpapahalaga sa Kalikasan',
    units: 3,
    schedule: 'Mon/Wed 1:00 PM - 2:30 PM',
    room: 'Room TBA',
    instructor: 'MAGNO, Imelda Marcos',
    type: 'Gen-Ed',
    term: '2nd Semester'
  },
  {
    code: 'GEC107',
    section: 'Tt',
    title: 'Ethics',
    units: 3,
    schedule: 'Tue/Thu 7:00 AM - 8:30 AM',
    room: 'Room TBA',
    instructor: 'MUNGKON, Jumadir Olazo',
    type: 'Gen-Ed',
    term: '2nd Semester'
  },
  {
    code: 'GEC102',
    section: 'Xx3',
    title: 'Purposive Communication',
    units: 3,
    schedule: 'Tue/Thu 1:00 PM - 2:30 PM',
    room: 'Room TBA',
    instructor: 'KABIRUN, Sharifah Sittie Zehanie Jali',
    type: 'Gen-Ed',
    term: '2nd Semester'
  }
]);

const filteredCourses = computed(() => {
  if (activeFilter.value === 'All') {
    return enrolledCourses.value;
  }
  return enrolledCourses.value.filter(item => item.term === activeFilter.value);
});

const totalUnits = computed(() => {
  return filteredCourses.value.reduce((acc, curr) => acc + curr.units, 0);
});

const getTypeColor = (type: string) => {
  if (type === 'Major-Req') return '#800000';
  if (type === 'Laboratory') return '#4647a1';
  if (type === 'Lecture') return '#10b981';
  return '#a30053';
};
</script>

<style scoped>
.enrollment-container {
  padding: 24px;
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.header-section {
  display: flex;
  flex-direction: column; 
  align-items: center;    
  text-align: center;     
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 20px;
  width: 100%;
  max-width: 900px;
}

.header-title-area {
  width: 100%;
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

.student-profile-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: white;
  border: 1px solid #e5e7eb;
  padding: 10px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.profile-avatar {
  background-color: #800000;
  color: white;
  font-weight: 700;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
}

.profile-info {
  display: flex;
  flex-direction: column;
  text-align: left; 
}

.student-name {
  font-weight: 600;
  color: #111827;
  font-size: 1rem;
}

.student-meta {
  font-size: 0.8rem;
  color: #6b7280;
}

.filter-container {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center; 
  width: 100%;
  max-width: 900px;
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

.summary-cards {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 900px;
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
}

.courses-grid {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 900px;
}

.course-card {
  background: white;
  border-left: 5px solid #d1d5db;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-tag {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  background-color: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
}

.section-tag {
  font-size: 0.8rem;
  font-weight: 500;
  color: #2563eb;
  background-color: #eff6ff;
  border: 1px solid #dbeafe;
  padding: 2px 6px;
  border-radius: 4px;
}

.type-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  text-transform: uppercase;
}
.type-badge.major-req { background-color: #fbefff; color: #800000; }
.type-badge.laboratory { background-color: #e3e4f9; color: #393a80; }
.type-badge.lecture { background-color: #e6fbf3; color: #065f46; }
.type-badge.gen-ed { background-color: #fce7f1; color: #850043; }

.course-title {
  font-size: 1.25rem;
  color: #111827;
  margin: 0 0 14px 0;
}

.course-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  background-color: #fafafa;
  padding: 12px;
  border-radius: 6px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9rem;
  color: #4b5563;
}

.detail-item .icon {
  font-size: 1rem;
}

.room-tag {
  color: #800000;
  font-weight: 500;
}

.room-tag.tba-highlight {
  color: #d97706;
  font-style: italic;
  font-weight: 600;
}

.card-footer {
  font-size: 0.85rem;
  color: #6b7280;
  border-top: 1px solid #f3f4f6;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-active {
  color: #10b981;
}

.term-badge {
  font-weight: 500;
  color: #4b5563;
  font-size: 0.85rem;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
  background: white;
  border-radius: 8px;
  border: 1px dashed #d1d5db;
  width: 100%;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = ref(new Date(2026, 4, 1))

const selectedDate = ref<string | null>(null)
const selectedEvents = ref<CalendarEvent[]>([])

interface CalendarEvent {
  date: string
  title: string
  type: 'holiday' | 'exam' | 'enrollment' | 'academic'
}

const events = ref<CalendarEvent[]>([
  { date: '2026-01-01', title: "New Year's Day", type: 'holiday' },
  { date: '2026-01-02', title: "End of Christmas Vacation", type: 'holiday' },
  { date: '2026-01-05', title: `Deadline for Submission of Grades (Graduating)`, type: 'academic' },
  { date: '2026-01-06', title: "Review Update Syllabus", type: 'academic' },
  { date: '2026-01-07', title: "Review Update Syllabus", type: 'academic' },
  { date: '2026-01-08', title: "Review Update Syllabus", type: 'academic' },
  { date: '2026-01-09', title: "Review Update Syllabus", type: 'academic' },
  { date: '2026-01-09', title: "Deadline for Submission of Grades (Non-Graduating)", type: 'academic' },
  { date: '2026-01-12', title: "Enrolment for Freshmen/New Students", type: 'enrollment' },
  { date: '2026-01-13', title: "Enrolment for Freshmen/New Students", type: 'enrollment' },
  { date: '2026-01-14', title: "Enrolment for Freshmen/New Students", type: 'enrollment' },
  { date: '2026-01-15', title: "Enrolment for Freshmen/New Students", type: 'enrollment' },
  { date: '2026-01-16', title: "Enrolment for Freshmen/New Students", type: 'enrollment' },
  { date: '2026-01-10', title: "Enrolment for Old Students", type: 'enrollment' },
  { date: '2026-01-20', title: "Enrolment for Old Students", type: 'enrollment' },
  { date: '2026-01-21', title: "Enrolment for Old Students", type: 'enrollment' },
  { date: '2026-01-22', title: "Enrolment for Old Students", type: 'enrollment' },
  { date: '2026-01-23', title: "Enrolment for Old Students", type: 'enrollment' },
  { date: '2026-01-26', title: "Last Day of Enrollment and EBF", type: 'enrollment' },
  { date: '2026-01-26', title: "Last Day of Registration w/ Fines", type: 'enrollment' },
  { date: '2026-01-27', title: "Last Day of Registration w/ Fines", type: 'enrollment' },
  { date: '2026-01-28', title: "Last Day of Registration w/ Fines", type: 'enrollment' },
  { date: '2026-01-29', title: "Last Day of Registration w/ Fines", type: 'enrollment' },
  { date: '2026-01-30', title: "Last Day of Registration w/ Fines", type: 'enrollment' },
  { date: '2026-01-30', title: "Last Day of Submission of INC", type: 'academic' },

  
])

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = []
  
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, date: null, events: [] })
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const dayEvents = events.value.filter(e => e.date === dateStr)
    const isToday = dateStr === '2026-05-23'

    days.push({ day: i, date: dateStr, events: dayEvents, isToday })
  }
  
  return days
})

const changeMonth = (delta: number) => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + delta, 1)
  selectedDate.value = null // reset selection on month change
}

// Handle clicking a date cell
const handleDateClick = (cell: any) => {
  if (cell.events && cell.events.length > 0) {
    selectedDate.value = cell.date
    selectedEvents.value = cell.events
  } else {
    // Optional: click empty space to clear selection
    selectedDate.value = null
    selectedEvents.value = []
  }
}

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return ''
  const dateObj = new Date(selectedDate.value)
  return dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

</script>

<template>
  <div class="calendar-container">
    <div class="calendar-wrapper">
      
      <div class="calendar-header">
        <h2>MSU Academic Calendar</h2>
        <div class="controls">
          <button @click="changeMonth(-1)">&#8592; Prev</button>
          <h3>{{ monthName }}</h3>
          <button @click="changeMonth(1)">Next &#8594;</button>
        </div>
      </div>

      <div class="calendar-grid">
        <div v-for="day in weekDays" :key="day" class="weekday">
          {{ day }}
        </div>

        <div 
          v-for="(cell, index) in calendarDays" 
          :key="index" 
          class="day-cell" 
          :class="{ 
            'empty': !cell.day, 
            'today': cell.isToday, 
            'has-events': cell.events && cell.events.length > 0,
            'selected': cell.date === selectedDate 
          }"
          @click="handleDateClick(cell)"
        >
          <div v-if="cell.day" class="day-number">{{ cell.day }}</div>
          
          <div class="events-list">
            <div 
              v-for="(event, eIndex) in cell.events" 
              :key="eIndex" 
              class="event-badge"
              :class="event.type"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-legend">
        <span class="legend-item"><span class="color-box academic"></span> Academic / General</span>
        <span class="legend-item"><span class="color-box exam"></span> Examinations</span>
        <span class="legend-item"><span class="color-box enrollment"></span> Enrollment</span>
        <span class="legend-item"><span class="color-box holiday"></span> Holidays</span>
      </div>

      <div v-if="selectedDate" class="event-details-box">
        <h3>Events for {{ formattedSelectedDate }}</h3>
        <ul class="event-details-list">
          <li v-for="(event, index) in selectedEvents" :key="index">
            <span class="color-dot" :class="event.type"></span>
            <strong>{{ event.title }}</strong>
            <span class="event-type-label">({{ event.type.charAt(0).toUpperCase() + event.type.slice(1) }})</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
  background: white;
  box-sizing: border-box;
}

.calendar-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.calendar-header h2 {
  margin: 0;
  color: #800000;
  font-weight: 800;
}

.controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.controls h3 {
  margin: 0;
  min-width: 150px;
  text-align: center;
  color: #334155;
  font-size: 1.1rem;
}

.controls button {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #334155;
  transition: 0.2s;
}

.controls button:hover {
  background: #800000;
  color: white;
  border-color: #800000;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.weekday {
  text-align: center;
  font-weight: 700;
  color: #64748b;
  padding: 8px 0;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.9rem;
}

.day-cell {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px;
  min-height: 80px; 
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}

.day-cell.has-events {
  cursor: pointer;
}

.day-cell.has-events:hover {
  border-color: #94a3b8;
  background: #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.day-cell.selected {
  border: 2px solid #800000;
  background: #fff;
}

.day-cell.empty {
  background: transparent;
  border: none;
  cursor: default;
}

.day-cell.today {
  border: 2px solid #ffd700;
  background: #fffbeb;
}

.day-number {
  font-weight: 700;
  color: #334155;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden; 
}

.event-badge {
  font-size: 0.65rem;
  padding: 2px 4px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  pointer-events: none; 
}

/* Event Types Colors */
.academic { background: #3b82f6; } 
.exam { background: #e11d48; } 
.enrollment { background: #10b981; } 
.holiday { background: #f59e0b; } 

.calendar-legend {
  display: flex;
  gap: 15px;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 0.85rem;
  color: #64748b;
  justify-content: center;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.color-box {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  display: inline-block;
}

.event-details-box {
  margin-top: 20px;
  padding: 15px 20px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  border-left: 5px solid #800000;
}

.event-details-box h3 {
  margin: 0 0 10px 0;
  color: #334155;
  font-size: 1.1rem;
}

.event-details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-details-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #475569;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.event-type-label {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-left: 5px;
}
</style>
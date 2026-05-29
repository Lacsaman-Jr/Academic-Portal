<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps(['classes'])
const activeClass = ref<any>(null)
const activeView = ref('menu') 
const selectedProject = ref<any>(null)

const quizzes = ref([
  { id: 'q1', name: 'Quiz 1', maxItems: 50 }
])
const exams = ref([
  { id: 'e1', name: 'Midterm', maxItems: 100 }
])
const projects = ref([
  { id: 'p1', name: 'Final Core LMS Architecture', description: 'Build a relational schema and responsive UI components for the university system.' }
])

const tempMaxInput = ref<number>(0)
const quizFormActive = ref(false)
const examFormActive = ref(false)

const showAddProjectModal = ref(false)
const newProjName = ref('')
const newProjDesc = ref('')

const showGradeProjectModal = ref(false)
const currentGradingStudent = ref<any>(null)
const inputProjGrade = ref('')
const inputProjComment = ref('')

const students = ref([
  { 
    id: '2024-001', 
    name: 'Lacsaman, Abdullah A.', 
    absences: 0, 
    quizScores: { q1: 45 }, 
    examScores: { e1: 88 }, 
    projectSubmissions: { p1: { status: 'Submitted', grade: null, comment: '' } },
    status: 'Active', 
    finalGrade: null, 
    curAtt: '', 
    tempInputScore: null 
  },
  { 
    id: '2024-002', 
    name: 'Maruhom, Norjannah A.', 
    absences: 4, 
    quizScores: { q1: 25 }, 
    examScores: { e1: null }, 
    projectSubmissions: { p1: { status: 'Pending', grade: null, comment: '' } },
    status: 'Active', 
    finalGrade: null, 
    curAtt: '', 
    tempInputScore: null 
  },
  { 
    id: '2024-003', 
    name: 'Mindaya, Hanirah M.', 
    absences: 0, 
    quizScores: { q1: 49 }, 
    examScores: { e1: 95 }, 
    projectSubmissions: { p1: { status: 'Completed', grade: '1.25', comment: 'Excellent technical implementation!' } },
    status: 'Active', 
    finalGrade: '1.25', 
    curAtt: '', 
    tempInputScore: null 
  },
  { 
    id: '2024-004', 
    name: 'Taher, Marjaan D.', 
    absences: 5, 
    quizScores: { q1: null }, 
    examScores: { e1: null }, 
    projectSubmissions: { p1: { status: 'Pending', grade: null, comment: '' } },
    status: 'Active', 
    finalGrade: null, 
    curAtt: '', 
    tempInputScore: null 
  }
])

const openClass = (cls: any) => {
  activeClass.value = cls
  activeView.value = 'menu'
}

const goBack = () => {
  if (activeView.value === 'menu') {
    activeClass.value = null
  } else if (activeView.value === 'project_detail') {
    activeView.value = 'view_project'
    selectedProject.value = null
  } else {
    activeView.value = 'menu'
    quizFormActive.value = false
    examFormActive.value = false
    tempMaxInput.value = 0
  }
}

const isCritical = (student: any) => {
  if (student.status !== 'Active') return false
  if (student.absences >= 3) return true
  return false
}

const submitRollCall = () => {
  students.value.forEach(s => {
    if (s.curAtt === 'Absent') {
      s.absences++
    }
    s.curAtt = ''
  })
  alert('Attendance successfully recorded to core records.')
  goBack()
}

const createQuizInstance = () => {
  if (tempMaxInput.value <= 0) return alert('Please enter valid items size.')
  const nextId = `q_${Date.now()}`
  quizzes.value.push({
    id: nextId,
    name: `Quiz ${quizzes.value.length + 1}`,
    maxItems: tempMaxInput.value
  })
  
  students.value.forEach(s => {
    if (s.tempInputScore !== null) {
      s.quizScores[nextId] = s.tempInputScore
    } else {
      s.quizScores[nextId] = null
    }
    s.tempInputScore = null
  })
  alert('New quiz column generated and scores appended.')
  goBack()
}

const createExamInstance = () => {
  if (tempMaxInput.value <= 0) return alert('Please enter valid items size.')
  const nextId = `e_${Date.now()}`
  exams.value.push({
    id: nextId,
    name: `Exam ${exams.value.length + 1}`,
    maxItems: tempMaxInput.value
  })
  
  students.value.forEach(s => {
    if (s.tempInputScore !== null) {
      s.examScores[nextId] = s.tempInputScore
    } else {
      s.examScores[nextId] = null
    }
    s.tempInputScore = null
  })
  alert('New exam column generated and scores appended.')
  goBack()
}

const openProjectDetails = (proj: any) => {
  selectedProject.value = proj
  activeView.value = 'project_detail'
}

const triggerAddProject = () => {
  if (!newProjName.value.trim()) return alert('Project name required.')
  const nextId = `p_${Date.now()}`
  
  projects.value.push({
    id: nextId,
    name: newProjName.value,
    description: newProjDesc.value
  })

  students.value.forEach(s => {
    s.projectSubmissions[nextId] = { status: 'Pending', grade: null, comment: '' }
  })

  newProjName.value = ''
  newProjDesc.value = ''
  showAddProjectModal.value = false
  alert('Project track successfully created.')
}

const openGradingModal = (student: any) => {
  currentGradingStudent.value = student
  const subRecord = student.projectSubmissions[selectedProject.value.id]
  inputProjGrade.value = subRecord.grade || ''
  inputProjComment.value = subRecord.comment || ''
  showGradeProjectModal.value = true
}

const saveProjectGrade = () => {
  if (!inputProjGrade.value.trim()) return alert('Please input grade.')
  const pId = selectedProject.value.id
  const studentRecord = students.value.find(s => s.id === currentGradingStudent.value.id)
  
  if (studentRecord) {
    studentRecord.projectSubmissions[pId].grade = inputProjGrade.value
    studentRecord.projectSubmissions[pId].comment = inputProjComment.value
    studentRecord.projectSubmissions[pId].status = 'Completed'
  }

  showGradeProjectModal.value = false
  currentGradingStudent.value = null
  alert('Project validation and grading complete.')
}

// Administration Logic (Drop / ODP)
const performDrop = (student: any) => {
  if (confirm(`Drop ${student.name}? Student will acquire official grade failure matrix (5.00)`)) {
    student.status = 'Dropped'
    student.finalGrade = '5.00'
  }
}

const performODP = (student: any) => {
  if (confirm(`Process Official Drop System for ${student.name}? This removes academic grade value entries.`)) {
    student.status = 'ODP'
    student.finalGrade = 'VOID'
  }
}

const finalizeSemesterGrades = () => {
  alert('Academic system final grades compiled and pushed to system memory.')
  goBack()
}
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
          <span>👥 {{ cls.students }} Students Registered</span>
          <button class="open-btn" @click="openClass(cls)">Manage Class ➔</button>
        </div>
      </div>
    </div>

    <div v-else class="class-detail">
      
      <div class="detail-header">
        <button class="back-btn" @click="goBack">← Back</button>
        <div class="title-group">
          <h1>{{ activeClass.code }} - {{ activeClass.title }}</h1>
          <p>Section: {{ activeClass.section }} | Panel View: <span class="highlight">{{ activeView.replace('_', ' ').toUpperCase() }}</span></p>
        </div>
      </div>

      <div v-if="activeView === 'menu'" class="menu-grid">
        <button class="menu-card" @click="activeView = 'view_class'">
          <div class="icon">📊</div>
          <h3>View Class Record</h3>
          <p>Full matrix sheet of student standings across all assessments.</p>
        </button>
        
        <button class="menu-card" @click="activeView = 'view_project'">
          <div class="icon">📁</div>
          <h3>View Projects</h3>
          <p>Create project scopes and grade submitted milestones.</p>
        </button>
        
        <button class="menu-card" @click="activeView = 'roll_call'">
          <div class="icon">✋</div>
          <h3>Roll Call (Attendance)</h3>
          <p>Log attendance sessions. Increments student absences instantly.</p>
        </button>
        
        <button class="menu-card" @click="activeView = 'quiz_score'">
          <div class="icon">📝</div>
          <h3>Enter Quiz Score</h3>
          <p>Produce new quiz profiles and map raw student inputs.</p>
        </button>
        
        <button class="menu-card" @click="activeView = 'exam_score'">
          <div class="icon">📑</div>
          <h3>Enter Exam Score</h3>
          <p>Establish major exam tracks and batch student results.</p>
        </button>
        
        <button class="menu-card" @click="activeView = 'manage_student'">
          <div class="icon">⚠️</div>
          <h3>Manage Student Status</h3>
          <p>Handle automated Drop tracks or Official Drop (ODP Void).</p>
        </button>
        
        <button class="menu-card highlight-card" @click="activeView = 'grade_student'">
          <div class="icon">🎓</div>
          <h3>Grade Students</h3>
          <p>Generate final numerical records for official system submission.</p>
        </button>
      </div>

      <div v-if="activeView === 'view_class'" class="table-container fade-in table-scrollable">
        <table>
          <thead>
            <tr>
              <th rowspan="2" class="fixed-col">Student Identity</th>
              <th rowspan="2">Status</th>
              <th class="section-head att-head">Attendance</th>
              <th :colspan="projects.length" class="section-head proj-head">Projects Track</th>
              <th :colspan="quizzes.length" class="section-head quiz-head">Quizzes Track</th>
              <th :colspan="exams.length" class="section-head exam-head">Exams Track</th>
              <th rowspan="2">Final Grade</th>
              <th rowspan="2">Remarks</th>
            </tr>
            <tr>
              <th class="sub-th font-danger">Absences</th>
              <th v-for="p in projects" :key="p.id" class="sub-th text-wrap-heading">{{ p.name }}</th>
              <th v-for="q in quizzes" :key="q.id" class="sub-th">{{ q.name }}</th>
              <th v-for="e in exams" :key="e.id" class="sub-th">{{ e.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in students" :key="s.id">
              <td class="bold fixed-col">{{ s.name }}</td>
              <td><span :class="['status-badge', s.status.toLowerCase()]">{{ s.status }}</span></td>
              <td :class="['text-center', {'text-red bold': s.absences >= 3}]">{{ s.absences }}</td>
              
              <td v-for="p in projects" :key="p.id">
                <span :class="['proj-badge', (s.projectSubmissions[p.id]?.status || 'pending').toLowerCase()]">
                  {{ s.projectSubmissions[p.id]?.status || 'Pending' }}
                  <small v-if="s.projectSubmissions[p.id]?.grade">({{ s.projectSubmissions[p.id]?.grade }})</small>
                </span>
              </td>

              <td v-for="q in quizzes" :key="q.id" class="text-center">
                {{ s.quizScores[q.id] !== null && s.quizScores[q.id] !== undefined ? s.quizScores[q.id] : '--' }}
              </td>

              <td v-for="e in exams" :key="e.id" class="text-center">
                {{ s.examScores[e.id] !== null && s.examScores[e.id] !== undefined ? s.examScores[e.id] : '--' }}
              </td>

              <td class="bold text-center">{{ s.finalGrade || '--' }}</td>
              <td>
                <span v-if="s.status !== 'Active'" class="bold">{{ s.status }}</span>
                <span v-else-if="isCritical(s)" class="critical-badge">Critical</span>
                <span v-else class="safe-badge">Good Standing</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="activeView === 'view_project'" class="fade-in">
        <div class="action-bar flex-row-end">
          <p>Select an ongoing class project profile below to manage student submissions and review content.</p>
          <button class="btn-primary" @click="showAddProjectModal = true">➕ Add Project Task</button>
        </div>

        <div class="project-list-grid">
          <div v-for="p in projects" :key="p.id" class="project-row-card" @click="openProjectDetails(p)">
            <div class="project-info-block">
              <h3>📁 {{ p.name }}</h3>
              <p>{{ p.description || 'No system structural description assigned to this project task profile.' }}</p>
            </div>
            <button class="open-btn">Grade Matrix ➔</button>
          </div>
        </div>
      </div>

      <div v-if="activeView === 'project_detail' && selectedProject" class="fade-in">
        <div class="action-bar">
          <div>
            <h2>Reviewing: {{ selectedProject.name }}</h2>
            <p>{{ selectedProject.description }}</p>
          </div>
          <button class="btn-outline" @click="goBack">Back to Projects</button>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Registration ID</th>
                <th>Full Name</th>
                <th>Tracking Status</th>
                <th>Acquired Score</th>
                <th>Feedback Comment</th>
                <th>System Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in students" :key="s.id">
                <td class="bold">{{ s.id }}</td>
                <td>{{ s.name }}</td>
                <td>
                  <span :class="['proj-badge', (s.projectSubmissions[selectedProject.value?.id || selectedProject.id]?.status || 'pending').toLowerCase()]">
                    {{ s.projectSubmissions[selectedProject.id]?.status || 'Pending' }}
                  </span>
                </td>
                <td class="bold text-center">{{ s.projectSubmissions[selectedProject.id]?.grade || '--' }}</td>
                <td class="comment-cell">{{ s.projectSubmissions[selectedProject.id]?.comment || '--' }}</td>
                <td>
                  <span v-if="s.status !== 'Active'" class="text-muted">{{ s.status }}</span>
                  <div v-else-if="s.projectSubmissions[selectedProject.id]?.status === 'Pending'" class="text-muted">Awaiting Student Sync</div>
                  <button v-else-if="s.projectSubmissions[selectedProject.id]?.status === 'Submitted'" class="btn-primary btn-sm" @click="openGradingModal(s)">Enter Grade</button>
                  <button v-else class="btn-outline btn-sm" @click="openGradingModal(s)">Re-Grade Task</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeView === 'roll_call'" class="fade-in">
        <div class="action-bar">
          <p>Mark active attendance records. Submitting automatically registers systemic counts to student profiles.</p>
          <div class="action-buttons">
            <button class="btn-outline" @click="students.forEach(s => s.curAtt = '')">↻ Roll Call Again</button>
            <button class="btn-primary" @click="submitRollCall">Submit Rollcall</button>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Identity Block</th>
                <th class="text-center">Present</th>
                <th class="text-center">Absent</th>
                <th class="text-center">Late</th>
                <th class="text-center">Excused</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in students" :key="s.id">
                <td class="bold">{{ s.name }}</td>
                <td v-if="s.status !== 'Active'" colspan="4" class="text-muted text-center">Record locked: Student {{ s.status }}</td>
                <template v-else>
                  <td class="text-center"><input type="radio" :name="s.id" value="Present" v-model="s.curAtt"></td>
                  <td class="text-center"><input type="radio" :name="s.id" value="Absent" v-model="s.curAtt"></td>
                  <td class="text-center"><input type="radio" :name="s.id" value="Late" v-model="s.curAtt"></td>
                  <td class="text-center"><input type="radio" :name="s.id" value="Excused" v-model="s.curAtt"></td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeView === 'quiz_score' || activeView === 'exam_score'" class="fade-in">
        
        <div v-if="(activeView === 'quiz_score' && !quizFormActive) || (activeView === 'exam_score' && !examFormActive)" class="setup-box">
          <h2>Create System {{ activeView === 'quiz_score' ? 'Quiz Track' : 'Exam Track' }}</h2>
          <p>Configure the maximum overall score items capacity for this assessment row profile.</p>
          <div class="setup-input">
            <input type="number" v-model="tempMaxInput" placeholder="Max Items" min="1" />
            <button class="btn-primary" @click="activeView === 'quiz_score' ? quizFormActive = true : examFormActive = true">Configure Matrix</button>
          </div>
        </div>

        <div v-else>
          <div class="action-bar">
            <p>Filling System Row Block Records: Maximum Assessment Value Weight: <strong>{{ tempMaxInput }}</strong> Items.</p>
            <button class="btn-primary" @click="activeView === 'quiz_score' ? createQuizInstance() : createExamInstance()">Generate Column & Save</button>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Identity Key</th>
                  <th>Student Name</th>
                  <th>New Form Score Encoding Block</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in students" :key="s.id">
                  <td class="bold">{{ s.id }}</td>
                  <td>{{ s.name }}</td>
                  <td v-if="s.status !== 'Active'" class="text-muted">{{ s.status }}</td>
                  <td v-else>
                    <input type="number" v-model="s.tempInputScore" class="score-input" placeholder="Score Input" :max="tempMaxInput" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="activeView === 'manage_student'" class="fade-in">
        <div class="action-bar warning-bar">
          <p>⚠️ Academic Record Control Panel: Drop updates append fixed failures. Official Drop processing removes grading targets.</p>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Identity Block</th>
                <th>System Attendance Logs</th>
                <th>Active Registration State</th>
                <th>Operations Logic</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in students" :key="s.id">
                <td class="bold">{{ s.name }}</td>
                <td :class="{'text-red bold': s.absences >= 3}">{{ s.absences }} Logged Absences</td>
                <td><span :class="['status-badge', s.status.toLowerCase()]">{{ s.status }}</span></td>
                <td>
                  <div class="action-group" v-if="s.status === 'Active'">
                    <button class="btn-danger" @click="performDrop(s)">Drop Student (5.00)</button>
                    <button class="btn-warning" @click="performODP(s)">Official Drop (ODP)</button>
                  </div>
                  <span v-else class="text-muted font-italic">Record Locked</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeView === 'grade_student'" class="fade-in">
        <div class="action-bar success-bar">
          <p>🎓 Compile total system score structures to submit official registrar records.</p>
          <button class="btn-primary" @click="finalizeSemesterGrades">Push Grades Systemic</button>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Identity Block</th>
                <th>Registration State</th>
                <th>Input Computed Grade Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in students" :key="s.id">
                <td class="bold">{{ s.name }}</td>
                <td><span :class="['status-badge', s.status.toLowerCase()]">{{ s.status }}</span></td>
                <td>
                  <input v-if="s.status === 'Active'" type="text" v-model="s.finalGrade" class="grade-input" placeholder="e.g. 1.75" />
                  <span v-else class="bold text-danger">{{ s.finalGrade }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <div v-if="showAddProjectModal" class="modal-backdrop fade-in">
      <div class="modal-box shadow-xl animate-scaleUp">
        <div class="modal-head">
          <h2>Create New Project Definition</h2>
          <button class="close-cross" @click="showAddProjectModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label>Project Profile Heading Name</label>
            <input type="text" v-model="newProjName" placeholder="e.g., Final System Application Design" />
          </div>
          <div class="form-item">
            <label>Structural Task Description Context</label>
            <textarea rows="4" v-model="newProjDesc" placeholder="Describe the conditions and metrics required for passing score evaluation..."></textarea>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn-outline" @click="showAddProjectModal = false">Cancel</button>
          <button class="btn-primary" @click="triggerAddProject">Add Project Task</button>
        </div>
      </div>
    </div>

    <div v-if="showGradeProjectModal && currentGradingStudent" class="modal-backdrop fade-in">
      <div class="modal-box shadow-xl animate-scaleUp">
        <div class="modal-head">
          <h2>Grade Submission Sheet</h2>
          <button class="close-cross" @click="showGradeProjectModal = false; currentGradingStudent = null">×</button>
        </div>
        <div class="modal-body">
          <p class="grading-student-lbl">Student Name: <strong>{{ currentGradingStudent.name }}</strong></p>
          <div class="form-item">
            <label>Numerical / Percentage Grade Scale Input</label>
            <input type="text" v-model="inputProjGrade" placeholder="e.g., 1.25 or 95%" />
          </div>
          <div class="form-item">
            <label>Evaluation Review / Technical Comments Feedback</label>
            <textarea rows="4" v-model="inputProjComment" placeholder="Provide instructional feedback to help refine software core systems..."></textarea>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn-outline" @click="showGradeProjectModal = false; currentGradingStudent = null">Cancel</button>
          <button class="btn-primary" @click="saveProjectGrade">Verify & Complete Task</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .manage-wrapper { 
    padding: 40px; 
    height: 100%; 
    overflow-y: auto; 
    background: #f8fafc; 
  }
  
  .class-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); 
    gap: 25px; 
    max-width: 1200px; 
    margin: 0 auto; 
  }
  
  .class-card { 
    background: white; 
    border-radius: 12px; 
    padding: 25px; 
    border: 1px solid #e2e8f0; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.02); 
    transition: 0.2s; 
  }
  
  .class-card:hover { 
    transform: translateY(-3px); 
    border-color: #800000; 
    box-shadow: 0 10px 15px rgba(0,0,0,0.05); 
  }
  
  .card-head { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 10px; 
  }
  
  .card-head h2 { 
    margin: 0; 
    color: #800000; 
    font-size: 1.5rem; 
    font-weight: 900; 
  }
  
  .badge { 
    background: #f1f5f9; 
    color: #475569; 
    padding: 4px 10px; 
    border-radius: 6px; 
    font-size: 0.8rem; 
    font-weight: bold; 
  }
  
  .class-card p { 
    font-size: 1.1rem; 
    color: #334155; 
    margin: 0 0 20px 0; 
    font-weight: 600; 
  }
  
  .card-foot { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    border-top: 1px solid #f1f5f9; 
    padding-top: 15px; 
  }
  
  .card-foot span { 
    font-size: 0.9rem; 
    color: #64748b; 
    font-weight: 600; 
  }
  
  .open-btn { 
    background: #1e293b; 
    color: white; 
    border: none; 
    padding: 8px 16px; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold; 
    transition: 0.2s; 
    white-space: nowrap;
  }
  
  .open-btn:hover { 
    background: #800000; 
  }

  .class-detail { 
    max-width: 1200px; 
    margin: 0 auto; 
  }
  
  .detail-header { 
    display: flex; 
    align-items: center; 
    gap: 25px; 
    background: white; 
    padding: 25px 30px; 
    border-radius: 12px; 
    border: 1px solid #e2e8f0; 
    margin-bottom: 25px; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.02); 
  }
  
  .back-btn { 
    background: #f1f5f9; 
    color: #1e293b; 
    border: 1px solid #cbd5e1; 
    padding: 10px 20px; 
    border-radius: 8px; 
    font-weight: bold; 
    cursor: pointer; 
    transition: 0.2s; 
  }
  
  .back-btn:hover { 
    background: #e2e8f0; 
  }
  
  .title-group h1 { 
    margin: 0 0 5px 0; 
    font-size: 1.8rem; 
    color: #1e293b; 
    font-weight: 900; 
  }
  
  .title-group p { 
    margin: 0; 
    color: #64748b; 
    font-size: 1rem; 
    font-weight: 600; 
  }
  
  .highlight { 
    color: #800000; 
    font-weight: 900; 
  }

  .menu-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 20px; 
  }
  
  .menu-card { 
    background: white; 
    border: 1px solid #e2e8f0; 
    border-radius: 12px; 
    padding: 25px; 
    text-align: left; 
    cursor: pointer; 
    transition: 0.2s; 
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    width: 100%; 
  }
  
  .menu-card:hover { 
    transform: translateY(-3px); 
    border-color: #800000; 
    box-shadow: 0 10px 20px rgba(128,0,0,0.05); 
  }
  
  .menu-card .icon { 
    font-size: 2.5rem; 
    margin-bottom: 15px; 
  }
  
  .menu-card h3 { 
    margin: 0 0 10px 0; 
    font-size: 1.2rem; 
    color: #1e293b; 
    font-weight: 800; 
  }
  
  .menu-card p { 
    margin: 0; 
    color: #64748b; 
    font-size: 0.9rem; 
    line-height: 1.4; 
  }
  
  .highlight-card { 
    border: 2px solid #ffd700; 
    background: #fffcf0; 
  }
  
  .highlight-card:hover { 
    border-color: #800000; 
  }

  .action-bar { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    background: white; 
    padding: 20px 25px; 
    border-radius: 12px; 
    border: 1px solid #e2e8f0; 
    margin-bottom: 20px; 
    font-weight: 600; 
    color: #334155; 
    gap: 20px; 
  }
  
  .flex-row-end { 
    justify-content: space-between; 
  }
  
  .warning-bar { 
    background: #fff1f2; 
    border-color: #fecdd3; 
    color: #be123c; 
  }
  
  .success-bar { 
    background: #f0fdf4; 
    border-color: #bbf7d0; 
    color: #15803d; 
  }
  
  .action-buttons { 
    display: flex; 
    gap: 10px; 
  }

  .btn-primary { 
    background: #800000; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    border-radius: 8px; 
    font-weight: bold; 
    cursor: pointer; 
    transition: 0.2s; 
  }
  
  .btn-primary:hover { 
    background: #600000; 
  }
  
  .btn-outline { 
    background: transparent; 
    color: #1e293b; 
    border: 2px solid #cbd5e1; 
    padding: 10px 20px; 
    border-radius: 8px; 
    font-weight: bold; 
    cursor: pointer; 
    transition: 0.2s; 
  }
  
  .btn-outline:hover { 
    border-color: #1e293b; 
    background: #f8fafc; 
  }
  
  .btn-danger { 
    background: #ef4444; 
    color: white; 
    border: none; 
    padding: 8px 12px; 
    border-radius: 6px; 
    font-weight: bold; 
    cursor: pointer; 
  }
  
  .btn-danger:hover { 
    background: #dc2626; 
  }
  
  .btn-warning { 
    background: #f59e0b; 
    color: white; 
    border: none; 
    padding: 8px 12px; 
    border-radius: 6px; 
    font-weight: bold; 
    cursor: pointer; 
  }
  
  .btn-warning:hover { 
    background: #d97706; 
  }
  
  .btn-sm { 
    padding: 6px 12px; 
    font-size: 0.85rem; 
    border-radius: 6px; 
  }

  .table-container { 
    background: white; 
    border-radius: 12px; 
    border: 1px solid #e2e8f0; 
    overflow: hidden; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.02); 
  }
  
  .table-scrollable { 
    overflow-x: auto; 
    width: 100%; 
    max-width: 100%; 
  }
  
  table { 
    width: 100%; 
    border-collapse: collapse; 
    text-align: left; 
    table-layout: auto; 
  }
  
  th { 
    background: #f8fafc; 
    padding: 12px 18px; 
    font-size: 0.85rem; 
    color: #475569; 
    text-transform: uppercase; 
    border: 1px solid #e2e8f0; 
    font-weight: bold; 
    text-align: center; 
  }
  
  td { 
    padding: 14px 18px; 
    border: 1px solid #f1f5f9; 
    color: #334155; 
    vertical-align: middle; 
    font-size: 0.95rem; 
  }

  .fixed-col { 
    position: sticky; 
    left: 0; 
    background: white; 
    z-index: 10; 
    border-right: 2px solid #cbd5e1 !important; 
    box-shadow: 2px 0 5px rgba(0,0,0,0.02); 
    min-width: 200px; 
    text-align: left; 
  }
  
  th.fixed-col { 
    background: #f8fafc; 
    z-index: 11; 
  }

  .section-head { 
    font-weight: 900; 
    color: white; 
    font-size: 0.85rem; 
    letter-spacing: 0.5px; 
  }
  
  .att-head { background: #475569; }
  .proj-head { background: #0369a1; }
  .quiz-head { background: #b45309; }
  .exam-head { background: #6d28d9; }
  
  .sub-th { 
    background: #f1f5f9; 
    color: #475569; 
    font-size: 0.75rem; 
    font-weight: 800; 
    min-width: 110px; 
    padding: 8px; 
  }
  
  .text-wrap-heading { 
    max-width: 150px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
  }
  
  .comment-cell { 
    font-size: 0.85rem; 
    color: #64748b; 
    max-width: 250px; 
    line-height: 1.4; 
    font-style: italic; 
  }

  .bold { 
    font-weight: 700; 
    color: #1e293b; 
  }
  
  .text-red { 
    color: #ef4444; 
  }
  
  .font-danger { 
    color: #b91c1c !important; 
  }
  
  .text-muted { 
    color: #94a3b8; 
  }
  
  .text-center { 
    text-align: center; 
  }
  
  .font-italic { 
    font-style: italic; 
  }

  .project-list-grid { 
    display: flex; 
    flex-direction: column; 
    gap: 15px; 
  }
  
  .project-row-card { 
    background: white; 
    border: 1px solid #e2e8f0; 
    border-radius: 12px; 
    padding: 25px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    cursor: pointer; 
    transition: 0.2s; 
    box-shadow: 0 2px 5px rgba(0,0,0,0.01); 
  }
  
  .project-row-card:hover { 
    border-color: #0369a1; 
    transform: translateX(4px); 
    box-shadow: 0 4px 12px rgba(0,0,0,0.04); 
  }
  
  .project-info-block h3 { 
    margin: 0 0 6px 0; 
    color: #1e293b; 
    font-weight: 800; 
    font-size: 1.2rem; 
  }
  
  .project-info-block p { 
    margin: 0; 
    color: #64748b; 
    font-size: 0.95rem; 
    line-height: 1.5; 
  }

  .status-badge { 
    padding: 5px 12px; 
    border-radius: 20px; 
    font-size: 0.8rem; 
    font-weight: 800; 
    text-transform: uppercase; 
    white-space: nowrap; 
    display: inline-block; 
  }
  
  .status-badge.active { background: #e0f2fe; color: #0369a1; }
  .status-badge.dropped { background: #fee2e2; color: #b91c1c; }
  .status-badge.odp { background: #fef3c7; color: #b45309; }

  .proj-badge { 
    padding: 5px 10px; 
    border-radius: 6px; 
    font-size: 0.8rem; 
    font-weight: bold; 
    text-transform: uppercase; 
    display: inline-flex; 
    align-items: center; 
    gap: 4px; 
    white-space: nowrap; 
  }
  
  .proj-badge.pending { background: #fee2e2; color: #ef4444; border: 1px solid #fecdd3; }
  .proj-badge.submitted { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
  .proj-badge.completed { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
  
  .proj-badge small { 
    font-size: 0.75rem; 
    color: inherit; 
    font-weight: 900; 
    background: rgba(255,255,255,0.4); 
    padding: 1px 4px; 
    border-radius: 4px; 
    margin-left: 2px; 
  }

  .critical-badge { 
    background: #ef4444; 
    color: white; 
    padding: 4px 10px; 
    border-radius: 6px; 
    font-size: 0.8rem; 
    font-weight: bold; 
    white-space: nowrap; 
  }
  
  .safe-badge { 
    background: #10b981; 
    color: white; 
    padding: 4px 10px; 
    border-radius: 6px; 
    font-size: 0.8rem; 
    font-weight: bold; 
    white-space: nowrap; 
  }

  .setup-box { 
    background: white; 
    padding: 40px; 
    border-radius: 12px; 
    border: 1px solid #e2e8f0; 
    text-align: center; 
    max-width: 500px; 
    margin: 40px auto; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.02); 
  }
  
  .setup-box h2 { 
    margin: 0 0 10px 0; 
    color: #1e293b; 
    font-weight: 900; 
  }
  
  .setup-box p { 
    color: #64748b; 
    margin-bottom: 25px; 
    font-size: 0.95rem; 
  }
  
  .setup-input { 
    display: flex; 
    gap: 10px; 
    justify-content: center; 
  }
  
  .setup-input input { 
    padding: 12px; 
    border: 2px solid #cbd5e1; 
    border-radius: 8px; 
    font-size: 1.1rem; 
    width: 140px; 
    text-align: center; 
    font-weight: bold; 
    outline: none; 
  }
  
  .setup-input input:focus { 
    border-color: #800000; 
  }

  .score-input, .grade-input { 
    width: 110px; 
    padding: 8px 12px; 
    border: 1px solid #cbd5e1; 
    border-radius: 6px; 
    font-weight: bold; 
    text-align: center; 
    outline: none; 
    transition: 0.2s; 
  }
  
  .score-input:focus, .grade-input:focus { 
    border-color: #800000; 
    box-shadow: 0 0 0 3px rgba(128,0,0,0.1); 
  }
  
  .action-group { 
    display: flex; 
    gap: 8px; 
  }

  .modal-backdrop { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100vw; 
    height: 100vh; 
    background: rgba(15, 23, 42, 0.6); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    z-index: 1000; 
    padding: 20px; 
    backdrop-filter: blur(4px); 
  }
  
  .modal-box { 
    background: white; 
    border-radius: 16px; 
    max-width: 550px; 
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    overflow: hidden; 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 
  }

  .modal-head { 
    padding: 20px 25px; 
    background: #f8fafc; 
    border-bottom: 1px solid #e2e8f0; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
  }
  
  .modal-head h2 { 
    margin: 0; 
    font-size: 1.3rem; 
    font-weight: 900; 
    color: #1e293b; 
  }
  
  .close-cross { 
    background: transparent; 
    border: none; 
    font-size: 1.8rem; 
    cursor: pointer; 
    color: #94a3b8; 
    transition: 0.2s; 
  }
  
  .close-cross:hover { 
    color: #ef4444; 
  }

  .modal-body { 
    padding: 25px; 
    display: flex; 
    flex-direction: column; 
    gap: 18px; 
  }
  
  .grading-student-lbl { 
    font-size: 1.05rem; 
    color: #475569; 
    margin: 0; 
    padding-bottom: 5px; 
    border-bottom: 1px dashed #e2e8f0; 
  }
  
  .form-item { 
    display: flex; 
    flex-direction: column; 
    gap: 8px; 
  }
  
  .form-item label { 
    font-size: 0.8rem; 
    font-weight: 800; 
    color: #475569; 
    text-transform: uppercase; 
    letter-spacing: 0.5px; 
  }
  
  .form-item input { 
    padding: 12px 16px; 
    border: 2px solid #cbd5e1; 
    border-radius: 8px; 
    font-size: 1rem; 
    outline: none; 
    transition: 0.2s; 
    font-weight: 600; 
    color: #1e293b; 
  }
  
  .form-item input:focus { 
    border-color: #800000; 
  }
  
  .form-item textarea { 
    padding: 12px 16px; 
    border: 2px solid #cbd5e1; 
    border-radius: 8px; 
    font-size: 0.95rem; 
    outline: none; 
    transition: 0.2s; 
    resize: vertical; 
    font-family: inherit; 
    color: #334155; 
    line-height: 1.5; 
  }
  
  .form-item textarea:focus { 
    border-color: #800000; 
  }

  .modal-foot { 
    padding: 20px 25px; 
    background: #f8fafc; 
    border-top: 1px solid #e2e8f0; 
    display: flex; 
    justify-content: flex-end; 
    gap: 12px; 
  }

  .fade-in { 
    animation: fadeIn 0.25s ease-in-out forwards; 
  }
  
  @keyframes fadeIn { 
    from { opacity: 0; } 
    to { opacity: 1; } 
  }
  
  .animate-scaleUp { 
    animation: scaleUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; 
  }
  
  @keyframes scaleUp { 
    from { transform: scale(0.95); opacity: 0; } 
    to { transform: scale(1); opacity: 1; } 
  }
</style>

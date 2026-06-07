<template>
  <div class="tutorial-container">
    <h2 class="tutorial-title">📚 Tutorial Center</h2>
    <p class="tutorial-subtitle">Learn subject-by-subject with comprehensive tutorials</p>
    
    <div class="filters">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search tutorials or subjects..." 
        class="search-input"
      />
      <select v-model="selectedSemester" class="semester-filter">
        <option value="">All Semesters</option>
        <option v-for="sem in semesters" :key="sem" :value="sem">{{ sem }}</option>
      </select>
    </div>

    <div class="subjects-list">
      <div 
        v-for="subject in filteredSubjects" 
        :key="subject.id" 
        class="subject-card"
      >
        <div 
          class="subject-header"
          @click="toggleSubject(subject.id)"
        >
          <div class="subject-info">
            <span class="toggle-icon">{{ expandedSubjects.has(subject.id) ? '▼' : '▶' }}</span>
            <div class="subject-details">
              <h3 class="subject-code">{{ subject.code }}</h3>
              <p class="subject-title">{{ subject.title }}</p>
            </div>
          </div>
          <span class="tutorial-count">{{ subject.tutorials?.length || 0 }} tutorials</span>
        </div>

        <div v-if="expandedSubjects.has(subject.id)" class="tutorials-section">
          <div v-if="subject.tutorials && subject.tutorials.length > 0" class="tutorials-grid">
            <div 
              v-for="tutorial in subject.tutorials" 
              :key="tutorial.id" 
              class="tutorial-card"
            >
              <div class="tutorial-icon">📖</div>
              <h4 class="tutorial-name">{{ tutorial.name }}</h4>
              <p class="tutorial-description">{{ tutorial.description }}</p>
              <div class="tutorial-meta">
                <span class="duration">⏱️ {{ tutorial.duration }}</span>
                <span class="difficulty" :class="`difficulty-${tutorial.difficulty.toLowerCase()}`">
                  {{ tutorial.difficulty }}
                </span>
              </div>

              <div v-if="tutorial.resources && tutorial.resources.length > 0" class="resources-section">
                <h5 class="resources-title">📚 Resources</h5>
                <div class="resources-grid">
                  <a 
                    v-for="resource in tutorial.resources" 
                    :key="resource.id"
                    :href="resource.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="resource-link"
                    :title="resource.title"
                  >
                    <span class="resource-icon">{{ getResourceIcon(resource.type) }}</span>
                    <span class="resource-label">{{ resource.title }}</span>
                  </a>
                </div>
              </div>

              <button class="view-btn">View Tutorial</button>
            </div>
          </div>
          <div v-else class="no-tutorials">
            <p>No tutorials available for this subject yet.</p>
          </div>
        </div>
      </div>

      <div v-if="filteredSubjects.length === 0" class="no-results">
        <p>No subjects or tutorials match your search.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Resource {
  id: string
  title: string
  type: 'video' | 'article' | 'link' | 'pdf' | 'code'
  url: string
}

interface Tutorial {
  id: string
  name: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  resources?: Resource[]
}

interface Subject {
  id: string
  code: string
  title: string
  semester: string
  units: number
  completed?: boolean
  tutorials?: Tutorial[]
}

const props = defineProps({
  subjects: {
    type: Array<Subject>,
    default: () => []
  }
})

const semesters = ['Freshman 1st', 'Freshman 2nd', 'Sophomore 1st', 'Sophomore 2nd', 'Junior 1st', 'Junior 2nd', 'Junior Summer', 'Senior 1st', 'Senior 2nd']

const searchQuery = ref('')
const selectedSemester = ref('')
const expandedSubjects = ref(new Set<string>())

// Sample tutorial data - replace with actual data from your backend
const sampleSubjects: Subject[] = [
  {
    id: '1',
    code: 'CS101',
    title: 'Introduction to Computer Science',
    semester: 'Freshman 1st',
    units: 3,
    tutorials: [
      { 
        id: '1-1', 
        name: 'Getting Started with Programming', 
        description: 'Learn the basics of programming concepts', 
        duration: '15 min', 
        difficulty: 'Beginner',
        resources: [
          { id: 'r1-1-1', title: 'Python Basics Tutorial', type: 'video', url: 'https://example.com/python-basics' },
          { id: 'r1-1-2', title: 'Programming Fundamentals Guide', type: 'pdf', url: 'https://example.com/fundamentals.pdf' },
          { id: 'r1-1-3', title: 'Write Your First Program', type: 'code', url: 'https://example.com/first-program' }
        ]
      },
      { 
        id: '1-2', 
        name: 'Variables and Data Types', 
        description: 'Understand different data types and how to use them', 
        duration: '20 min', 
        difficulty: 'Beginner',
        resources: [
          { id: 'r1-2-1', title: 'Data Types Explained', type: 'video', url: 'https://example.com/data-types-video' },
          { id: 'r1-2-2', title: 'Variables Cheat Sheet', type: 'pdf', url: 'https://example.com/variables-cheatsheet.pdf' },
          { id: 'r1-2-3', title: 'Interactive Examples', type: 'link', url: 'https://example.com/interactive-datatypes' },
          { id: 'r1-2-4', title: 'Variable Practice Code', type: 'code', url: 'https://example.com/variable-exercises' }
        ]
      },
      { 
        id: '1-3', 
        name: 'Control Flow and Loops', 
        description: 'Master conditionals and iteration', 
        duration: '25 min', 
        difficulty: 'Intermediate',
        resources: [
          { id: 'r1-3-1', title: 'Control Flow Complete Tutorial', type: 'video', url: 'https://example.com/control-flow' },
          { id: 'r1-3-2', title: 'Loops Deep Dive', type: 'video', url: 'https://example.com/loops-video' },
          { id: 'r1-3-3', title: 'If-Else and Loops Guide', type: 'article', url: 'https://example.com/control-flow-article' },
          { id: 'r1-3-4', title: 'Practice Problems', type: 'pdf', url: 'https://example.com/control-flow-problems.pdf' }
        ]
      }
    ]
  },
  {
    id: '2',
    code: 'MATH101',
    title: 'Calculus I',
    semester: 'Freshman 1st',
    units: 4,
    tutorials: [
      { 
        id: '2-1', 
        name: 'Limits and Continuity', 
        description: 'Understand the foundation of calculus', 
        duration: '30 min', 
        difficulty: 'Intermediate',
        resources: [
          { id: 'r2-1-1', title: 'Limits Explained Visually', type: 'video', url: 'https://example.com/limits-visual' },
          { id: 'r2-1-2', title: 'Continuity Concepts', type: 'article', url: 'https://example.com/continuity-article' },
          { id: 'r2-1-3', title: 'Limits and Continuity Formulas', type: 'pdf', url: 'https://example.com/limits-formulas.pdf' },
          { id: 'r2-1-4', title: 'GeoGebra Interactive Tool', type: 'link', url: 'https://example.com/geogebra-limits' }
        ]
      },
      { 
        id: '2-2', 
        name: 'Derivatives', 
        description: 'Learn how to calculate and apply derivatives', 
        duration: '35 min', 
        difficulty: 'Intermediate',
        resources: [
          { id: 'r2-2-1', title: 'Derivative Definition', type: 'video', url: 'https://example.com/derivative-definition' },
          { id: 'r2-2-2', title: 'Power Rule and Chain Rule', type: 'video', url: 'https://example.com/derivative-rules' },
          { id: 'r2-2-3', title: 'Derivatives Cheat Sheet', type: 'pdf', url: 'https://example.com/derivative-rules.pdf' },
          { id: 'r2-2-4', title: 'Derivative Calculator Practice', type: 'code', url: 'https://example.com/derivative-practice' }
        ]
      },
      { 
        id: '2-3', 
        name: 'Integration', 
        description: 'Master integration techniques', 
        duration: '40 min', 
        difficulty: 'Advanced',
        resources: [
          { id: 'r2-3-1', title: 'Antiderivatives Explained', type: 'video', url: 'https://example.com/antiderivatives' },
          { id: 'r2-3-2', title: 'Integration by Substitution', type: 'video', url: 'https://example.com/substitution' },
          { id: 'r2-3-3', title: 'Integration Techniques Guide', type: 'article', url: 'https://example.com/integration-guide' },
          { id: 'r2-3-4', title: 'Integration Formulas Reference', type: 'pdf', url: 'https://example.com/integration-formulas.pdf' },
          { id: 'r2-3-5', title: 'Wolfram Alpha Integration Tool', type: 'link', url: 'https://example.com/wolfram-alpha' }
        ]
      }
    ]
  },
  {
    id: '3',
    code: 'ENG101',
    title: 'English Composition',
    semester: 'Freshman 1st',
    units: 3,
    tutorials: [
      { 
        id: '3-1', 
        name: 'Essay Structure', 
        description: 'Learn how to organize your essay effectively', 
        duration: '20 min', 
        difficulty: 'Beginner',
        resources: [
          { id: 'r3-1-1', title: 'Essay Structure Breakdown', type: 'video', url: 'https://example.com/essay-structure' },
          { id: 'r3-1-2', title: 'The 5-Paragraph Essay Template', type: 'pdf', url: 'https://example.com/essay-template.pdf' },
          { id: 'r3-1-3', title: 'Essay Examples and Analysis', type: 'article', url: 'https://example.com/essay-examples' },
          { id: 'r3-1-4', title: 'Interactive Essay Planner', type: 'link', url: 'https://example.com/essay-planner' }
        ]
      },
      { 
        id: '3-2', 
        name: 'Research and Citations', 
        description: 'Master proper citation formats', 
        duration: '25 min', 
        difficulty: 'Intermediate',
        resources: [
          { id: 'r3-2-1', title: 'MLA Citation Style Guide', type: 'video', url: 'https://example.com/mla-guide' },
          { id: 'r3-2-2', title: 'APA vs MLA vs Chicago', type: 'article', url: 'https://example.com/citation-styles' },
          { id: 'r3-2-3', title: 'Citation Formats Reference', type: 'pdf', url: 'https://example.com/citation-reference.pdf' },
          { id: 'r3-2-4', title: 'EasyBib Citation Generator', type: 'link', url: 'https://example.com/easybib' },
          { id: 'r3-2-5', title: 'Research Tips and Tricks', type: 'code', url: 'https://example.com/research-tips' }
        ]
      }
    ]
  }
]

const displaySubjects = computed(() => {
  return props.subjects && props.subjects.length > 0 ? props.subjects : sampleSubjects
})

const filteredSubjects = computed(() => {
  return displaySubjects.value.filter((subject: Subject) => {
    const matchesSearch = 
      searchQuery.value === '' ||
      subject.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      subject.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (subject.tutorials?.some(t => t.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    const matchesSemester = selectedSemester.value === '' || subject.semester === selectedSemester.value

    return matchesSearch && matchesSemester
  })
})

const toggleSubject = (subjectId: string) => {
  if (expandedSubjects.value.has(subjectId)) {
    expandedSubjects.value.delete(subjectId)
  } else {
    expandedSubjects.value.add(subjectId)
  }
}

const getResourceIcon = (type: string): string => {
  const icons: Record<string, string> = {
    video: '🎥',
    article: '📄',
    link: '🔗',
    pdf: '📕',
    code: '💻'
  }
  return icons[type] || '📎'
}
</script>

<style scoped>
.tutorial-container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.tutorial-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 10px;
}

.tutorial-subtitle {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 30px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-input,
.semester-filter {
  padding: 10px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s;
}

.search-input {
  flex: 1;
  min-width: 250px;
}

.search-input:focus,
.semester-filter:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.subjects-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.subject-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.subject-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.subject-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  transition: background 0.2s;
}

.subject-header:hover {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

.subject-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.toggle-icon {
  font-size: 0.8rem;
  color: #64748b;
  transition: transform 0.2s;
}

.subject-details {
  flex: 1;
}

.subject-code {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  margin-bottom: 4px;
}

.subject-title {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.tutorial-count {
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.tutorials-section {
  padding: 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.tutorial-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 15px;
  transition: all 0.2s;
}

.tutorial-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.tutorial-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.tutorial-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.tutorial-description {
  color: #64748b;
  font-size: 0.85rem;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.tutorial-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 0.85rem;
}

.duration {
  color: #64748b;
}

.difficulty {
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;
}

.difficulty-beginner {
  background: #dcfce7;
  color: #166534;
}

.difficulty-intermediate {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-advanced {
  background: #fee2e2;
  color: #991b1b;
}

.view-btn {
  width: 100%;
  padding: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.view-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.view-btn:active {
  transform: translateY(0);
}

.resources-section {
  margin: 12px 0;
  padding: 12px;
  background: #f1f5f9;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.resources-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.resources-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-decoration: none;
  color: #3b82f6;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.resource-link:hover {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #1e40af;
}

.resource-icon {
  font-size: 0.9rem;
  min-width: 18px;
  text-align: center;
}

.resource-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.no-tutorials {
  padding: 30px 20px;
  text-align: center;
  color: #64748b;
  background: white;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
}

.no-results p {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .search-input {
    min-width: 100%;
  }

  .tutorials-grid {
    grid-template-columns: 1fr;
  }

  .tutorial-container {
    padding: 20px;
  }

  .tutorial-title {
    font-size: 1.5rem;
  }
}
</style>
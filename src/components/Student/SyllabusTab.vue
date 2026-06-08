<template>
  <div class="syllabus-container">
    <div class="course-banner-card">
      <div class="banner-top">
        <span class="course-code-badge">🔑 {{ courseInfo.code }}</span>
        <span class="credit-badge">📐 {{ courseInfo.credits }} Units</span>
      </div>
      <h1 class="course-title-text">{{ courseInfo.title }}</h1>
      
      <div class="instructor-grid">
        <div class="info-item">
          <span class="icon">👤</span>
          <div>
            <label>Instructor</label>
            <strong>{{ courseInfo.instructor }}</strong>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">🕒</span>
          <div>
            <label>Class Schedule & Room</label>
            <strong>{{ courseInfo.schedule }} | Rm {{ courseInfo.room }}</strong>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">📅</span>
          <div>
            <label>Consultation Hours</label>
            <strong>{{ courseInfo.consultation }}</strong>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">⛓️</span>
          <div>
            <label>Prerequisite</label>
            <strong>{{ courseInfo.prerequisite }}</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="syllabus-menu-tabs">
      <button 
        v-for="menu in menuTabs" 
        :key="menu.id"
        :class="['menu-tab-btn', { active: activeMenu === menu.id }]"
        @click="activeMenu = menu.id"
      >
        {{ menu.label }}
      </button>
    </div>

    <div class="syllabus-content-area">
      
      <div v-if="activeMenu === 'overview'" class="tab-pane animate-fade">
        <div class="info-card-section">
          <h3>📖 Course Description</h3>
          <p class="description-block">{{ courseInfo.description }}</p>
        </div>

        <div class="info-card-section">
          <h3>🎯 Course Outcomes (COs)</h3>
          <div class="outcome-list">
            <div v-for="(co, index) in courseOutcomes" :key="index" class="outcome-item-card">
              <span class="co-tag">{{ co.code }}</span>
              <p class="co-text">{{ co.text }}</p>
            </div>
          </div>
        </div>

        <div class="info-card-section">
          <h3>🏛️ MSU Vision & Mission</h3>
          <div class="vm-grid">
            <div class="vm-box">
              <h4>Vision</h4>
              <p>MSU System aspires to be a Center of Excellence in Instruction, Research and Extension transforming itself into a premier and globally competitive national peace university.</p>
            </div>
            <div class="vm-box">
              <h4>Mission</h4>
              <p>Lead in social transformation through peace education, ensure excellence in instruction, advance linkages, and demonstrate inclusiveness for Mindanao and the Filipino nation.</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeMenu === 'timeline'" class="tab-pane animate-fade">
        <h3 class="section-heading">📅 Semester Learning Plan & Deliverables</h3>
        <div class="timeline-wrapper">
          <div v-for="(week, index) in learningPlan" :key="index" class="timeline-card">
            <div class="timeline-week-badge">Week {{ week.week }}</div>
            <div class="timeline-body">
              <div class="timeline-header-row">
                <h4>{{ week.topic }}</h4>
                <div class="co-badges-row">
                  <span v-for="co in week.cos" :key="co" class="mini-co-badge">{{ co }}</span>
                </div>
              </div>
              <p class="learning-objective"><strong>Objective:</strong> {{ week.objective }}</p>
              
              <div class="modality-grid">
                <div class="modality-box async">
                  <span>💻 Asynchronous / Support:</span>
                  <p>{{ week.async }}</p>
                </div>
                <div class="modality-box sync">
                  <span>👥 Synchronous / Face-to-Face:</span>
                  <p>{{ week.sync }}</p>
                </div>
              </div>
              
              <div class="assessment-tag-line">
                📌 <strong>Assessment Task:</strong> {{ week.assessment }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeMenu === 'grading'" class="tab-pane animate-fade">
        <div class="grading-dashboard-grid">
          <div class="info-card-section">
            <h3>📊 Grading Criteria Weight</h3>
            <div class="criteria-list">
              <div v-for="item in gradingWeights" :key="item.name" class="criteria-row-item">
                <span class="criteria-name">{{ item.name }}</span>
                <div class="progress-bar-container">
                  <div class="progress-fill" :style="{ width: item.weight + '%' }"></div>
                </div>
                <span class="criteria-percentage">{{ item.weight }}%</span>
              </div>
            </div>
            <p class="passing-badge-alert">🔑 Passing Rate: <strong>60% Cumulative Score</strong></p>
          </div>

          <div class="info-card-section">
            <h3>📈 Grade Equivalent Scale</h3>
            <div class="table-scroll-container">
              <table class="grading-scale-table">
                <thead>
                  <tr>
                    <th>Score Range</th>
                    <th>Grade Point</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="grade in gradingScale" :key="grade.range">
                    <td>{{ grade.range }}</td>
                    <td :class="{ 'fail-grade': grade.point === '5.0', 'inc-grade': grade.point === 'INC' }">
                      <strong>{{ grade.point }}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="info-card-section rubrics-top-margin">
          <h3>📝 Detailed Assessment Rubrics</h3>
          <p class="rubric-intro-text">Standard parameters applied to assignments and individual project contribution checkpoints.</p>
          
          <div class="rubric-toggle-bar">
            <button :class="{ active: activeRubric === 'reaction' }" @click="activeRubric = 'reaction'">Reaction Paper Criteria</button>
            <button :class="{ active: activeRubric === 'project' }" @click="activeRubric = 'project'">Individual Project Contribution</button>
          </div>

          <div class="table-scroll-container">
            <table class="rubric-data-matrix">
              <thead>
                <tr>
                  <th>Criteria Category</th>
                  <th>Excellent (5)</th>
                  <th>Very Good (4)</th>
                  <th>Satisfactory (3)</th>
                  <th>Fair (2)</th>
                  <th>Poor (1)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in targetedRubricData" :key="row.criterion">
                  <td class="criterion-title-column">
                    <strong>{{ row.criterion }}</strong>
                    <span class="points-sub-tag">{{ row.points }}</span>
                  </td>
                  <td>{{ row.score5 }}</td>
                  <td>{{ row.score4 }}</td>
                  <td>{{ row.score3 }}</td>
                  <td>{{ row.score2 }}</td>
                  <td>{{ row.score1 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="activeMenu === 'policies'" class="tab-pane animate-fade">
        <div class="info-card-section">
          <h3>⚠️ Core Class Policies & Guidelines</h3>
          <p class="policy-note">Academic policies strictly observed by the Department of Computing Sciences:</p>
          <div class="policy-list-grid">
            <div v-for="(policy, index) in policiesList" :key="index" class="policy-card-item">
              <div class="policy-num">0{{ index + 1 }}</div>
              <p class="policy-desc-text" v-html="policy"></p>
            </div>
          </div>
        </div>

        <div class="disability-support-alert">
          💡 <strong>Student with Disabilities Support Notice:</strong> Any student who requires special administrative accommodations to meet course tasks due to certified health/physical conditions must coordinate with the Institute Clinic and forward verified documents to the instructor promptly.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeMenu = ref('overview');
const activeRubric = ref('reaction');

const menuTabs = [
  { id: 'overview', label: 'Overview & Outcomes' },
  { id: 'timeline', label: 'Learning Plan & Timeline' },
  { id: 'grading', label: 'Grading & Rubrics' },
  { id: 'policies', label: 'Class Policies' }
];

const courseInfo = {
  code: 'CSC186',
  title: 'Software Architecture Design',
  credits: 3,
  instructor: 'ABDULRACHMAN, Lucman Moalam',
  schedule: 'Fri/Sat (FS) 08:30 AM - 10:00 AM',
  room: '202',
  consultation: 'Mondays to Fridays 10:00 AM - 11:00 AM',
  prerequisite: 'CCC 102 (Computer Programming 2)',
  description: 'This course introduces fundamental theories and concepts of human-computer interaction (HCI). HCI is an interdisciplinary field that integrates theories and methodologies across many domains including cognitive psychology, neurocognitive engineering, computer science, human factors, and engineering design. Students will gain theoretical knowledge of and practical experience in the fundamental aspects of human perception, cognition, and learning as relates to the design, implementation, and evaluation of interfaces.'
};

const courseOutcomes = [
  { code: 'CO1', text: 'Develop appropriate user interfaces for domain specific applications.' },
  { code: 'CO2', text: 'Evaluate the effectiveness of a design of an application or product in solving domain-specific problems.' }
];

const learningPlan = [
  { week: '1', topic: 'Course Orientation & Setup', cos: ['CO1'], objective: 'Understand the core foundations of human-computer interaction and map environment platforms.', async: 'Self-Introduction uploaded in the Google Classroom pipeline.', sync: 'Synchronous classroom assembly overviewing course scopes.', assessment: 'Short Reaction Paper submitted to Google Classroom' },
  { week: '2', topic: 'HCI Introduction & Core Purpose', cos: ['CO1'], objective: 'Describe the primary purpose and critical multi-disciplinary importance of interactive environments.', async: 'Video content detailing user-experience interaction parameters.', sync: 'Classroom standard lecture session & alignment consulting.', assessment: 'Short Reaction Paper on Google Classroom' },
  { week: '3', topic: 'Specific HCI Structural Guidelines', cos: ['CO1', 'CO2'], objective: 'Illustrate and dissect the engineering significance of the UI Layer within complex Software Architectures.', async: 'Assigned platform reading packets hosted on online workspace.', sync: 'Interactive lecture and architectural decomposition review.', assessment: 'Short Reaction Paper & Exercise Matrix' },
  { week: '4', topic: 'Human Factors & Cognitive Theories', cos: ['CO1', 'CO2'], objective: 'Understand the fundamental constraints of human sensation, data processing, and Fitts\'s Law operations.', async: 'Targeted research readings posted on Google Classroom workspace.', sync: 'Classroom case-analysis modeling human speed-accuracy trade-offs.', assessment: 'Short Reaction Paper & Interface Speed Testing' },
  { week: '5', topic: 'Interactive Interface Design Modeling', cos: ['CO1', 'CO2'], objective: 'Describe layout processes for applications, focusing cleanly on interactive modeling structures.', async: 'Framework reference patterns deployed online.', sync: 'Live interface whiteboarding design analysis review.', assessment: 'Short Reflection Entry Submission' },
  { week: '6', topic: 'User Interface Layer Tools', cos: ['CO1', 'CO2'], objective: 'Enumerate and catalog modern Web-Based UI layout engine frameworks and design tools.', async: 'Video setup logs and sample layout configuration files.', sync: 'Lab platform walkthrough mapping component engines.', assessment: 'Short Reaction Paper & Workspace Execution' },
  { week: '7', topic: 'UI Development Toolkits', cos: ['CO1', 'CO2'], objective: 'Leverage component libraries and responsive layout frameworks effectively.', async: 'UI library starter sandboxes pushed to online tools.', sync: 'Live code review demonstrating asset system bindings.', assessment: 'Practical Component Exercise' },
  { week: '8', topic: 'Interactive System Frameworks', cos: ['CO1', 'CO2'], objective: 'Describe engineering design architectural principles, modern component lifecycle trees, and decoupled patterns.', async: 'Structural architecture templates available on workspace.', sync: 'Classroom review detailing reactive state management patterns.', assessment: 'Framework Mapping Layout Exercise' },
  { week: '9', topic: 'User Interface Evaluation Metrics', cos: ['CO1', 'CO2'], objective: 'Evaluate the structural UI layout of software based on clean heuristics and defined usability test paradigms.', async: 'Usability checklist matrices published to digital tracks.', sync: 'Heuristic review critique of application interfaces.', assessment: 'Comprehensive Interface Usability Heuristics Report' },
  { week: 'Remaining', topic: 'Project Demonstrations & Final Examinations', cos: ['CO1', 'CO2'], objective: 'Validate practical software layouts alongside thorough theoretical validation benchmarks.', async: 'Asynchronous structural contribution tracking on GitHub/Figma systems.', sync: 'Face-to-Face Major Final Examination and live functional Team Project evaluations.', assessment: 'Final Examination Score, Progress Milestone Log, and Core Code Demonstration' }
];

const gradingWeights = [
  { name: 'Short Reaction Papers', weight: 25 },
  { name: 'Practical Exercises', weight: 20 },
  { name: 'Individual Project Contribution', weight: 20 },
  { name: 'Final Team Project Output', weight: 15 },
  { name: 'Major Written Examinations', weight: 10 },
  { name: 'Class Attendance & Engagement', weight: 10 }
];

const gradingScale = [
  { range: '95.60 – 100.0', point: '1.00' },
  { range: '91.15 – 95.59', point: '1.25' },
  { range: '86.70 – 91.14', point: '1.50' },
  { range: '82.25 – 86.69', point: '1.75' },
  { range: '77.80 – 82.24', point: '2.00' },
  { range: '73.35 – 77.79', point: '2.25' },
  { range: '68.90 – 73.34', point: '2.50' },
  { range: '64.45 – 68.89', point: '2.75' },
  { range: '60.00 – 64.44', point: '3.00' },
  { range: '50.00 – 59.99', point: 'INC' },
  { range: '45.55 – 49.99', point: '5.0' },
  { range: '0.00 – 45.54', point: 'DRP' }
];

const reactionRubric = [
  { criterion: 'Submission & Timeline', points: '30 Pts', score5: 'Correct interpretation; submitted exactly on schedule.', score4: '1 week late execution (Incurs automatic 10-point penalty score reduction).', score3: '1 month late execution (Incurs automatic 20-point penalty score reduction).', score2: 'More than 1 month delay with partial formatting issues.', score1: 'More than 1 month delay with absolute bare minimum data contents.' },
  { criterion: 'Originality Matrix', points: '20 Pts', score5: 'Exceptional topic grasp; presents unique and highly innovative perspectives.', score4: 'Strong system command; outlines clean arguments that challenge metrics.', score3: 'Clear text mastery; constructs valid original thoughts over base files.', score2: 'Relies heavily on existing template structures with minor adjustments.', score1: 'Simply duplicates textbook summaries without adding critical value.' },
  { criterion: 'Personal Interaction', points: '20 Pts', score5: 'Demonstrates deep critical analysis and unique personal workflow application.', score4: 'Strong capacity to analyze text configurations and map to real systems.', score3: 'Clear validation markers matching theoretical concepts to personal insights.', score2: 'Lacks explicit integration paths between data text blocks and self insights.', score1: 'Zero signs of personal evaluation or independent critical processing.' },
  { criterion: 'Domain Relevance', points: '20 Pts', score5: 'Perfect topical alignment, totally error-free academic processing.', score4: 'Slightly unnecessary side arguments included but highly accurate core.', score3: 'Correct baseline concepts but marred by multiple unrelated tangents.', score2: 'Insufficient depth, heavily missing core topical indicators.', score1: 'Extremely poor concept integration with near-zero technical relation.' }
];

const projectRubric = [
  { criterion: 'Quality of Work', points: '25 Pts', score5: 'Exceptional completeness, complete accuracy, high attention to design specs.', score4: 'High precision and clean structural output with minor superficial flaws.', score3: 'Meets primary engineering requirements. Displays small technical issues.', score2: 'Meets isolated parameters but displays major functional bugs or omissions.', score1: 'Incomplete, broken code bases, or unrendered layout blocks.' },
  { criterion: 'Collaboration Factor', points: '20 Pts', score5: 'Proactively identifies care dependencies and seamlessly resolves group conflicts.', score4: 'Highly interactive; collaborates well and drives team milestones.', score3: 'Maintains base communications and fulfills assigned project tasks.', score2: 'Limited alignment interactions; occasionally slows progress tracking.', score1: 'Completely uncooperative or acts as a barrier to team deployment.' },
  { criterion: 'Proactiveness', points: '15 Pts', score5: 'Drives assignments completely independently; adapts perfectly to modifications.', score4: 'Seeks feedback consistently; solves problems without instructor guidance.', score3: 'Fulfills basic tasks but waits for guidance or continuous prompting.', score2: 'Does not execute initiative; heavily dependent on peers for code ideas.', score1: 'Avoids technical work challenges entirely and hinders operational execution.' },
  { criterion: 'Commitment & Timeline', points: '20 Pts', score5: 'Flawless execution pacing; logs pristine code artifacts early or on time.', score4: 'Manages dependencies well; delivers high-quality assets on schedule.', score3: 'Experiences marginal development delays but delivers baseline needs.', score2: 'Struggles with time-boxing tasks; triggers intermediate blocking issues.', score1: 'Abysmal time management skills resulting in broken delivery workflows.' }
];

const policiesList = [
  "<strong>Attendance Requirement:</strong> Regular attendance is mandatory. Any student missing <strong>three (3) consecutive or five (5) non-consecutive sessions</strong> without completing official dropping processes will be automatically assigned a mark of <strong>DRP</strong>.",
  "<strong>Missed Major Exams:</strong> No makeup tests will be provided for unexcused absences. If an exam is missed due to a documented emergency, a makeup may be allowed (<strong>limit of 1 missed exam</strong>). Any further missed tests automatically score a raw <strong>zero (0)</strong>.",
  "<strong>Final Exam Grade Rule:</strong> Sitting for the Final Examination is mandatory. Failure to sit for this final milestone automatically triggers a status grade of <strong>INC</strong>.",
  "<strong>Practical Environment Focus:</strong> Term projects and problem sets are designed to model realistic production environments. All items must be submitted during specified hours; late submissions incur penalty deductions.",
  "<strong>Academic Integrity & Cheating:</strong> Plagiarism and code-sharing are strictly forbidden. You may discuss conceptual architecture with peers, but you must <strong>never share code blocks</strong>. If caught copying or providing source files, both students receive an <strong>automatic failing grade of 5.0</strong>. <strong style='color:#800000;'>CHEATING WILL NOT BE TOLERATED.</strong>",
  "<strong>Milestone Deliverables:</strong> All core group software projects and individual code contributions must be completed and submitted to clear the course. Unsubmitted projects automatically warrant a grade of <strong>INC</strong>.",
  "<strong>Zero Make-up Exercises:</strong> No late turn-ins or makeups will be accommodated for short laboratory hands-on operations or impromptu evaluation quizzes.",
  "<strong>Grade Verification Timeline:</strong> Grade review complaints regarding tests and laboratory items are only valid for <strong>one (1) week</strong> immediately following the formal release of marks."
];

const targetedRubricData = computed(() => {
  return activeRubric.value === 'reaction' ? reactionRubric : projectRubric;
});
</script>

<style scoped>
.syllabus-container {
  padding: 24px;
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.course-banner-card {
  background: white;
  border-top: 6px solid #800000;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}
.banner-top {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.course-code-badge {
  font-size: 0.85rem;
  font-weight: 700;
  color: #800000;
  background-color: #fbefff;
  padding: 3px 10px;
  border-radius: 4px;
}
.credit-badge {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2563eb;
  background-color: #eff6ff;
  padding: 3px 10px;
  border-radius: 4px;
}
.course-title-text {
  font-size: 1.6rem;
  color: #111827;
  margin: 0 0 20px 0;
  font-weight: 800;
}
.instructor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
}
.info-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.info-item .icon {
  font-size: 1.2rem;
  background-color: #fafafa;
  padding: 6px;
  border-radius: 6px;
}
.info-item label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.info-item strong {
  font-size: 0.88rem;
  color: #111827;
}

.syllabus-menu-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 900px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 4px;
  overflow-x: auto;
}
.menu-tab-btn {
  padding: 10px 16px;
  border: none;
  background: none;
  color: #4b5563;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: color 0.2s;
}
.menu-tab-btn:hover {
  color: #800000;
}
.menu-tab-btn.active {
  color: #800000;
}
.menu-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #800000;
  border-radius: 99px;
}

.syllabus-content-area {
  width: 100%;
  max-width: 900px;
}
.info-card-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  margin-bottom: 20px;
}
.info-card-section h3 {
  color: #800000;
  font-size: 1.15rem;
  margin-top: 0;
  margin-bottom: 14px;
  border-left: 4px solid #800000;
  padding-left: 8px;
}
.description-block {
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.6;
}

.outcome-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.outcome-item-card {
  display: flex;
  gap: 12px;
  background: #fafafa;
  padding: 12px 16px;
  border-radius: 6px;
  border-left: 3px solid #4b5563;
}
.co-tag {
  font-weight: 700;
  color: #374151;
  background: #e5e7eb;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  height: max-content;
}
.co-text {
  margin: 0;
  font-size: 0.92rem;
  color: #4b5563;
  line-height: 1.4;
}

.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 600px) { .vm-grid { grid-template-columns: 1fr; } }
.vm-box {
  background: #fdfefe;
  border: 1px dashed #cbd5e1;
  padding: 14px;
  border-radius: 6px;
}
.vm-box h4 {
  margin: 0 0 6px 0;
  color: #111827;
}
.vm-box p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
}

.section-heading {
  color: #111827;
  font-size: 1.2rem;
  margin-bottom: 16px;
}
.timeline-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.timeline-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
@media (max-width: 640px) { .timeline-card { flex-direction: column; } }
.timeline-week-badge {
  background-color: #800000;
  color: white;
  font-weight: 700;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.95rem;
  padding: 16px;
  flex-shrink: 0;
}
@media (max-width: 640px) { .timeline-week-badge { width: 100%; padding: 8px; } }
.timeline-body {
  padding: 18px;
  flex-grow: 1;
}
.timeline-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}
.timeline-header-row h4 {
  margin: 0;
  font-size: 1.1rem;
  color: #111827;
}
.co-badges-row {
  display: flex;
  gap: 4px;
}
.mini-co-badge {
  background-color: #eff6ff;
  color: #1e40af;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
}
.learning-objective {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 0 0 12px 0;
}
.modality-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}
@media (max-width: 500px) { .modality-grid { grid-template-columns: 1fr; } }
.modality-box {
  padding: 10px;
  border-radius: 6px;
  font-size: 0.85rem;
}
.modality-box span {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}
.modality-box p { margin: 0; color: #4b5563; }
.modality-box.async { background-color: #f0fdf4; border: 1px solid #bbf7d0; }
.modality-box.async span { color: #166534; }
.modality-box.sync { background-color: #fef9c3; border: 1px solid #fef08a; }
.modality-box.sync span { color: #854d0e; }
.assessment-tag-line {
  font-size: 0.85rem;
  background-color: #f3f4f6;
  padding: 6px 12px;
  border-radius: 4px;
  color: #111827;
}

.grading-dashboard-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
}
@media (max-width: 768px) { .grading-dashboard-grid { grid-template-columns: 1fr; } }

.criteria-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.criteria-row-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.criteria-name {
  width: 150px;
  font-size: 0.88rem;
  color: #374151;
  font-weight: 500;
}
.progress-bar-container {
  flex-grow: 1;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background-color: #800000;
  border-radius: 99px;
}
.criteria-percentage {
  width: 40px;
  text-align: right;
  font-size: 0.9rem;
  font-weight: 700;
  color: #111827;
}
.passing-badge-alert {
  margin-top: 18px;
  font-size: 0.85rem;
  background: #fdf2f2;
  border: 1px solid #fde2e2;
  padding: 8px 12px;
  border-radius: 4px;
  color: #9b1c1c;
  text-align: center;
}

.table-scroll-container {
  width: 100%;
  overflow-x: auto;
}
.grading-scale-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.grading-scale-table th, .grading-scale-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}
.grading-scale-table th {
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 600;
}
.fail-grade { color: #dc2626; }
.inc-grade { color: #d97706; }

.rubrics-top-margin { margin-top: 8px; }
.rubric-intro-text { font-size: 0.88rem; color: #6b7280; margin: -6px 0 16px 0; }
.rubric-toggle-bar {
  display: flex;
  gap: 4px;
  background-color: #f3f4f6;
  padding: 4px;
  border-radius: 6px;
  margin-bottom: 14px;
  width: max-content;
}
.rubric-toggle-bar button {
  padding: 6px 12px;
  border: none;
  background: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  cursor: pointer;
  border-radius: 4px;
}
.rubric-toggle-bar button.active {
  background-color: white;
  color: #800000;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.rubric-data-matrix {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  min-width: 700px;
}
.rubric-data-matrix th, .rubric-data-matrix td {
  border: 1px solid #e5e7eb;
  padding: 10px;
  vertical-align: top;
  line-height: 1.4;
}
.rubric-data-matrix th {
  background-color: #fafafa;
  color: #111827;
  font-weight: 600;
  text-align: center;
}
.criterion-title-column {
  background-color: #fdfefe;
  min-width: 130px;
}
.criterion-title-column strong {
  display: block;
  color: #111827;
  font-size: 0.85rem;
  margin-bottom: 4px;
}
.points-sub-tag {
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 600;
}

.policy-note { font-size: 0.9rem; color: #6b7280; margin-top: -6px; }
.policy-list-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}
.policy-card-item {
  display: flex;
  gap: 14px;
  background-color: #fffafb;
  border: 1px solid #fee2e2;
  padding: 14px;
  border-radius: 6px;
}
.policy-num {
  font-weight: 800;
  color: #800000;
  font-size: 1.1rem;
}
.policy-desc-text {
  margin: 0;
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
}
.disability-support-alert {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  padding: 14px;
  border-radius: 6px;
  font-size: 0.88rem;
  line-height: 1.5;
  margin-top: 8px;
}

.animate-fade {
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

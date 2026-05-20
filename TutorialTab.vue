<script setup lang="ts">
  import { ref, computed } from 'vue'
  const props = defineProps(['subjects'])
  
  const activeTutorial = ref<any>(null)
  const activeLessonIndex = ref(0)

  // THE SAME INDEPENDENT DATA STRUCTURE
  const tutorialLessons: Record<string, { title: string, body: { type: 'text' | 'example', content: string }[] }[]> = {
    'CCC100': [
      { 
        title: 'Introduction to Architecture', 
        body: [{ 
            type: 'text', 
            content: `to further understand this idiot`
            
          }
        ]
      },
      { 
        title: 'Data Representation', 
        body: [
          { type: 'text', content: 'Computers represent data in binary (0s and 1s). This includes integers, floating-point numbers, and characters.' },
          { type: 'example', content: 'Binary representation of the number 5 is 0101.\nBinary representation of the number 10 is 1010.' },
          { type: 'text', content: 'Letters are also converted to numbers before being stored in binary using encoding standards like ASCII or Unicode.' },
          { type: 'example', content: 'The ASCII value of the letter "A" is 65 (01000001 in binary).\nThe ASCII value of "a" is 97.' }
        ]
      },
      { 
        title: 'Logic Gates', 
        body: [
          { type: 'text', content: 'Logic gates are the building blocks of digital circuits. Common gates include AND, OR, NOT, NAND, and XOR.' },
          { type: 'example', content: 'AND Gate: Output is 1 only if both Input A and Input B are 1.\nOR Gate: Output is 1 if at least one of the inputs (A or B) is 1.' },
          { type: 'text', content: 'The NOT gate is a bit different because it only takes a single input instead of two.' },
          { type: 'example', content: 'NOT Gate: Reverses the input. If input is 1, output is 0. If input is 0, output is 1.' }
        ]
      }
    ],
    'CCC101': [
      { 
        title: 'Introduction', 
        body: [
          { type: 'text', content: 'Every journey begins with a "Hello World". Learn the syntax of C++ to further understand the program' },
          { type: 'example', content: 'print("Hello, World!") // Python Syntax\n\nconsole.log("Hello, World!"); //\nJavaScript Syntax' }
        ]
      },
      { 
        title: 'Variables & Types', 
        body: [
          { type: 'text', content: 'Variables are containers for storing data values. Common types include integers, strings, and booleans.' },
          { type: 'example', content: 'int age = 20; // This is an Integer variable\nString name = "Alice"; // This is a String variable' },
          { type: 'text', content: 'You can change the values of these variables later in your program depending on the logic.' }
        ]
      }
    ],
    'DEFAULT': [
      { 
        title: 'Course Overview', 
        body: [
          { type: 'text', content: 'Welcome to the tutorial module. Select a lesson from the left sidebar to begin learning the core concepts of this subject.' },
          { type: 'example', content: 'Example boxes like this one will appear alongside the text to help you understand the concepts.' },
          { type: 'text', content: 'You can navigate through the lessons using the Previous and Next buttons below.' }
        ]
      },
      { 
        title: 'Learning Objectives', 
        body: [
          { type: 'text', content: 'By the end of this module, you will understand the fundamental principles and be able to apply them in practical scenarios.' }
        ]
      }
    ]
  }

  const currentLessons = computed(() => {
    if (!activeTutorial.value) return []
    return tutorialLessons[activeTutorial.value.id] || tutorialLessons['DEFAULT']
  })
</script>

<template>
  <div class="tutorial-wrapper">
    
    <div v-if="!activeTutorial" class="grid-dashboard">
      <div class="dashboard-header">
        <h2>Available Tutorials</h2>
        <p>Select a course module to start learning.</p>
      </div>
      <div class="grid-5x7">
        <div v-for="sub in props.subjects" :key="sub.id" class="grid-tile" @click="activeTutorial = sub; activeLessonIndex = 0;">
          <div class="tile-top">
            <span class="tile-code">{{ sub.code }}</span>
            <div class="icon-circle">📚</div>
          </div>
          <div class="tile-title">{{ sub.title }}</div>
          <button class="tile-action">Enter Module ➔</button>
        </div>
      </div>
    </div>

    <div v-else class="modern-layout">
      <div class="action-bar">
        <button class="back-pill" @click="activeTutorial = null">
          <span class="arrow">←</span> Back to Dashboard
        </button>
        <div class="course-badge">{{ activeTutorial.code }}</div>
      </div>

      <div class="layout-container">
        
        <aside class="modern-sidebar">
          <h3 class="sidebar-heading">Modules</h3>
          <nav class="lesson-nav">
            <button v-for="(lesson, index) in currentLessons" :key="index" 
                    :class="['nav-pill', { active: activeLessonIndex === index }]"
                    @click="activeLessonIndex = index">
              <span class="lesson-num">{{ index + 1 }}</span>
              {{ lesson.title }}
            </button>
          </nav>
        </aside>

        <main class="modern-main-content">
          <div class="content-header">
            <h1 class="lesson-title">{{ currentLessons[activeLessonIndex].title }}</h1>
            <div class="nav-arrows">
              <button class="arrow-btn" :disabled="activeLessonIndex === 0" @click="activeLessonIndex--">❮</button>
              <button class="arrow-btn" :disabled="activeLessonIndex === currentLessons.length - 1" @click="activeLessonIndex++">❯</button>
            </div>
          </div>
          
          <hr class="modern-divider" />
          
          <div class="reading-pane">
            <template v-for="(block, bIdx) in currentLessons[activeLessonIndex].body" :key="bIdx">
              
              <p v-if="block.type === 'text'" class="lesson-text">{{ block.content }}</p>
              
              <div v-else-if="block.type === 'example'" class="code-card">
                <div class="code-card-header">
                  <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                  <span class="code-label">Example</span>
                </div>
                <div class="code-content">{{ block.content }}</div>
              </div>

            </template>
          </div>

          <div class="bottom-nav">
             <button class="nav-btn" :disabled="activeLessonIndex === 0" @click="activeLessonIndex--">❮ Previous Lesson</button>
             <button class="nav-btn primary" :disabled="activeLessonIndex === currentLessons.length - 1" @click="activeLessonIndex++">Next Lesson ❯</button>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Base Wrapper */
  .tutorial-wrapper { background: #f8fafc; height: 100%; display: flex; flex-direction: column; width: 100%; overflow-y: auto; }
  
  /* --- Dashboard Grid --- */
  .grid-dashboard { padding: 40px 60px; max-width: 1400px; margin: 0 auto; width: 100%; }
  .dashboard-header { margin-bottom: 30px; }
  .dashboard-header h2 { margin: 0 0 5px 0; color: #1e293b; font-size: 2rem; font-weight: 800; }
  .dashboard-header p { margin: 0; color: #64748b; font-size: 1rem; }
  
  .grid-5x7 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .grid-tile { background: white; padding: 12px; border-radius: 20px; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; gap: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; }
  .grid-tile:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(128,0,0,0.08); border-color: #800000; }
  
  .tile-top { display: flex; justify-content: space-between; align-items: center; }
  .tile-code { color: #800000; font-weight: 900; font-size: 0.7rem; background: #fff1f2; padding: 6px 12px; border-radius: 20px; }
  .icon-circle { width: 35px; height: 35px; background: #f8fafc; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
  
  .tile-title { font-weight: 700; color: #1e293b; font-size: 1rem; line-height: 1.4; flex-grow: 1; }
  .tile-action { background: transparent; border: none; color: #800000; font-size: 1rem; font-weight: 700; text-align: left; padding: 0; margin-top: auto; cursor: pointer; transition: 0.2s; }
  .grid-tile:hover .tile-action { color: #ffd700; }

  /* --- Modern Layout for Tutorial --- */
  .modern-layout { display: flex; flex-direction: column; height: 100%; padding: 30px 40px; max-width: 1400px; margin: 0 auto; width: 100%; }
  
  .action-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
  .back-pill { background: white; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 30px; font-weight: 600; color: #475569; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: 0.2s; display: flex; align-items: center; gap: 8px; font-size: 0.95rem; }
  .back-pill:hover { border-color: #800000; color: #800000; background: #fff1f2; }
  .course-badge { background: #800000; color: #ffd700; font-weight: 800; padding: 8px 16px; border-radius: 8px; font-size: 0.9rem; letter-spacing: 1px; }

  .layout-container { display: flex; gap: 30px; align-items: flex-start; }

  /* Sidebar Design */
  .modern-sidebar { width: 280px; background: white; border-radius: 16px; padding: 25px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; position: sticky; top: 30px; }
  .sidebar-heading { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 800; margin: 0 0 15px 10px; }
  
  .lesson-nav { display: flex; flex-direction: column; gap: 5px; }
  .nav-pill { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 12px 15px; border: none; background: transparent; font-size: 0.95rem; font-weight: 600; color: #475569; border-radius: 10px; cursor: pointer; transition: 0.2s; }
  .nav-pill:hover { background: #f8fafc; color: #1e293b; }
  .lesson-num { background: #f1f5f9; color: #64748b; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.75rem; font-weight: 800; }
  
  .nav-pill.active { background: #800000; color: white; box-shadow: 0 4px 10px rgba(128,0,0,0.2); }
  .nav-pill.active .lesson-num { background: #ffd700; color: #800000; }

  /* Main Content Design */
  .modern-main-content { flex: 1; background: white; border-radius: 20px; padding: 50px 60px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; min-height: 600px; }
  
  .content-header { display: flex; justify-content: space-between; align-items: center; }
  .lesson-title { font-size: 2.2rem; font-weight: 900; color: #1e293b; margin: 0; line-height: 1.2; }
  
  .nav-arrows { display: flex; gap: 10px; }
  .arrow-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #e2e8f0; background: white; color: #475569; font-weight: bold; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
  .arrow-btn:hover:not(:disabled) { border-color: #800000; color: #800000; }
  .arrow-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .modern-divider { border: none; height: 1px; background: #e2e8f0; margin: 30px 0; }

  /* Reading Content */
  .reading-pane { display: flex; flex-direction: column; gap: 25px; }
  .lesson-text { font-size: 1.15rem; line-height: 1.8; color: #334155; margin: 0; }
  
  /* Modern Mac-like Example Box */
  .code-card { background: #0f172a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); margin: 10px 0; }
  .code-card-header { background: #1e293b; padding: 12px 20px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #334155; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot.red { background: #ff5f56; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green { background: #27c93f; }
  .code-label { margin-left: auto; color: #94a3b8; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
  
  .code-content { padding: 25px; color: #f8fafc; font-family: 'Courier New', Courier, monospace; font-size: 1.05rem; line-height: 1.6; white-space: pre-wrap; }

  /* Bottom Nav */
  .bottom-nav { display: flex; justify-content: space-between; margin-top: 50px; padding-top: 30px; border-top: 1px solid #e2e8f0; }
  .nav-btn { background: white; border: 1px solid #e2e8f0; padding: 12px 25px; border-radius: 8px; font-weight: 700; color: #475569; cursor: pointer; transition: 0.2s; font-size: 0.95rem; }
  .nav-btn:hover:not(:disabled) { border-color: #800000; color: #800000; }
  .nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  
  .nav-btn.primary { background: #800000; color: #ffd700; border: none; }
  .nav-btn.primary:hover:not(:disabled) { background: #600000; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(128,0,0,0.2); }
</style>
<script setup lang="ts">
  import { ref, computed, inject } from 'vue'
  import type { Ref } from 'vue'
  import RoadmapTab from './Student/RoadmapTab.vue'
  import SyllabusTab from './Student/SyllabusTab.vue'
  import TutorialTab from './Student/TutorialTab.vue'
  import EnrolledTab from './Student/EnrolledTab.vue'
  import ProfessorTab from './Student/ProfessorTab.vue'
  import AnnouncementTab from './Student/AnnouncementTab.vue'
  import MSUCalendarTab from './Student/MSUCalendarTab.vue'
  

  import Student_Settings from '../components/Student/DropDown/Student_Settings.vue'
  import Student_About from '../components/Student/DropDown/Student_About.vue'

  interface Subject {
    id: string;
    code: string;
    title: string;
    completed: boolean;
    prerequisites: string[];
    grid: { r: number; c: number };
    description: string;
    examples: string; 
    units: number;
    semester?: string;
    tutorials?: Tutorial[];
  }

  interface Resource {
    id: string;
    title: string;
    type: 'video' | 'article' | 'link' | 'pdf' | 'code';
    url: string;
  }

  interface Tutorial {
    id: string;
    name: string;
    description: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    resources?: Resource[];
  }

  interface Professor {
    name: string;
    role?: string;
    expertise: string;
    description: string;
  }

  const props = defineProps(['announcementsData'])
  const emit = defineEmits(['logout'])

  // Inject the global dark mode state
  const isDarkMode = inject<Ref<boolean>>('isDarkMode', ref(false))

  const currentTab = ref('roadmap')
  const isDropdownOpen = ref(false) 

  const professors = ref<Professor[]>([
    { 
      name: 'Johaira R. Isra, MSCA', 
      role: 'Assistant Dean / Faculty',
      expertise: 'Database Systems', 
      description: 'Dr. Isra is a specialist in Relational Database Management and Data Mining. She focuses on efficient data architecture and query optimization.' 
    },
    { 
      name: 'Janice F. Wade, MSCS', 
      role: 'DCS Chairperson',
      expertise: 'Computer Science & Academic Leadership', 
      description: 'As the Chairperson of the Department of Computing Sciences, she oversees academic programs, faculty development, and departmental operations.' 
    },
    { 
      name: 'Azreen M. Marohomsalic, ECE, MIT', 
      role: 'Faculty',
      expertise: 'Information Technology & Electronics', 
      description: 'Specializes in the intersection of hardware and software, leveraging his ECE and MIT background to teach advanced computing applications.' 
    },
    { 
      name: 'Al Annuar M. Asakil', 
      role: 'Computer Network Administrator',
      expertise: 'Network Infrastructure', 
      description: 'Manages and maintains the department\'s network infrastructure, ensuring secure, efficient, and reliable connectivity for the college.' 
    },
    { 
      name: 'Mudzna M. Asakil, MSCS', 
      role: 'Faculty',
      expertise: 'Artificial Intelligence', 
      description: 'Prof. Mudzna leads research in Machine Learning and Intelligent Systems, focusing on neural network implementation and automation.' 
    },
    { 
      name: 'Sacaria B. Gulam, MGD', 
      role: 'Special Assistant (OVCAA)',
      expertise: 'Academic Affairs Administration', 
      description: 'Serves as the Special Assistant for the Office of the Vice Chancellor for Academic Affairs, assisting with administrative policies and academic coordination.' 
    },
    { 
      name: 'Jeffrey M. Mondejar, MSCS (CAR)', 
      role: 'Faculty',
      expertise: 'Programming Paradigms', 
      description: 'Prof. Mondejar specializes in functional and imperative programming languages, helping students master logic across different coding environments.' 
    },
    { 
      name: 'Llewelyn A. Elcana, MSCS (CAR)', 
      role: 'Faculty',
      expertise: 'Software Engineering', 
      description: 'Prof. Elcana has extensive experience in the software development lifecycle and UI/UX design, emphasizing Agile methodologies.' 
    },
    { 
      name: 'Bantogun S. Tarathingan', 
      role: 'Faculty',
      expertise: 'Computer Architecture', 
      description: 'Expert in high-performance computing and parallel systems. He teaches the intricate relationship between hardware and software.' 
    },
    { 
      name: 'Lucman S. Abdulrachman, MSCS (CAR)', 
      role: 'Faculty',
      expertise: 'Network Security', 
      description: 'A specialist in cybersecurity and systems administration. He focuses on network protocols, encryption, and infrastructure defense.' 
    },
    { 
      name: 'Sayyedatel Janna M. Gubat', 
      role: 'Special Assistant (OVCRED)',
      expertise: 'Systems Engineering & Research Coordination', 
      description: 'Coordinates initiatives as Special Assistant to the OVCRED, while applying her expertise in system engineering to support research and development.' 
    }
  ])

  const subjects = ref<Subject[]>([
    { 
      id: 'CCC100', 
      code: 'CCC100', 
      title: 'Fundamentals of Computing', 
      units: 3, 
      completed: false, 
      prerequisites: [], 
      grid: { r: 1, c: 2 }, 
      description: 'Introduction to computer architecture, data representation, and the fundamental operations of a computer system.', 
      examples: 'Binary, Hex, Logic Gates, and CPU Instruction Sets.',
      tutorials: [
        { 
          id: 'ccc100-1', 
          name: 'Number Systems', 
          description: 'Learn binary, hexadecimal, and decimal number systems', 
          duration: '20 min', 
          difficulty: 'Beginner',
          resources: [
            { id: 'r1', title: 'Binary to Decimal Conversion', type: 'video', url: 'https://example.com/binary' },
            { id: 'r2', title: 'Number Systems Guide', type: 'pdf', url: 'https://example.com/number-systems.pdf' }
          ]
        },
        { 
          id: 'ccc100-2', 
          name: 'Logic Gates and Boolean Algebra', 
          description: 'Understand AND, OR, NOT gates and logic circuits', 
          duration: '25 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r3', title: 'Logic Gates Explained', type: 'video', url: 'https://example.com/logic-gates' },
            { id: 'r4', title: 'Boolean Algebra Reference', type: 'pdf', url: 'https://example.com/boolean.pdf' }
          ]
        }
      ]
    },
    { 
      id: 'CCC101', 
      code: 'CCC101', 
      title: 'Computer Programming 1', 
      units: 3, 
      completed: false, 
      prerequisites: [], 
      grid: { r: 2, c: 2 }, 
      description: 'Basic programming concepts using a high-level language.', 
      examples: 'Variables, Data Types, Control Structures, and Basic Logic.',
      tutorials: [
        { 
          id: 'ccc101-1', 
          name: 'Getting Started with Programming', 
          description: 'Learn the basics of programming concepts', 
          duration: '15 min', 
          difficulty: 'Beginner',
          resources: [
            { id: 'r5', title: 'Programming Basics Tutorial', type: 'video', url: 'https://example.com/prog-basics' },
            { id: 'r6', title: 'Your First Program', type: 'code', url: 'https://example.com/first-prog' }
          ]
        },
        { 
          id: 'ccc101-2', 
          name: 'Variables and Data Types', 
          description: 'Understand different data types and how to use them', 
          duration: '20 min', 
          difficulty: 'Beginner',
          resources: [
            { id: 'r7', title: 'Data Types Video', type: 'video', url: 'https://example.com/data-types' },
            { id: 'r8', title: 'Variables Guide', type: 'pdf', url: 'https://example.com/variables.pdf' }
          ]
        },
        { 
          id: 'ccc101-3', 
          name: 'Control Flow and Loops', 
          description: 'Master conditionals and iteration', 
          duration: '25 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r9', title: 'Control Flow Tutorial', type: 'video', url: 'https://example.com/control-flow' },
            { id: 'r10', title: 'Practice Problems', type: 'pdf', url: 'https://example.com/practice.pdf' }
          ]
        }
      ]
    },
    { 
      id: 'MAT049', 
      code: 'MAT049', 
      title: 'Pre-Calculus', 
      units: 0, 
      completed: false, 
      prerequisites: [], 
      grid: { r: 3, c: 2 }, 
      description: 'Foundational mathematics for engineering and science.', 
      examples: 'Trigonometry, Analytical Geometry, and Series.',
      tutorials: [
        { 
          id: 'mat049-1', 
          name: 'Trigonometry Fundamentals', 
          description: 'Learn sine, cosine, tangent and trigonometric identities', 
          duration: '30 min', 
          difficulty: 'Beginner',
          resources: [
            { id: 'r11', title: 'Trig Functions Video', type: 'video', url: 'https://example.com/trig' },
            { id: 'r12', title: 'Trig Cheat Sheet', type: 'pdf', url: 'https://example.com/trig.pdf' }
          ]
        },
        { 
          id: 'mat049-2', 
          name: 'Analytical Geometry', 
          description: 'Understand lines, circles, and conic sections', 
          duration: '35 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r13', title: 'Geometry Tutorial', type: 'video', url: 'https://example.com/geometry' },
            { id: 'r14', title: 'Geometry Guide', type: 'article', url: 'https://example.com/geometry-guide' }
          ]
        }
      ]
    },
    { 
      id: 'MAT051', 
      code: 'MAT051', 
      title: 'Calculus I', 
      units: 5, 
      completed: false, 
      prerequisites: ['MAT049'], 
      grid: { r: 4, c: 3 }, 
      description: 'Introduction to differential calculus.', 
      examples: 'Limits, Continuity, Derivatives, and Applications.',
      tutorials: [
        { 
          id: 'mat051-1', 
          name: 'Limits and Continuity', 
          description: 'Understand the foundation of calculus', 
          duration: '30 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r15', title: 'Limits Explained', type: 'video', url: 'https://example.com/limits' },
            { id: 'r16', title: 'Limits Formulas', type: 'pdf', url: 'https://example.com/limits.pdf' }
          ]
        },
        { 
          id: 'mat051-2', 
          name: 'Derivatives', 
          description: 'Learn how to calculate and apply derivatives', 
          duration: '35 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r17', title: 'Derivative Video', type: 'video', url: 'https://example.com/derivatives' },
            { id: 'r18', title: 'Derivative Rules', type: 'pdf', url: 'https://example.com/derivatives.pdf' }
          ]
        }
      ]
    },
    { 
      id: 'CCC102', 
      code: 'CCC102', 
      title: 'Computer Programming 2', 
      units: 3, 
      completed: false, 
      prerequisites: ['CCC101'], 
      grid: { r: 1, c: 3 }, 
      description: 'Intermediate programming focusing on Object-Oriented paradigms.', 
      examples: 'Classes, Objects, Inheritance, and Polymorphism.',
      tutorials: [
        { 
          id: 'ccc102-1', 
          name: 'Object-Oriented Basics', 
          description: 'Learn classes, objects, and OOP principles', 
          duration: '25 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r19', title: 'OOP Introduction', type: 'video', url: 'https://example.com/oop-intro' },
            { id: 'r20', title: 'Classes Tutorial', type: 'code', url: 'https://example.com/classes-example' }
          ]
        },
        { 
          id: 'ccc102-2', 
          name: 'Inheritance and Polymorphism', 
          description: 'Master inheritance and polymorphic behavior', 
          duration: '30 min', 
          difficulty: 'Advanced',
          resources: [
            { id: 'r21', title: 'Inheritance Video', type: 'video', url: 'https://example.com/inheritance' },
            { id: 'r22', title: 'Polymorphism Guide', type: 'article', url: 'https://example.com/poly' }
          ]
        }
      ]
    },
    { 
      id: 'MAT061', 
      code: 'MAT061', 
      title: 'Calculus II', 
      units: 5, 
      completed: false, 
      prerequisites: ['MAT051'], 
      grid: { r: 4, c: 4 }, 
      description: 'Study of integral calculus and transcendental functions.', 
      examples: 'Integration Techniques and Infinite Series.',
      tutorials: [
        { 
          id: 'mat061-1', 
          name: 'Integration Basics', 
          description: 'Learn antiderivatives and indefinite integrals', 
          duration: '35 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r23', title: 'Integration Video', type: 'video', url: 'https://example.com/integration' },
            { id: 'r24', title: 'Integration Formulas', type: 'pdf', url: 'https://example.com/integration.pdf' }
          ]
        },
        { 
          id: 'mat061-2', 
          name: 'Definite Integrals and Applications', 
          description: 'Master area calculations and applications', 
          duration: '40 min', 
          difficulty: 'Advanced',
          resources: [
            { id: 'r25', title: 'Definite Integrals', type: 'video', url: 'https://example.com/definite' },
            { id: 'r26', title: 'Applications Guide', type: 'article', url: 'https://example.com/int-apps' }
          ]
        }
      ]
    },
    { 
      id: 'MAT101', 
      code: 'MAT101', 
      title: 'Logic and Set Theory', 
      units: 3, 
      completed: false, 
      prerequisites: ['MAT049'], 
      grid: { r: 3, c: 3 }, 
      description: 'Introduction to mathematical logic and the theory of sets.', 
      examples: 'Truth Tables, Set Operations, and Proof Techniques.',
      tutorials: [
        { 
          id: 'mat101-1', 
          name: 'Propositional Logic', 
          description: 'Understand truth values, logical operators, and truth tables', 
          duration: '25 min', 
          difficulty: 'Beginner',
          resources: [
            { id: 'r27', title: 'Logic Video', type: 'video', url: 'https://example.com/logic' },
            { id: 'r28', title: 'Truth Tables', type: 'pdf', url: 'https://example.com/truth-tables.pdf' }
          ]
        },
        { 
          id: 'mat101-2', 
          name: 'Set Theory', 
          description: 'Learn sets, operations, and relations', 
          duration: '30 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r29', title: 'Set Theory Video', type: 'video', url: 'https://example.com/sets' },
            { id: 'r30', title: 'Set Operations Guide', type: 'article', url: 'https://example.com/set-ops' }
          ]
        }
      ]
    },
    { 
      id: 'CCC121', 
      code: 'CCC121', 
      title: 'Data Structures & Alg', 
      units: 3, 
      completed: false, 
      prerequisites: ['CCC102'], 
      grid: { r: 1, c: 4 }, 
      description: 'Organizing and managing data for efficient access and modification.', 
      examples: 'Linked Lists, Stacks, Queues, and Trees.',
      tutorials: [
        { 
          id: 'ccc121-1', 
          name: 'Arrays and Linked Lists', 
          description: 'Compare and implement linear data structures', 
          duration: '30 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r31', title: 'Arrays vs Lists', type: 'video', url: 'https://example.com/arrays-lists' },
            { id: 'r32', title: 'Linked Lists Code', type: 'code', url: 'https://example.com/linked-list' }
          ]
        },
        { 
          id: 'ccc121-2', 
          name: 'Stacks and Queues', 
          description: 'Understand LIFO and FIFO structures', 
          duration: '25 min', 
          difficulty: 'Intermediate',
          resources: [
            { id: 'r33', title: 'Stacks & Queues', type: 'video', url: 'https://example.com/stacks' },
            { id: 'r34', title: 'Implementation Guide', type: 'article', url: 'https://example.com/impl' }
          ]
        },
        { 
          id: 'ccc121-3', 
          name: 'Trees and Graphs', 
          description: 'Learn hierarchical and network data structures', 
          duration: '40 min', 
          difficulty: 'Advanced',
          resources: [
            { id: 'r35', title: 'Trees Tutorial', type: 'video', url: 'https://example.com/trees' },
            { id: 'r36', title: 'Graph Algorithms', type: 'pdf', url: 'https://example.com/graphs.pdf' }
          ]
        }
      ]
    },
    { id: 'CSC130', code: 'CSC130', title: 'Discrete Structures', units: 3, completed: false, prerequisites: ['MAT101'], grid: { r: 2, c: 4 }, description: 'Mathematical structures that are fundamentally discrete rather than continuous.', examples: 'Graphs, Trees, and Counting Methods.' },
    { id: 'CSC142', code: 'CSC142', title: 'Automata Theory', units: 3, completed: false, prerequisites: ['MAT101'], grid: { r: 3, c: 4 }, description: 'Abstract models of machines and the problems they can solve.', examples: 'Finite Automata, Context-Free Grammars.' },
    { id: 'STT101', code: 'STT101', title: 'Statistics', units: 4, completed: false, prerequisites: ['MAT049'], grid: { r: 2, c: 3 }, description: 'Methods for collecting, analyzing, and interpreting data.', examples: 'Probability, Distributions, and Inference.' },
    { id: 'CCC151', code: 'CCC151', title: 'Information Management', units: 3, completed: false, prerequisites: ['CCC121'], grid: { r: 1, c: 5 }, description: 'Design and implementation of database systems.', examples: 'Relational Model, SQL, and Normalization.' },
    { id: 'CSC112', code: 'CSC112', title: 'Comp Org & Arch', units: 4, completed: false, prerequisites: ['CCC102'], grid: { r: 2, c: 5 }, description: 'Integration of hardware and software components.', examples: 'Micro-Architecture and Memory Hierarchy.' },
    { id: 'CSC124', code: 'CSC124', title: 'Design & Analysis of Alg', units: 3, completed: false, prerequisites: ['CCC121'], grid: { r: 3, c: 5 }, description: 'Performance analysis and optimization of algorithms.', examples: 'Big O, Greedy, and Dynamic Programming.' },
    { id: 'CSC186', code: 'CSC186', title: 'HCI', units: 3, completed: false, prerequisites: ['CCC102'], grid: { r: 4, c: 5 }, description: 'Focus on user experience and interface design.', examples: 'Usability Testing, Prototyping, and UX Design.' },
    { id: 'CCC181', code: 'CCC181', title: 'App Dev & Emerging Tech', units: 3, completed: false, prerequisites: ['CCC151'], grid: { r: 1, c: 6 }, description: 'Modern application development frameworks.', examples: 'Web Frameworks, API Development.' },
    { id: 'CSC145', code: 'CSC145', title: 'Programming Languages', units: 3, completed: false, prerequisites: ['CSC142'], grid: { r: 2, c: 6 }, description: 'Comparative study of language paradigms.', examples: 'Functional, Declarative, and Imperative.' },
    { id: 'CSC155', code: 'CSC155', title: 'Operating Systems', units: 3, completed: false, prerequisites: ['CSC112'], grid: { r: 3, c: 6 }, description: 'Managing hardware and software resources.', examples: 'Kernels, Processes, and File Systems.' },
    { id: 'CSC171', code: 'CSC171', title: 'Artificial Intelligence', units: 3, completed: false, prerequisites: ['CCC121'], grid: { r: 4, c: 6 }, description: 'Concepts of machine intelligence.', examples: 'Machine Learning and Neural Networks.' },
    { id: 'CSC181_SE', code: 'CSC181', title: 'Software Engineering', units: 4, completed: false, prerequisites: ['CCC151'], grid: { r: 5, c: 6 }, description: 'Systematic approach to software development.', examples: 'SDLC, Agile, and Quality Assurance.' },
    { id: 'CSC113', code: 'CSC113', title: 'Computer Networks', units: 3, completed: false, prerequisites: ['CSC155'], grid: { r: 1, c: 7 }, description: 'Data communication and networking protocols.', examples: 'OSI Model, TCP/IP, and Socket Programming.' },
    { id: 'CSC133', code: 'CSC133', title: 'Modeling & Simulation', units: 3, completed: false, prerequisites: ['MAT061'], grid: { r: 2, c: 7 }, description: 'Representing systems through math models.', examples: 'Stochastic Models and Simulations.' },
    { id: 'CSC161', code: 'CSC161', title: 'System Security', units: 3, completed: false, prerequisites: ['CSC155'], grid: { r: 3, c: 7 }, description: 'Principles of information security.', examples: 'Encryption, Hashing, and Firewalls.' },
    { id: 'CSC175', code: 'CSC175', title: 'Parallel Computing', units: 3, completed: false, prerequisites: ['CSC155'], grid: { r: 4, c: 7 }, description: 'High-performance computing techniques.', examples: 'Multi-threading and GPU Acceleration.' },
    { id: 'CSC194', code: 'CSC194', title: 'CS Seminar', units: 1, completed: false, prerequisites: ['CCC181'], grid: { r: 5, c: 7 }, description: 'Industry exposure and research prep.', examples: 'Thesis topics and Industry standards.' },
    { id: 'CSC197', code: 'CSC197', title: 'Internship', units: 3, completed: false, prerequisites: ['CSC181_SE'], grid: { r: 1, c: 8 }, description: 'Practical work experience.', examples: 'Industry placement.' },
    { id: 'CSC193', code: 'CSC193', title: 'Special Topics', units: 3, completed: false, prerequisites: ['CSC194'], grid: { r: 1, c: 9 }, description: 'Advanced niche technologies.', examples: 'Cloud or Blockchain.' },
    { id: 'CSC198', code: 'CSC198', title: 'Thesis 1', units: 3, completed: false, prerequisites: ['CSC194'], grid: { r: 2, c: 9 }, description: 'Research and proposal phase.', examples: 'Drafting chapters 1-3.' },
    { id: 'ELEC1', code: 'ELECTIVE', title: 'Major Elective 1', units: 4, completed: false, prerequisites: ['CSC197'], grid: { r: 3, c: 9 }, description: 'Student-choice specialization.', examples: 'Specialized tech study.' },
    { id: 'CSC109', code: 'CSC109', title: 'Ethical Issues', units: 3, completed: false, prerequisites: ['CSC194'], grid: { r: 1, c: 10 }, description: 'Social and ethical impacts of IT.', examples: 'Privacy, Laws, and IP.' },
    { id: 'CSC173', code: 'CSC173', title: 'Intelligent Systems', units: 3, completed: false, prerequisites: ['CSC171'], grid: { r: 2, c: 10 }, description: 'Advanced AI and robotics.', examples: 'Expert Systems and NLP.' },
    { id: 'CSC185', code: 'CSC185', title: 'Quality Assurance', units: 3, completed: false, prerequisites: ['CSC181_SE'], grid: { r: 3, c: 10 }, description: 'Software testing methodologies.', examples: 'Unit, Integration, and UAT.' },
    { id: 'CSC199', code: 'CSC199', title: 'Thesis 2', units: 3, completed: false, prerequisites: ['CSC198'], grid: { r: 4, c: 10 }, description: 'Final implementation and defense.', examples: 'System development.' },
    { id: 'ELEC2', code: 'ELECTIVE', title: 'Major Elective 2', units: 4, completed: false, prerequisites: ['ELEC1'], grid: { r: 5, c: 10 }, description: 'Specialization elective.', examples: 'Advanced study.' },
    { id: 'ELEC3', code: 'ELECTIVE', title: 'Major Elective 3', units: 4, completed: false, prerequisites: ['ELEC1'], grid: { r: 6, c: 10 }, description: 'Specialization elective.', examples: 'Capstone phase.' },
  ])

  const totalUnits = computed(() => subjects.value.reduce((acc, sub) => acc + sub.units, 0))
  const finishedUnits = computed(() => subjects.value.filter(s => s.completed).reduce((acc, sub) => acc + sub.units, 0))
  const progressPercentage = computed(() => (finishedUnits.value / totalUnits.value) * 100 || 0)

  const switchTab = (tab: string) => { currentTab.value = tab; }

  const isUnlocked = (sub: any) => {
    if (sub.prerequisites.length === 0) return true
    return sub.prerequisites.every((pId: string) => subjects.value.find(s => s.id === pId)?.completed)
  }

  const uncheckDependents = (parentId: string) => {
    subjects.value.forEach(s => {
      if (s.prerequisites.includes(parentId) && s.completed) {
        s.completed = false;
        uncheckDependents(s.id);
      }
    });
  }

  const toggleComplete = (subId: string) => {
    const sub = subjects.value.find(s => s.id === subId)
    if (!sub) return
    if (!sub.completed && !isUnlocked(sub)) return;
    sub.completed = !sub.completed;
    if (!sub.completed) uncheckDependents(sub.id);
  }

  const handleDropdownClick = (option: string) => {
    isDropdownOpen.value = false;
    if (option === 'logout') {
      emit('logout');
    } else {
      currentTab.value = option;
    }
  }
</script>

<template>
  <div class="tree-app" :class="{ 'dark-theme': isDarkMode }">
    <header class="top-nav">
      <div class="logo-section">
        
        <div class="brand-wrapper" style="display: flex; align-items: center; gap: 15px;">
          <div class="dropdown-container">
            <button class="menu-btn" @click="isDropdownOpen = !isDropdownOpen">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <button @click="handleDropdownClick('settings')">Settings</button>
              <button @click="handleDropdownClick('about')">About</button>
              <button class="logout-opt" @click="handleDropdownClick('logout')">Sign Out</button>
            </div>
          </div>
          <div class="logo">MSU Student Portal</div>
        </div>

        <nav class="tabs">
          <button :class="{ active: currentTab === 'roadmap' }" @click="switchTab('roadmap')">Roadmap</button>
          <button :class="{ active: currentTab === 'syllabus' }" @click="switchTab('syllabus')">Syllabus</button>
          <button :class="{ active: currentTab === 'tutorials' }" @click="switchTab('tutorials')">Tutorials</button>
          <button :class="{ active: currentTab === 'enrolled' }" @click="switchTab('enrolled')">Enrolled</button>
          <button :class="{ active: currentTab === 'professors' }" @click="switchTab('professors')">Professors</button>
          <button :class="{ active: currentTab === 'announcements' }" @click="switchTab('announcements')">Announcements</button>
          <button :class="{ active: currentTab === 'calendar' }" @click="switchTab('calendar')">MSU Calendar</button> 
        </nav>
      </div>
      
      <div class="prog-box">
        <div class="rail"><div class="fill" :style="{ width: progressPercentage + '%' }"></div></div>
        <span class="pct">{{ finishedUnits.toFixed(2) }} / {{ totalUnits.toFixed(2) }}</span>
      </div>
    </header>

    <main class="content-area">
      <RoadmapTab v-if="currentTab === 'roadmap'" :subjects="subjects" :isUnlocked="isUnlocked" @toggle="toggleComplete" />
      <SyllabusTab v-if="currentTab === 'syllabus'" :subjects="subjects" />
      <TutorialTab v-if="currentTab === 'tutorials'" :subjects="subjects" />
      <EnrolledTab v-if="currentTab === 'enrolled'" :subjects="subjects" :professors="professors" :isUnlocked="isUnlocked" />
      <ProfessorTab v-if="currentTab === 'professors'" :professors="professors" />
      <AnnouncementTab v-if="currentTab === 'announcements'" :subjects="subjects" :announcementsData="props.announcementsData" :isUnlocked="isUnlocked" />
      <MSUCalendarTab v-if="currentTab === 'calendar'" /> 
      <Student_Settings v-if="currentTab === 'settings'" />
      <Student_AccountSettings v-if="currentTab === 'account-settings'" />
      <Student_About v-if="currentTab === 'about'" />
    </main>
  </div>
</template>

<style scoped>
  .tree-app { 
    width: 100%; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    overflow: hidden; 
  }
  
  .top-nav { 
    background: #800000; 
    color: white; 
    padding: 0 2rem; 
    height: 70px; 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    z-index: 100; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
  }
  
  .logo-section { 
    display: flex; 
    align-items: center; 
    gap: 40px; 
    height: 100%; 
  }
  
  .logo { 
    font-weight: 800; 
    color: #ffd700; 
    font-size: 1.2rem; 
  }
  
  .tabs { 
    display: flex; 
    height: 100%; 
    align-items: flex-end; 
    gap: 5px; 
  }
  
  .tabs button { 
    background: transparent; 
    border: none; 
    color: white; 
    padding: 10px 20px 15px; 
    cursor: pointer; 
    opacity: 0.7; 
    font-weight: 600; 
    border-bottom: 3px solid transparent; 
    transition: 0.2s; 
  }
  
  .tabs button.active { 
    opacity: 1; 
    border-bottom: 3px solid #ffd700; 
    color: #ffd700; 
  }
  
  .prog-box { 
    display: flex; 
    align-items: center; 
    gap: 15px; 
    width: 380px; 
  }
  
  .rail { 
    flex: 1; 
    height: 10px; 
    background: rgba(255,255,255,0.2); 
    border-radius: 5px; 
    overflow: hidden; 
  }
  
  .fill { 
    height: 100%; 
    background: #ffd700; 
    transition: 0.6s ease; 
  }
  
  .pct { 
    font-weight: 800; 
    color: #ffd700; 
    font-size: 0.9rem; 
    white-space: nowrap; 
  }

  .content-area { 
    flex: 1; 
    overflow: auto; 
    position: relative; 
    background: #f8fafc; 
    width: 100%; 
    display: block; 
  }

  .dropdown-container { 
    position: relative; 
    display: flex; 
    align-items: center; 
  }
  
  .menu-btn { 
    background: transparent; 
    border: none; 
    color: white; 
    cursor: pointer; 
    padding: 5px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    transition: 0.2s; 
    border-radius: 8px;
  }
  
  .menu-btn:hover { 
    background: rgba(255,255,255,0.1); 
  }
  
  .dropdown-menu { 
    position: absolute; 
    top: 130%; 
    left: 0; 
    background: white; 
    border-radius: 12px; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.15); 
    width: 220px; 
    display: flex; 
    flex-direction: column; 
    overflow: hidden; 
    z-index: 200; 
    border: 1px solid #e2e8f0;
  }
  
  .dropdown-menu button { 
    padding: 15px 20px; 
    background: transparent; 
    border: none; 
    text-align: left; 
    font-size: 0.95rem; 
    font-weight: 700; 
    color: #334155; 
    cursor: pointer; 
    transition: 0.2s; 
    border-bottom: 1px solid #f1f5f9; 
    opacity: 1; 
  }
  
  .dropdown-menu button:last-child { 
    border-bottom: none; 
  }
  
  .dropdown-menu button:hover { 
    background: #f8fafc; 
    color: #800000; 
    padding-left: 25px; 
  }
  
  .dropdown-menu button.logout-opt { 
    color: #e11d48; 
  }
  
  .dropdown-menu button.logout-opt:hover { 
    color: #be123c; 
    background: #fff1f2; 
  }

  /* --- DARK MODE OVERRIDES --- */
  .dark-theme .content-area {
    background: #0f172a; 
    color: #e2e8f0;
  }

  .dark-theme .top-nav {
    background: #4a0404; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.5);
  }

  .dark-theme .dropdown-menu {
    background: #1e293b;
    border-color: #334155;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  }

  .dark-theme .dropdown-menu button {
    color: #cbd5e1;
    border-bottom-color: #334155;
  }

  .dark-theme .dropdown-menu button:hover {
    background: #334155;
    color: #ffd700;
  }

  .dark-theme .dropdown-menu button.logout-opt {
    color: #fb7185;
  }

  .dark-theme .dropdown-menu button.logout-opt:hover {
    background: #4c0519;
    color: #f43f5e;
  }
</style>

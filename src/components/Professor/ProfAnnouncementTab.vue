<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  classes: { type: Array as () => any[], default: () => [] },
  announcementsData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['add-announcement'])

const activeSubject = ref<any>(null)
const newPostType = ref('Announcement')
const newPostScope = ref('Professor Announcement')
const newPostContent = ref('')

const currentAnnouncements = computed(() => {
  if (!activeSubject.value || !props.announcementsData) return []
  return props.announcementsData[activeSubject.value.id] || props.announcementsData[activeSubject.value.code] || []
})

const setActiveSubject = (sub: any) => {
  activeSubject.value = sub
  newPostContent.value = ''
}

const submitPost = () => {
  if (!newPostContent.value.trim() || !activeSubject.value) return

  const post = {
    type: newPostType.value,
    scope: newPostScope.value,
    date: new Date().toLocaleDateString(undefined, { 
      month: 'short', day: 'numeric', year: 'numeric'
    }),
    author: 'Prof. Lucman', 
    content: newPostContent.value,
    title: `${newPostType.value} for ${activeSubject.value.code}`
  }

  const subjectKey = activeSubject.value.id || activeSubject.value.code
  
  emit('add-announcement', subjectKey, post)

  newPostContent.value = '' 
}

const formatDate = (dateStr: string) => dateStr
</script>

<template>
  <div class="lms-announcement-wrapper">
    <div class="split-layout">
      <aside class="lms-sidebar">
        <h3>My Handled Classes</h3>
        <div class="class-list">
          <button 
            v-for="sub in props.classes" :key="sub.id || sub.code"
            :class="['class-btn', { active: activeSubject && (activeSubject.id === sub.id || activeSubject.code === sub.code) }]"
            @click.prevent="setActiveSubject(sub)"
          >
            <div class="class-code">{{ sub.code }}</div>
            <div class="class-title">{{ sub.title }}</div>
          </button>
        </div>
      </aside>

      <main class="lms-main-feed">
        <div v-if="!activeSubject" class="select-prompt">
          <div class="icon-placeholder">📬</div>
          <h2>Select a class to manage announcements</h2>
        </div>
        
        <div v-else class="feed-container">
          <div class="feed-header-panel">
            <h1>{{ activeSubject.title }}</h1>
            <p>Post updates for {{ activeSubject.code }}</p>
          </div>

          <div class="post-editor">
            <div class="editor-header">Create New Post</div>
            <div class="editor-body">
              <div class="select-group">
                <select v-model="newPostType" class="type-select">
                  <option>Announcement</option>
                  <option>Requirement</option>
                  <option>Project</option>
                  <option>Memorandum</option>
                </select>
                <select v-model="newPostScope" class="type-select">
                  <option>Professor Announcement</option>
                  <option>Department-Level</option>
                  <option>College-Level</option>
                  <option>Campus-Wide</option>
                </select>
              </div>
              <textarea v-model="newPostContent" placeholder="Write instructions or updates here..."></textarea>
            </div>
            <div class="editor-footer">
              <button class="post-btn" @click="submitPost">Publish Post</button>
            </div>
          </div>

          <div class="post-list">
            <div v-for="(post, idx) in currentAnnouncements" :key="idx" class="post-card">
              <div class="post-header">
                <div class="author-avatar">{{ post.author ? post.author[0] : 'P' }}</div>
                <div class="author-info">
                  <span class="author-name">{{ post.author }}</span>
                  <span class="post-date">{{ formatDate(post.date) }}</span>
                </div>
                <span class="post-type" :class="post.type.toLowerCase()">{{ post.type }}</span>
              </div>
              <div class="post-body">{{ post.content }}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.lms-announcement-wrapper { 
  width: 100%; 
  height: calc(100vh - 75px); 
  padding: 30px; 
  box-sizing: border-box;
  overflow: hidden; 
}

.split-layout { 
  display: flex; 
  gap: 30px; 
  height: 100%; 
  max-width: 1400px; 
  margin: 0 auto; 
}

.lms-sidebar { 
  width: 320px; 
  background: white; 
  border-radius: 16px; 
  padding: 25px 20px; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
  border: 1px solid #f1f5f9; 
  display: flex; 
  flex-direction: column; 
  height: 100%; 
}
.lms-sidebar h3 { margin: 0 0 20px 5px; font-size: 1.1rem; color: #1e293b; font-weight: 800; }
.class-list { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
  flex: 1;
  overflow-y: auto; 
  padding-right: 5px;
}

.class-list::-webkit-scrollbar { width: 6px; }
.class-list::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

.class-btn { text-align: left; background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px 15px; border-radius: 12px; cursor: pointer; transition: 0.2s; display: block; width: 100%; }
.class-btn:hover { background: #f1f5f9; border-color: #cbd5e1; transform: translateX(4px); }
.class-btn.active { background: #1e293b; border-color: #1e293b; color: white; box-shadow: 0 4px 10px rgba(30,41,59,0.2); }
.class-btn.active .class-code { color: #ffd700; }
.class-btn.active .class-title { color: white; }
.class-code { font-size: 0.85rem; font-weight: 900; color: #800000; margin-bottom: 5px; transition: 0.2s; }
.class-title { font-size: 0.95rem; font-weight: 600; color: #334155; line-height: 1.3; transition: 0.2s; }
.empty-list { color: #94a3b8; font-size: 0.9rem; text-align: center; padding: 20px; font-weight: 600; }

.lms-main-feed { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  height: 100%; 
  overflow: hidden; 
}
.select-prompt { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748b; background: white; border-radius: 16px; border: 1px dashed #cbd5e1; }
.icon-placeholder { font-size: 4rem; margin-bottom: 20px; opacity: 0.5; }
.select-prompt h2 { margin: 0; color: #1e293b; font-weight: 800; }

.feed-container { 
  display: flex; 
  flex-direction: column; 
  flex: 1;
  gap: 20px; 
  overflow-y: auto; 
  padding-right: 15px;
}

.feed-container::-webkit-scrollbar { width: 8px; }
.feed-container::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

.feed-header-panel { 
  background: white; 
  padding: 30px; 
  border-radius: 16px; 
  border: 1px solid #e2e8f0; 
  border-left: 8px solid #1e293b; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
  flex-shrink: 0; 
}
.feed-header-panel h1 { margin: 0 0 5px 0; font-size: 1.8rem; color: #1e293b; font-weight: 900; }
.feed-header-panel p { margin: 0; color: #64748b; font-size: 1rem; }

.post-editor { 
  background: white; 
  border-radius: 16px; 
  border: 1px solid #cbd5e1; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.05); 
  overflow: hidden; 
  flex-shrink: 0; 
}
.editor-header { background: #f8fafc; padding: 15px 25px; font-weight: 800; color: #1e293b; border-bottom: 1px solid #e2e8f0; }
.editor-body { padding: 20px 25px; display: flex; flex-direction: column; gap: 15px; }
.type-select { padding: 10px 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-weight: bold; outline: none; width: max-content; }
textarea { width: 100%; height: 100px; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: inherit; font-size: 1rem; resize: vertical; outline: none; }
textarea:focus { border-color: #800000; }
.editor-footer { padding: 15px 25px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; }
.post-btn { background: #800000; color: white; border: none; padding: 10px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }
.post-btn:hover { background: #600000; transform: translateY(-2px); }

.post-list { 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  flex-shrink: 0;
}

.feed-bottom-spacer { height: 40px; flex-shrink: 0; }

.no-posts { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 50px; color: #94a3b8; font-weight: bold; background: white; border-radius: 16px; border: 1px dashed #e2e8f0; }
.no-post-icon { font-size: 3rem; margin-bottom: 10px; }

.post-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.02);}
.post-header { padding: 20px 25px; display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #f1f5f9; }
.author-avatar { width: 45px; height: 45px; background: #800000; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; }
.author-info { flex: 1; display: flex; flex-direction: column; }
.author-name { font-weight: 900; color: #1e293b; font-size: 1.05rem; }
.post-date { font-size: 0.8rem; color: #64748b; margin-top: 3px; font-weight: 600;}
.post-type { font-size: 0.75rem; font-weight: 800; padding: 5px 12px; border-radius: 20px; background: #f1f5f9; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;}
.post-type.announcement { background: #e0f2fe; color: #0284c7; }
.post-type.requirement { background: #ffe4e6; color: #e11d48; }
.post-type.project { background: #f3e8fd; color: #9333ea; }
.post-type.memorandum { background: #fef7e0; color: #b45309; }

.post-body { padding: 25px; font-size: 1.1rem; color: #334155; line-height: 1.7; white-space: pre-wrap; }
.select-group { display: flex; gap: 10px; }
</style>

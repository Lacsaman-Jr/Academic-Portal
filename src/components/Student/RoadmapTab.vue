<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps(['subjects', 'isUnlocked'])
  const emit = defineEmits(['toggle'])
  const semesters = ['Freshman 1st', 'Freshman 2nd', 'Sophomore 1st', 'Sophomore 2nd', 'Junior 1st', 'Junior 2nd', 'Junior Summer', 'Senior 1st', 'Senior 2nd']

  // LOGIC PARA SA GRADUATION HAT: I-check kung lahat ng subjects ay completed
  const isAllCompleted = computed(() => {
    if (!props.subjects || props.subjects.length === 0) return false;
    return props.subjects.every((sub: any) => sub.completed);
  })
</script>

<template>
  <div class="viewport">
    <div class="header-row">
      <div class="spacer"></div>
      <div v-for="sem in semesters" :key="sem" class="sem-label">{{ sem }}</div>
      <div class="spacer"></div>
    </div>
    <div class="tree-grid">
      <div class="anchor" style="grid-area: 3 / 1;"><div class="start-flag">START</div></div>
      
      <div v-for="sub in props.subjects" :key="sub.id" class="anchor" :style="{ gridArea: `${sub.grid.r} / ${sub.grid.c}` }">
        <div class="node" :class="{ 'done': sub.completed, 'locked': !props.isUnlocked(sub) && !sub.completed }" @click="emit('toggle', sub.id)">
          
          <span class="node-units">{{ sub.units }}u</span>
          
          <div class="node-content">
            <span class="node-code">{{ sub.code }}</span>
            <p class="node-title">{{ sub.title }}</p>
            <div class="node-status">
              <span v-if="sub.completed">✅</span>
              <span v-else-if="!props.isUnlocked(sub)">🔒</span>
            </div>
          </div>
        </div>
      </div>

      <div class="anchor" style="grid-area: 3 / 11;">
        <div class="end-flag" :class="{ 'graduated': isAllCompleted }">
          <span v-if="isAllCompleted" class="hat-icon">🎓</span>
          <span v-else>END</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .viewport { 
    min-width: 2800px; 
    padding: 40px; 
    display: block; 
  }
  
  .header-row { 
    display: grid; 
    grid-template-columns: 120px repeat(9, 260px) 120px; 
    margin-bottom: 20px; 
  }
  
  .sem-label { 
    text-align: center; 
    font-weight: 800; 
    color: #64748b; 
    font-size: 0.85rem; 
    text-transform: uppercase; 
  }
  
  .tree-grid { 
    display: grid; 
    grid-template-columns: 120px repeat(9, 260px) 120px; 
    grid-template-rows: repeat(7, 130px); 
    align-items: center; 
    justify-items: center; 
  }
  
  .anchor { 
    position: relative; 
    width: 100%; 
    height: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }

  .node { 
    width: 210px; 
    height: 100px; 
    background: white; 
    border-radius: 12px; 
    border: 1px solid #e2e8f0; 
    cursor: pointer; 
    padding: 15px; 
    position: relative; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
    transition: 0.2s; 
  }
  
  .node.done { 
    border: 2px solid #ffd700; 
    background: #fffdf2; 
  }
  
  .node.locked { 
    opacity: 0.4; 
    filter: grayscale(1); 
    cursor: not-allowed; 
  }

  .node-units { 
    position: absolute; 
    top: 10px; 
    right: 12px; 
    font-size: 0.75rem; 
    font-weight: 900; 
    color: #94a3b8; 
  }
  
  .node-code { 
    font-weight: 900; 
    color: #800000; 
    font-size: 0.9rem; 
    display: block; 
    margin-bottom: 4px; 
  }
  
  .node-title { 
    font-size: 0.7rem; 
    font-weight: 600; 
    color: #334155; 
    line-height: 1.2; 
    margin: 0; 
  }
  
  .node-status { 
    position: absolute; 
    bottom: 10px; 
    left: 15px; 
    font-size: 0.85rem; 
  }

  /* START AND END FLAGS */
  .start-flag, .end-flag { 
    width: 75px; 
    height: 75px; 
    background: #1e293b; 
    color: white; 
    border-radius: 50%; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-weight: 900; 
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
  }
  
  /* GRADUATION HAT ANIMATION AND STYLE */
  .end-flag.graduated { 
    background: #ffd700; 
    color: #800000; 
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.8); 
    transform: scale(1.3); 
  }
  
  .hat-icon { 
    font-size: 2.5rem; 
    animation: float 2s ease-in-out infinite; 
  }

  @keyframes float {
    0% { 
      transform: translateY(0px); 
    }
    50% { 
      transform: translateY(-5px); 
    }
    100% { 
      transform: translateY(0px); 
    }
  }
</style>
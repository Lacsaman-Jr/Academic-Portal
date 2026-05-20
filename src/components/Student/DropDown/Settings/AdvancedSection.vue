<template>
  <div class="section-container">
    <h2>Advanced Options</h2>
    
    <div class="setting-group">
      <div class="setting-item">
        <div>
          <h4>Export Data</h4>
          <p>Download a copy of your grades, schedule, and syllabus data.</p>
        </div>
        <button class="action-btn">Request Export</button>
      </div>

      <div class="setting-item danger-zone">
        <div>
          <h4 class="text-danger">Deactivate Portal Account</h4>
          <p>Temporarily disable your access to the student portal.</p>
        </div>
        <button class="danger-btn">Deactivate</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .section-container { 
    display: flex; 
    flex-direction: column; 
    gap: 20px; 
  }
  
  h2 { 
    color: #1e293b; 
    border-bottom: 2px solid #f1f5f9; 
    padding-bottom: 10px; 
    margin-top: 0; 
  }
  
  .setting-group { 
    display: flex; 
    flex-direction: column; 
    gap: 15px; 
  }
  
  .setting-item { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 15px; 
    background: #f8fafc; 
    border-radius: 12px; 
    border: 1px solid #e2e8f0; 
  }
  
  .setting-item h4 { 
    margin: 0 0 5px 0; 
    color: #334155; 
  }
  
  .setting-item p { 
    margin: 0; 
    font-size: 0.85rem; 
    color: #64748b; 
  }
  
  .action-btn { 
    background: white; 
    border: 1px solid #cbd5e1; 
    padding: 8px 16px; 
    border-radius: 8px; 
    cursor: pointer; 
    font-weight: 600; 
    color: #334155; 
    transition: 0.2s; 
  }
  
  .action-btn:hover { 
    background: #f1f5f9; 
  }

  /* Danger Zone Styles */
  .danger-zone { 
    border-color: #fecdd3; 
    background: #fff1f2; 
  }
  
  .text-danger { 
    color: #e11d48 !important; 
  }
  
  .danger-btn { 
    background: #e11d48; 
    color: white; 
    border: none; 
    padding: 8px 16px; 
    border-radius: 8px; 
    font-weight: 600; 
    cursor: pointer; 
    transition: 0.2s; 
  }
  
  .danger-btn:hover { 
    background: #be123c; 
  }
</style>
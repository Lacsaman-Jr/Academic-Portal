<template>
  <div class="settings-wrapper">
    <div class="settings-header">
      <h1>Faculty Settings</h1>
      <p>Manage your general preferences for the faculty portal.</p>
    </div>
    
    <div class="settings-content">
      <div class="placeholder-card">
        <div class="icon">⚙️</div>
        <h3>General Settings</h3>
        <p>Your preferences will appear here.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .settings-wrapper { 
    padding: 40px; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    gap: 20px; 
  }
  
  .settings-header { 
    background: white; 
    padding: 30px; 
    border-radius: 16px; 
    border: 1px solid #e2e8f0; 
    border-left: 8px solid #1e293b; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
  }
  
  .settings-header h1 { 
    margin: 0 0 5px 0; 
    font-size: 1.8rem; 
    color: #1e293b; 
    font-weight: 900; 
  }
  
  .settings-header p { 
    margin: 0; 
    color: #64748b; 
    font-size: 1rem; 
  }
  
  .settings-content { 
    flex: 1; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    background: white; 
    border-radius: 16px; 
    border: 1px dashed #cbd5e1; 
  }
  
  .placeholder-card { 
    text-align: center; 
    color: #64748b; 
  }
  
  .icon { 
    font-size: 4rem; 
    margin-bottom: 10px; 
    opacity: 0.5; 
  }
  
  .placeholder-card h3 { 
    margin: 0; 
    color: #1e293b; 
    font-weight: 800; 
  }
</style>
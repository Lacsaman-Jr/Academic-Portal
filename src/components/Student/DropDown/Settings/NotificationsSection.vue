<template>
  <div class="section-container">
    <h2>Notification Preferences</h2>
    
    <div class="setting-group">
      <div class="setting-item">
        <div>
          <h4>Push Notifications</h4>
          <p>Receive alerts for assignments and announcements.</p>
        </div>
        <select class="form-select">
          <option>All Notifications</option>
          <option>Important Only</option>
          <option>Off</option>
        </select>
      </div>

      <div class="setting-item">
        <div>
          <h4>Alert Mode</h4>
          <p>How would you like to be notified on mobile devices?</p>
        </div>
        <div class="radio-group">
          <label><input type="radio" name="mode" value="sound" checked> Sound & Vibrate</label>
          <label><input type="radio" name="mode" value="vibrate"> Vibrate Only</label>
          <label><input type="radio" name="mode" value="silent"> Silent</label>
        </div>
      </div>

      <div class="setting-item">
        <div>
          <h4>Email Summary</h4>
          <p>Receive a weekly digest of your academic progress.</p>
        </div>
        <label class="switch">
          <input type="checkbox" checked>
          <span class="slider round"></span>
        </label>
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
  
  .form-select { 
    padding: 8px 12px; 
    border-radius: 8px; 
    border: 1px solid #cbd5e1; 
    outline: none; 
  }
  
  .radio-group { 
    display: flex; 
    gap: 15px; 
    font-size: 0.9rem; 
    color: #475569; 
  }
  
  .radio-group label { 
    display: flex; 
    align-items: center; 
    gap: 5px; 
    cursor: pointer; 
  }

  /* Switch CSS */
  .switch { 
    position: relative; 
    display: inline-block; 
    width: 50px; 
    height: 26px; 
  }
  
  .switch input { 
    opacity: 0; 
    width: 0; 
    height: 0; 
  }
  
  .slider { 
    position: absolute; 
    cursor: pointer; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    background-color: #cbd5e1; 
    transition: .4s; 
    border-radius: 34px; 
  }
  
  .slider:before { 
    position: absolute; 
    content: ""; 
    height: 18px; 
    width: 18px; 
    left: 4px; 
    bottom: 4px; 
    background-color: white; 
    transition: .4s; 
    border-radius: 50%; 
  }
  
  input:checked + .slider { 
    background-color: #800000; 
  }
  
  input:checked + .slider:before { 
    transform: translateX(24px); 
  }
</style>
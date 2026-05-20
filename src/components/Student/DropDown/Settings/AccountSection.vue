<template>
  <div class="section-container">
    <h2>Personal Information</h2>
    <div class="form-grid">
      <div class="input-group">
        <label>Email Address</label>
        <input type="email" value="student@msu.edu.ph" placeholder="Enter new email">
      </div>
      <div class="input-group">
        <label>Phone Number</label>
        <input type="tel" value="+63 912 345 6789" placeholder="Enter phone number">
      </div>
      <div class="input-group full-width">
        <label>Current Address</label>
        <input type="text" value="Marawi City, Lanao del Sur" placeholder="Enter physical address">
      </div>
      <button class="save-btn">Update Information</button>
    </div>

    <h2 class="mt-4">Security</h2>
    <div class="setting-group">
      <div class="setting-item">
        <div>
          <h4>Change Password</h4>
          <p>Update your password for better security.</p>
        </div>
        <button class="action-btn">Update</button>
      </div>
      <div class="setting-item">
        <div>
          <h4>Active Devices</h4>
          <p>Manage devices currently logged into your account.</p>
        </div>
        <button class="action-btn">View Devices</button>
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

.mt-4 { 
  margin-top: 30px; 
}

.form-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; gap: 20px; 
}

.input-group { 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
}

.full-width { 
  grid-column: span 2; 
}

.input-group label { 
  font-size: 0.9rem; 
  font-weight: 600; 
  color: #475569; 
}

.input-group input { 
  padding: 12px; 
  border-radius: 8px; 
  border: 1px solid #cbd5e1; 
  outline: none; 
  transition: 0.2s; 
}

.input-group input:focus { 
  border-color: #800000;
  box-shadow: 0 0 0 3px rgba(128,0,0,0.1); 
}

.save-btn { 
  grid-column: span 2; 
  background: #800000; 
  color: white; 
  padding: 12px; 
  border: none; 
  border-radius: 8px; 
  font-weight: 600; 
  cursor: pointer; 
  transition: 0.2s; 
  margin-top: 10px; 
}

.save-btn:hover { 
  background: #600000; 
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
</style>

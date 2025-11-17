// Utility to clear localStorage and force re-seed
// Run this in browser console: clearPrimeNestStorage()

export function clearPrimeNestStorage() {
  localStorage.removeItem('primenest_users');
  localStorage.removeItem('primenest_properties');
  localStorage.removeItem('primenest_agents');
  localStorage.removeItem('primenest_contacts');
  sessionStorage.removeItem('currentUser');
  
  console.log('✅ PrimeNest storage cleared! Reload the page to see fresh data.');
  
  // Optionally reload the page
  if (confirm('Storage cleared! Reload the page now?')) {
    window.location.reload();
  }
}

// Make it available globally in development
if (typeof window !== 'undefined') {
  (window as any).clearPrimeNestStorage = clearPrimeNestStorage;
}

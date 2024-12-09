class authService {
    
    async signOut(callback) {
      try {
        const response = await fetch(`http://localhost:5002/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for session management
        });
  
        if (response.ok) {
          // Assume successful logout if response is OK
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('user');
          callback(true);
        } else {
          console.error('Logout failed:', response.statusText);
          callback(false);
        }
      } catch (err) {
        console.error('An error occurred:', err);
        callback(false);
      }
    }
  
    isSignedIn() {
      // Check for the existence of a value in sessionStorage
      return !!sessionStorage.getItem('isLoggedIn');
    }
  
    getSignedInUser() {
      return sessionStorage.getItem('user');
    }
  }
  
  export default new authService();
  

const token = localStorage.getItem('token')

export function fetchUserorder(id) {
  return new Promise(async (resolve) => {
    
    const response = await fetch('http://localhost:8080/order/' + id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        
        'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}



  export function fetchLoggedInUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:8080/users/' + id , {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            
            'content-type': 'application/json' },
          
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        resolve({ data });
      } catch (error) {
        reject({ error: error.message });
      }
    });
  }
  
  
  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/users/${update}`,{
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
          'Authorization': `Bearer ${token}`,
          
          'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }

const token = localStorage.getItem('token');





export function addOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Authorization': `Bearer ${token}`,
          
          'Content-Type': 'application/json' },
      });

      // Check if the response status is not OK
      if (!response.ok) {
        // If not, reject with the error status and message
        const errorData = await response.json();
        reject(`Error: ${response.status} - ${errorData.message || 'An error occurred'}`);
        return;
      }

      const data = await response.json();
      console.log('Order successfully added:', data);

      // Resolve with the response data
      resolve({ data });
    } catch (error) {
      // Catch any unexpected errors like network issues or other exceptions
      console.error('Network error or unexpected error occurred:', error);
      reject(`Network error: ${error.message || 'Something went wrong'}`);
    }
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/order/' + order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 
        'Authorization': `Bearer ${token}`,       
        'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}  

export function fetchAllOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/order', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' },
      });

      // Check if the response is okay (status 200)
      if (!response.ok) {
        // If response is not okay, throw an error with status code and message
       console.log(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Get the total count of orders from the response headers
      const totalOrders = response.headers.get('X-Total-Count');

      // Resolve with the data and total order count
      resolve({
        data: {
          orders: data,
          totalOrders: totalOrders ? +totalOrders : data.length,  // Default to the length of orders if X-Total-Count is not available
        },
      });
    } catch (error) {
      // Reject the promise with a detailed error message
      reject({
        message: 'Error fetching orders.',
        error: error.message,
        stack: error.stack,  // Include the error stack for debugging
      });

      // Log detailed error information for debugging purposes
      console.error("Error fetching orders:", error);
      alert(`An error occurred: ${error.message}`); // Optional: Show a user-friendly alert
    }
  });
}


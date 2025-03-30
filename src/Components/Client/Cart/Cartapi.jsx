
const token = localStorage.getItem('token');

export function addToCart(item) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/cart', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Authorization': `Bearer ${token}`,
          
          'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
      console.log(data)
    });
  }

  export function fetchItemsById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`http://localhost:8080/cart?user=${id}`, {
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
          console.log('Error fetching product by ID:', error);
          reject(error);
        }
      });
    }

    export function updateCart(update) {
        return new Promise(async (resolve) => {
          const response = await fetch('http://localhost:8080/cart/' + update.id, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {
              'Authorization': `Bearer ${token}`,
              'content-type': 'application/json' },
          });
          
          const responseText = await response.json();  // Use text() to get the raw response
          console.log(responseText);  // Log the response text
          
          // If it's a valid JSON, parse it.
          try {
            const data = JSON.parse(responseText);
            resolve({ data });
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        });
      }

      
      export function deleteCart(itemId) {
        return new Promise(async (resolve) => {
          const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
            method: 'DELETE',
            headers: { 
          'Authorization': `Bearer ${token}`,
              'content-type': 'application/json' },
          });
          const data = await response.json();
          resolve( {data});
        });
      }

      export function resetCart() {
        // get all items of user's cart - and then delete each
        return new Promise(async (resolve) => {
          const response = await fetchItemsById();
          const items = response.data;
          for (let item of items) {
            await deleteCart(item.id);
          }
          resolve({ status: 'success' });
        });
      }
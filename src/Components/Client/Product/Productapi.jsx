
// export function fetchallproducts () {
//     return new Promise(async (resolve) => {
//         const response = await fetch('http://localhost:8080/product')
//         const data = await response.json()
//         resolve({data})
//     });
// }

const token = localStorage.getItem('token');

export function fetchproductsbycategory() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/category', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',  // optional, depending on your API
        },
      });

      if (!response.ok) {
        // Handle error (e.g., unauthorized, server issues)
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      resolve({ data });


    } catch (error) {
      reject(error);

    }
  });
}

export function fetchproductsbybrand() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',  // optional, depending on your API
      },
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchproductsById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/product/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',  // optional, depending on your API
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      reject(error);
    }
  });
}

// export function fetchproductbyfilter(filter, sort) {
//   if (Object.keys(filter).length === 0 && Object.keys(sort).length === 0) {
//     console.error('Both filter and sort objects are empty');
//     return Promise.reject('Both filter and sort objects are empty');
//   }

//   let url = 'http://localhost:8080/product';

//   // Append filter parameters to the URL
//   if (filter.category) {
//     url += `?category=${filter.category}`;
//   }

//   // Append sorting parameters if available
//   if (sort._sort && sort._order) {
//     // If filter already has query params, append the sort query params with '&'
//     url += `${filter.category ? '&' : '?'}_sort=${sort._sort}&_order=${sort._order}`;
//   }

//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       // If no products are found, log a message
//       if (data.length === 0) {
//         console.error('No products found for the given filter and sort:', filter, sort);
//       }

//       // Resolve with the data
//       resolve({ data });
//     } catch (error) {
//       // Reject in case of an error
//       console.error('Error fetching products by filter and sort:', error);
//       reject(error);
//     }
//   });
// }


export function fetchproductbyfilter(filter, sort) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/product?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',  // optional, depending on your API
      },
    });
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}


export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/product', {
      method: 'POST',
      body: JSON.stringify(product),
      'Authorization': `Bearer ${token}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/product/${update.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}


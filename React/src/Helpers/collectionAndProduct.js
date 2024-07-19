export const collections = async () => {
  var myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`http://localhost:8000/collection/get`,
      requestOptions,
    ); const collections = await response.json();
    console.log("collections: ", collections);
    if(collections.message === 'success'){
      return collections.collection;
    }
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};
export const products = async (page = 1, limit = 10) => {
  var myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `http://localhost:8000/product/get?page=${page}&limit=${limit}`, requestOptions,);
    const products = await response.json();
    console.log("products: ", products);
    return products.collection;
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};


export const productById = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `http://localhost:8000/product/getById?id=${id}`,
      requestOptions,
    );
    console.log("response", response);

    const products = await response.json();
    console.log("products: ", products.collection);
    return products.collection;
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};

export const CollectionByIdProduct = async (collection_id) => {
  var myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `http://localhost:8000/collection/getById?id=${collection_id}`,
      requestOptions,
    );
    const CollectionByIdProduct = await response.json();
    if(CollectionByIdProduct.message === 'success'){
      return CollectionByIdProduct.collection;
    }
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};

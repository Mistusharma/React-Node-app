export const createUser = async formData => {
  var myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(
    formData
  );
  console.log("raw", raw);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `http://localhost:8000/api/create`,
      requestOptions,
    );
    const result = await response.json();
    console.log("result: ", result);
    if (response.status === "User already exists") {
      return result.message;
    }
    return result;
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};



export const loginUser = async formData => {
  console.log("formData: ", formData);
  var myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(formData);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `http://localhost:8000/api/login`,
      requestOptions,
    );
    const result = await response.json();
    console.log("result: ", result);
    if (response.message === "User not exists") {
      return result.message;
    }
    return result;

  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};

export const forget = async (email) => {
  console.log("email: ", email);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    email: email // Assuming email is passed as an argument to the function
  });
  console.log("raw", raw);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  console.log("requestOptions", requestOptions);
  try {
    const response = await fetch('http://localhost:8000/api/forget', requestOptions);
    console.log("response", response);
    const result = await response.json();
    if (response.status === "error") { // Checking for status code 200 for success
      return result.message;
    }
    return result;
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};

export const reset = async (formData) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(formData);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch('http://localhost:8000/api/reset', requestOptions);

    const result = await response.json();
    if (response.status === 404) { // Checking if response is not OK (status code other than 2xx)
      return result.error; // Throw an error with the error message
    }

    return result; // If response is OK, return the result
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(error); // Re-throw the error to be caught by the caller
  }
};

export const userProfile = async formData => {
  var myHeaders = new Headers();
  myHeaders.append('accept', '*/*');
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(
    formData
  );
  console.log("raw", raw);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(
      `http://localhost:8000/api/profile`,
      requestOptions,
    );
    console.log("respone", response);
    const result = await response.json();
    console.log("result: ", result);
    if (response.status === 200) {
      return result.message;
    }
    return result;
  } catch (error) {
    console.log("error: ", error);

  }
};

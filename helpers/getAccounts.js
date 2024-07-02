export const getAccounts = async (linkId) => {
    const url = import.meta.env.VITE_BASE_URL;
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const base64Credentials = btoa(username + ':' + password);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${base64Credentials}`,
      }
    };

    const response = await fetch(`${url}/api/accounts/?link=${linkId}`, options);
    const data = await response.json();
    return data.results
};
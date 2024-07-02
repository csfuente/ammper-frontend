export const getLink = async (name) => {
    const url = import.meta.env.VITE_BASE_URL;
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const base64Credentials = btoa(username + ':' + password);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${base64Credentials}`,
      }
    };

    const payload = {
        username: Math.random().toString(36).substring(7),
        password: Math.random().toString(36).substring(7),
        institution: name,
        access_mode: "recurrent"
    };

    const response = await fetch(`${url}/api/links/`, {
      ...options,
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data.id
};
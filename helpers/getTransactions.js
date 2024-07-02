export const getTransactions = async (linkId, accountId, page=1) => {
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

    const response = await fetch(`${url}/api/transactions/?link=${linkId}&account=${accountId}&page_size=500&page=${page}`, options);
    const data = await response.json();
    if (data.next) {
      return data.results.concat(await getTransactions(linkId, accountId, page+1));
    }
    return data.results
};
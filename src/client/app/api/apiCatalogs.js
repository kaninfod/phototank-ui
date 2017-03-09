import { headers } from './apiUtils';

export function catalogs() {
  var url = '/api/catalogs.json';

  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });

}

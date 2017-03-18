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

export function catalogsCreate(payload) {
  var url = '/api/catalogs/create_c';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url,  {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ name: payload.name, type: payload.type }),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function catalogsVerifyDropbox(payload) {
  var url = '/api/catalogs/verify_dropbox';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url,  {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ id: payload.id, verifier: payload.verifier }),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function catalogsUpdate(payload) {
  var url = '/api/catalogs/'.concat(payload.id);
  headers.append('Content-Type', 'application/json');
  var request = new Request(url,  {
    headers: headers,
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function catalogsImport(payload) {
  var url = '/api/catalogs/'.concat(payload.id, '/import');

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

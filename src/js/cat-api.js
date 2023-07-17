const  API_KEY = 'live_GM1RJjXPrTnmGPxRfujaChJEZT1mPWz0drRP1D08Vw1TNkmUvt2fb4lGZDh3YPwY';
const BASE_URL = 'https://api.thecatapi.com/v1';
const BREED = '/breeds';
const CAT = '/images/search';

function fetchBreeds() {
  return fetch(`${BASE_URL}${BREED}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.map(({ id, name }) => ({
        id: id,
        name: name,
      }));
    });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}${CAT}?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
			if (data && data.length > 0) {
				return {
          imageUrl: data[0].url,
          breedName: data[0].breeds[0].name,
          description: data[0].breeds[0].description,
          temperament: data[0].breeds[0].temperament,
        };
      } else {
        throw new Error('Information about cat for this breed is not found!');
      }
    });
}

export { fetchBreeds, fetchCatByBreed };
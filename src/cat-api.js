// cat-api.js

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'your key';

export const fetchBreeds = () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');

  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  error.style.display = 'none';

  return new Promise((resolve, reject) => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        const breeds = response.data;
        breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed.id;
          option.text = breed.name;
          breedSelect.add(option);
        });
        loader.style.display = 'none';
        breedSelect.style.display = 'block';
        resolve(breeds);
      })
      .catch(err => {
        loader.style.display = 'none';
        error.style.display = 'block';
        reject(err);
      });
  });
};

export const fetchCatByBreed = breedId => {
  const catInfo = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');

  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => {
        const catData = response.data[0];
        const { name, description, temperament } = catData.breeds[0];

        // Update UI with cat information
        // Assuming you have elements in the cat-info block for name, description, and temperament
        document.querySelector('.cat-name').innerText = name;
        document.querySelector('.cat-description').innerText = description;
        document.querySelector('.cat-temperament').innerText = temperament;

        loader.style.display = 'none';
        catInfo.style.display = 'block';
        resolve(catData);
      })
      .catch(err => {
        loader.style.display = 'none';
        error.style.display = 'block';
        reject(err);
      });
  });
};

// index.js

import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const apiKey =
  'live_6h4QUxeTfC4qVpMQNe7IsH0bXSFGfs90JToDMxK4F4XoDf10nSigsOxUm0TBw1hS';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

// Initialize SlimSelect
const slimSelect = new SlimSelect('.breed-select');

// Event listener for breed selection
breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  fetchCatByBreed(apiKey, selectedBreedId);
});

// Initial fetch for breeds
fetchBreeds(apiKey)
  .then(() => {
    // Hide the error message initially
    error.style.display = 'none';
  })
  .catch(err => {
    console.error('Error fetching breeds:', err);
    Notiflix.Notify.Failure('Oops! Something went wrong fetching breeds.');
  });

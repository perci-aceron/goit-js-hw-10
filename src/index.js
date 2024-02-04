// index.js

import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import axios from 'axios'; // Import axios

// Set the API key for all Axios requests
axios.defaults.headers.common['x-api-key'] =
  live_6h4QUxeTfC4qVpMQNe7IsH0bXSFGfs90JToDMxK4F4XoDf10nSigsOxUm0TBw1hS;

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

// Initialize SlimSelect
const slimSelect = new SlimSelect('.breed-select');

// Event listener for breed selection
breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId);
});

// Initial fetch for breeds
fetchBreeds()
  .then(() => {
    // Hide the error message initially
    error.style.display = 'none';
  })
  .catch(err => {
    console.error('Error fetching breeds:', err);
    Notiflix.Notify.Failure('Oops! Something went wrong fetching breeds.');
  });

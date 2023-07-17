import SlimSelect from 'slim-select';
import { hide, show } from './hidden-element';
import refs from './refs';

const { selectElement, loader, loaderElement, catInfo } = refs;

function markupBreeds(breeds) {
  selectElement.innerHTML = breeds.reduce((acc, { id, name }) => {
    return acc + `<option value = ${id}>${name}</option>`;
  }, '');

  new SlimSelect({
    select: '.breed-select',
  });

  hide(loaderElement, loader);
  show(selectElement);
}

function markupCatInfo(data) {
  const { imageUrl, breedName, description, temperament } = data;
  const markup = `
		<img src="${imageUrl}" alt="Breed of cat is ${breedName}" width='300'>
		<div class="desc">
			<h1 class="desc-title">${breedName}</h1>
			<p class="desc-text">${description}</p>
			<p class="desc-text">${temperament}</p>
		</div>
	`;
  catInfo.innerHTML = markup;

  hide(loaderElement, loader);
  catInfo.style.display = 'flex';
}

export { markupBreeds, markupCatInfo };
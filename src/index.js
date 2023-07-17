import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import refs from './js/refs';
import { hide, show } from './js/hidden-element';
import { markupBreeds, markupCatInfo } from './js/markup';

const { selectElement, loader, loaderElement, errorRef, catInfo} = refs;

hide(errorRef, selectElement);

setTimeout(() => {
  fetchBreeds()
    .then(breeds => {
      // Create and add breeds - <option> in select
      markupBreeds(breeds);
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure('❌ The breeds of cats are not found!');
      
			hide(loaderElement, loader);
			show(errorRef);
    });
}, 2000);

selectElement.addEventListener('change', onSelected);

function onSelected() {
  catInfo.style.display = 'none';
	show(loaderElement, loader);

  const breedId = selectElement.value;
  setTimeout(() => {
    fetchCatByBreed(breedId)
      .then(data => {
        markupCatInfo(data);
      })
      .catch(error => {
        console.error(error);
        Notiflix.Notify.failure(
          '❌ Information about cat for this breed is not found!'
        );
        
				hide(loaderElement, loader);
				show(errorRef);
      });
  }, 2000);
}
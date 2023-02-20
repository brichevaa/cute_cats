import { api } from './api.js';

class Card {
   constructor(dataCat, selectorTemplate, onClickToEdit = () => {}) {
      this._data = dataCat;
      this._selectorTemplate = selectorTemplate;
      this._onClickToEdit = onClickToEdit;
   }
   _getTemplate() {
      return document
         .querySelector(this._selectorTemplate)
         .content.querySelector('.card');
   }
   getElement() {
      this.element = this._getTemplate().cloneNode(true);
      // const cardTitle = this.element.querySelector('.card__name');
      const cardImage = this.element.querySelector('.card__image');
      const cardLike = this.element.querySelector('.card__like');
      const cardLink = this.element.querySelector('.card__link');
      const deleteBtn = this.element.querySelector('.card__delete');
      this.cardTitle = this.element.querySelector('.card__name');

      deleteBtn.setAttribute('id', `btn-${this._data.id}`);
      deleteBtn.addEventListener('click', (e) => {
         e.preventDefault();
         if (confirm('Are you shure?')) {
            api.deleteCatById(this._data.id).then(() => {
               const elem = document.getElementById(`btn-${this._data.id}`);
               console.log({ elem });
               // updateLocalStorage(cat, 'DELETE_CAT');
               elem.parentElement.remove();
            });
         }
      });

      if (!this._data.favorite) {
         cardLike.remove();
      }

      cardTitle.textContent = this._data.name ?? 'Barsik';
      cardImage.src =
         this._data.image ||
         'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=980:*';

      cardLink.addEventListener('click', (e) => {
         console.log('>>>', this._data.id);
         this._onClickToEdit(this.element, this._data.id);
      });
      return this.element;
   }
}

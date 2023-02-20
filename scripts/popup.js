class Popup {
   constructor(className) {
      this._className = className;
      this._popup = document.querySelector(`.${className}`);
      this._handleEscUp = this._handleEscUp.bind(this);
   }

   _handleEscUp(evt) {
      if (evt.key === 'Escape') {
         this.close();
      }
   }

   open() {
      this._popup.classList.add('popup_active');
      document.addEventListener('keyup', this._handleEscUp);
   }

   close() {
      this._popup.classList.remove('popup_active');
      document.removeEventListener('keyup', this._handleEscUp);
   }
   setContent(content, id) {
      // console.log({ content });
      const cardImage = content.querySelector('.card__image').src;
      const cardLink = content.querySelector('.card__link').textContent;
      const elements = [...document.querySelector('#popup-form-edit').elements];
      console.log({ cardImage, cardLink });
      console.log({ elements });

      // const myCat = api.getCatById(id);
      elements.forEach((input) => {
         // console.log(input);
         if (input.type === 'submit') return;

         if (input.name === 'id') {
            input.value = id;
            return (input.disabled = true);
         }
         if (input.type !== 'checkbox') input.value = '';
         if (input.type === 'checkbox') input.checked = true;
      });
   }

   setEventListener() {
      this._popup.addEventListener('click', (evt) => {
         if (
            evt.target.classList.contains(this._className) ||
            evt.target.closest('.popup__close')
         ) {
            this.close();
         }
      });
   }
}
export default Popup;

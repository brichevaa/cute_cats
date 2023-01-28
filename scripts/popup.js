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

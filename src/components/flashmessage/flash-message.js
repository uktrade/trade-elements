'use strict';

const TIMEOUT = 30000;

class FlashMessage {

  constructor( element ){

    this.element = element;
    this.timeout = setTimeout( this.removeMessage.bind( this ), TIMEOUT );
    this.addCloseLink();
  }

  removeMessage(){

    clearTimeout( this.timeout );
    this.element.parentNode.removeChild( this.element );
  }

  addCloseLink(){

    let removeMessage = this.removeMessage.bind( this );
    let closeLink = document.createElement( 'a' );

    closeLink.innerHTML = 'Close';
    closeLink.href = '#';
    closeLink.onclick = function( e ){
      removeMessage();
      e.preventDefault();
    };

    this.element.appendChild( closeLink );
  }

  static activateAll(){

    const flashes = document.querySelectorAll('.flash-message' );

    flashes.forEach( ( elem ) => {

      new FlashMessage( elem );
    } );
  }
}

FlashMessage.activateAll()

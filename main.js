// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// grab modal
const modal = document.querySelector('#modal')
// grab hearts (collection of hearts)
const hearts = document.querySelectorAll('.like-glyph')

function liker (){
  for (const heart of hearts){
    // add event listener to each heart in hearts
    heart.addEventListener('click', () => {
      // make a server call
      mimicServerCall()
      // when successful (resolve), change the heart
      //    if the heart if empty, make it full
      //    if the heart if full, make it empty 
      .then(() => {
        if (heart.textContent == EMPTY_HEART){
          heart.textContent = FULL_HEART;
          heart.className = 'activated-heart';
        } else {
          heart.textContent = EMPTY_HEART;
          heart.className = 'like-glyph';
        }
      })
      // when failed (reject), make the error message visible 
      .catch(error => {
        modal.hidden = false;
        const modalMessage = document.querySelector('#modal-message');
        modalMessage.innerText = error;
        // make the error message disappear (hidden) after 3 seconds
        setTimeout(() => {
          modal.hidden = true;
        }, 3000);
      })
    }
  )}
}

// Initialize liker function when DOM is loaded
document.addEventListener('DOMContentLoaded', liker);


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

import Alpine from 'alpinejs';
// import axios from 'axios';

// const Flickity = require('flickity');
// require('flickity-fade');

// const SUBSCRIBE_FUNCTION_ENDPOINT = '/.netlify/functions/subscribe'
// const CONTACT_FUNCTION_ENDPOINT = '/.netlify/functions/send-email';

// events
window.events = {
    // contact form modal
    // openContactForm: 'open-contact-form',
};

document.addEventListener('alpine:init', () => {

    /**
     * Top Menu Size
     */
    // Alpine.data('menuSize', () => {
    //     return {
    //         small: false,
    //         init() {
    //             this.adjustSize();
    //             window.addEventListener('scroll', this.adjustSize.bind(this));
    //         },
    //         adjustSize() {
    //             this.small = window.scrollY >= 100;
    //         },
    //     };
    // });

    /* --- Contact Form --- */

    // Alpine.data('contactForm', () => ({
    //     open: false,
    //     delayedOpen: false,
    //     success: false,
    //     failure: false,
    //     loading: false,
    //     failureMessage: '',
    //     init() {
    //         window.addEventListener(window.events.openContactForm, this.openModal.bind(this));
    //         window.addEventListener(window.events.closeContactForm, this.closeModal.bind(this));
    //     },
    //     openModal() {
    //         this.open = true;
    //         this.delayedOpen = true;
    //     },
    //     closeModal() {
    //         this.open = false;
    //         setTimeout(() => this.delayedOpen = false, 1000);
    //     },
    //     async sendContatForm( ) {
    //         this.loading = true;
    //
    //         this.$refs.name.classList.remove('border-red-300');
    //         this.$refs.email.classList.remove('border-red-300');
    //         this.$refs.message.classList.remove('border-red-300');
    //
    //         try {
    //             let response = await axios.post(CONTACT_FUNCTION_ENDPOINT, {
    //                 name: this.$refs.name.value,
    //                 email: this.$refs.email.value,
    //                 message: this.$refs.message.value,
    //             });
    //             await this.axiosSuccess(response);
    //         } catch (error) {
    //             this.axiosError(error)
    //         }
    //     },
    //     async axiosSuccess(response) {
    //         // console.log('success', response);
    //         if (200 === response.status) {
    //             this.success = true;
    //             this.failure = false;
    //             this.loading = false;
    //         } else if (403 === response.status) {
    //             let parsedResponse = await response.json();
    //             this.success = false;
    //             this.failure = true;
    //             this.loading = false;
    //             this.failureMessage = parsedResponse.message;
    //         }
    //     },
    //     axiosError(error) {
    //         // console.log('error', error);
    //         this.success = false;
    //         this.failure = true;
    //         this.loading = false;
    //         this.failureMessage = 'There was an error while send your message, please try again later!';
    //     },
    // }));
});

function startBackToTop()
{
    // get the element to animate
    var backToTop = document.getElementById('back-top');
    var element = document.getElementById('main-window');
    var elementHeight = element.clientHeight;

    // listen for scroll event and call animate function
    document.addEventListener('scroll', toggleBackToTop);

    document.querySelector('#back-top a')
        .addEventListener('click', (e) => {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        });

    // check if element is in view
    function inView() {
        // get window height
        var windowHeight = window.innerHeight;
        // get number of pixels that the document is scrolled
        var scrollY = window.scrollY || window.pageYOffset;

        // get current scroll position (distance from the top of the page to the bottom of the current viewport)
        var scrollPosition = scrollY + windowHeight;
        // get element position (distance from the top of the page to the bottom of the element)
        var elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;

        // is scroll position greater than element position? (is element in view?)
        if (scrollPosition > elementPosition) {
            return true;
        }

        return false;
    }

    // animate element when it is in view
    function toggleBackToTop() {
        // is element in view?
        if (inView()) {
            // element is in view, add class to element
            backToTop.classList.add('block');
            backToTop.classList.remove('hidden');
            return;
        }

        backToTop.classList.remove('block');
        backToTop.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    Alpine.start();
    startBackToTop();

    // fix for the mobile screen size
    // let vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);
});
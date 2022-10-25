
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

// animate element when it is in view
function toggleBackToTop() {
    let backToTop = document.getElementById('back-top');

    // is element in view?
    if ((() => {
        let element = document.getElementById('main-window');
        let elementHeight = element.clientHeight;

        // get window height
        let windowHeight = window.innerHeight;
        // get number of pixels that the document is scrolled
        let scrollY = window.scrollY || window.pageYOffset;

        // get current scroll position (distance from the top of the page to the bottom of the current viewport)
        let scrollPosition = scrollY + windowHeight;
        // get element position (distance from the top of the page to the bottom of the element)
        let elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;

        // is scroll position greater than element position? (is element in view?)
        return scrollPosition > elementPosition;
    })()) {
        // element is in view, add class to element
        backToTop.classList.add('block');
        backToTop.classList.remove('hidden');
        return;
    }

    backToTop.classList.remove('block');
    backToTop.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', (event) => {
    Alpine.start();

    // fix for the mobile screen size
    // let vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);

    // initilization events
    setTimeout(() => {
        document.getElementById('main-window').classList.remove('skew-y-0');
        document.getElementById('main-window').classList.add('skew-y-3', 'drop-shadow-xl');
    }, 500);

    // scroll based events
    window.addEventListener('scroll', (event) => {
        toggleBackToTop();

        // down-arrow
        let downArrow = document.getElementById('down-arrow');
        if (0 === window.scrollY) {
            if (downArrow.classList.contains('hidden')) {
                downArrow.classList.remove('hidden');
            }
        } else {
            if (!downArrow.classList.contains('hidden')) {
                downArrow.classList.add('hidden');
            }
        }
    });
});
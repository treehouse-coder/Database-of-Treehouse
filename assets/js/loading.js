/*======================================
LOADING
======================================*/

const Loading={

    show(text="Loading..."){

        document
        .getElementById("loadingText")
        .textContent=text;

        document
        .getElementById("loadingOverlay")
        .classList.add("show");

    },

    hide(){

        document
        .getElementById("loadingOverlay")
        .classList.remove("show");

    }

};
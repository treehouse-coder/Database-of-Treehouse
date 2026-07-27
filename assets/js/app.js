/*======================================
TREEHOUSE POS APP
======================================*/

const APP = {

    name : "Treehouse POS",

    version : "1.0.0",

    filter : {

        branch:"KARAWACI",

        month : new Date().getMonth() + 1,

        year : new Date().getFullYear()

    }

};

/*======================================
INITIALIZE
======================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        setToday();

Filter.init();

Modal.init();

SuccessModal.init();

SignatureModal.init();

const lastPage =

    localStorage.getItem(

        "treehouse_last_page"

    ) || "dashboard";


const menu =

    document.querySelector(

        `.menu a[data-page="${lastPage}"]`

    );


if(menu){

    menu.click();

}

    }

);

/*======================================
HEADER STICKY
======================================*/

window.addEventListener("scroll",()=>{

    const header =
        document.querySelector(".header");

    if(!header){

        return;

    }

    if(window.scrollY > 60){

        header.classList.add("sticky");

    }

    else{

        header.classList.remove("sticky");

    }

});
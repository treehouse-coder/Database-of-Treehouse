/*======================================
MODAL
======================================*/

const Modal = {

    callback : null,

    signatureCallback : null,

    buttonConfig : {

        text : "Print PDF",

        icon : "fa-print",

        

    },

    init(){

        document
            .getElementById("modalClose")
            .addEventListener("click",()=>{

                this.hide();

            });

         document
        .getElementById("successModalClose")
        .addEventListener("click",()=>{

            this.hide();

        });
        
        document
    .getElementById("modalSignature")
    .addEventListener("click",()=>{

        if(this.signatureCallback){

            this.signatureCallback();

        }

    });

        const printButton =

            document.getElementById("modalPrint");

        if(printButton){

            printButton.addEventListener("click",async()=>{

                if(!this.callback){

                    return;

                }

                const button =

                    document.getElementById("modalPrint");

                button.disabled = true;

                button.innerHTML =

                    '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';

                try{

                    await this.callback();

                }

                finally{

                    button.disabled = false;

                    button.innerHTML =

                        `<i class="fa-solid ${this.buttonConfig.icon}"></i> ${this.buttonConfig.text}`;

                }

            });

        }
  

    },



    /*==================================
    SHOW
    ==================================*/

    show(

    title,

    html,

    callback = null,

    arg4 = null,

    arg5 = {}

){

        this.callback = callback;
let signatureCallback = null;
let options = {};

if(

    typeof arg4 === "function"

){

    signatureCallback = arg4;
    options = arg5 || {};

}else{

    options = arg4 || {};

}

this.signatureCallback = signatureCallback;


        this.buttonConfig = {

            text :

                options.buttonText ||

                "Print PDF",

            icon :

                options.buttonIcon ||

                "fa-print",

           

        };

        document
            .getElementById("modalTitle")
            .textContent = title;

        document
            .getElementById("modalBody")
            .innerHTML = html;

        
        
        const button =

            document.getElementById("modalPrint");

            const signButton =
    document.getElementById("modalSignature");

if(signButton){

    signButton.style.display =
        signatureCallback
            ? "inline-flex"
            : "none";

}

        if(button){

            button.innerHTML =

                `<i class="fa-solid ${this.buttonConfig.icon}"></i> ${this.buttonConfig.text}`;

            button.style.display =

                callback

                    ? "inline-flex"

                    : "none";

        }

        

        document
            .getElementById("tableModal")
            .classList.add("show");

    },


/*==================================
PRINT MODE
==================================*/

setPrintMode(

    callback,

    options = {}

){

    this.callback = callback;

    this.signatureCallback = null;

    this.buttonConfig = {

        text :

            options.buttonText ||

            "Print PDF",

        icon :

            options.buttonIcon ||

            "fa-print"

    };

    const signButton =

        document.getElementById("modalSignature");

    if(signButton){

        signButton.style.display = "none";

    }

    const button =

        document.getElementById("modalPrint");

    if(button){

        button.innerHTML =

            `<i class="fa-solid ${this.buttonConfig.icon}"></i> ${this.buttonConfig.text}`;

        button.style.display =

            "inline-flex";

    }

},

    /*==================================
    HIDE
    ==================================*/

    hide(){

        this.callback = null;

        this.buttonConfig = {

            text : "Print PDF",

            icon : "fa-print",


        };

        this.signatureCallback = null;

const signButton =
    document.getElementById("modalSignature");

if(signButton){

    signButton.style.display = "none";

}

        const button =

            document.getElementById("modalPrint");

        if(button){

            button.innerHTML =

                '<i class="fa-solid fa-print"></i> Print PDF';

            button.style.display = "none";

        }

        

        document
            .getElementById("tableModal")
            .classList.remove("show");

        document
            .getElementById("modalBody")
            .innerHTML = "";

    }

};
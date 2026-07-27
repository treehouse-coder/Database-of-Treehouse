const SuccessModal = {

    actions : {},
    init(){

        const close =

            document.getElementById(

                "successModalClose"

            );

        if(close){

            close.addEventListener(

                "click",

                ()=>{

                    this.hide();

                }

            );

        }

    },

    show(data){

        this.actions = {};

        (data.actions || []).forEach(action=>{

            this.actions[action.id] = action.callback;

        });

        const extraButtons =

            (data.actions || [])

            .map(action=>`

                <button
                    class="btn"
                    onclick="SuccessModal.runAction('${action.id}')">

                    <i class="${action.icon}"></i>

                    ${action.text}

                </button>

            `)

            .join("");

        const html = `

            <div class="success-icon">

                <i class="fa-solid fa-circle-check"></i>

            </div>

            <h2>${data.title}</h2>

            <p class="success-file">

                ${data.fileName}

            </p>

            <div class="success-buttons">

                ${
                    data.folderUrl

                    ?

                    `<a
                        href="${data.folderUrl}"
                        target="_blank"
                        class="btn">

                        <i class="fa-solid fa-folder-open"></i>

                        Folder

                    </a>`

                    :

                    ""

                }

                ${extraButtons}

                <button
                    class="btn"
                    onclick="SuccessModal.hide()">

                    Tutup

                </button>

            </div>

        `;

        document
            .getElementById("successModalBody")
            .innerHTML = html;

        document
            .getElementById("successModal")
            .classList.add("show");

    },


    /*======================================
SHOW PRINT
======================================*/

showPrint(data){

    this.actions = {};

    this.actions.print = data.printCallback;

    const html = `

        <div class="success-icon">

            <i class="fa-solid fa-signature"></i>

        </div>

        <h2>Tanda Tangan Berhasil</h2>

        <p class="success-file">

            Slip siap dicetak.

        </p>

        <div class="success-buttons">

            <button
                class="btn"
                onclick="SuccessModal.runAction('print')">

                <i class="fa-solid fa-print"></i>

                Print Slip

            </button>

        </div>

    `;

    document
        .getElementById("successModalBody")
        .innerHTML = html;

    document
        .getElementById("successModal")
        .classList.add("show");

},

/*======================================
SHOW PRINT
======================================*/

showPrint(data){

    this.actions = {};

    this.actions.print =

        data.printCallback;

    const html = `

        <div class="success-icon">

            <i class="fa-solid fa-signature"></i>

        </div>

        <h2>

            Tanda Tangan Berhasil

        </h2>

        <p class="success-file">

            Slip siap dicetak.

        </p>

        <div class="success-buttons">

            <button
                class="btn"
                onclick="SuccessModal.runAction('print')">

                <i class="fa-solid fa-print"></i>

                Print Slip

            </button>

        </div>

    `;

    document
        .getElementById("successModalBody")
        .innerHTML = html;

    document
        .getElementById("successModal")
        .classList.add("show");

},

/*======================================
Run action
======================================*/
    runAction(id){

        if(this.actions[id]){

            this.actions[id]();

        }

    },

    hide(){

        document
            .getElementById("successModal")
            .classList.remove("show");

    }

};
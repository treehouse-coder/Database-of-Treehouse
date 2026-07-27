/*======================================
LAPORAN MODULE
======================================*/

const Laporan = {

    init(){

        renderPage(

            this.page()

        );

        this.event();

    },

    /*==================================
    PAGE
    ==================================*/

    page(){

        return `

            <div class="page-header">

                <div>

                    <h2 class="page-title">

                        Laporan

                    </h2>

                    <p class="page-subtitle">

                        Preview dan Print Seluruh Laporan

                    </p>

                </div>

            </div>


            <div class="laporan-grid">

                ${this.card(

                    "📊",

                    "Omset",

                    "btnPreviewOmset"

                )}

                ${this.card(

                    "💰",

                    "Expense",

                    "btnPreviewExpense"

                )}

                ${this.card(

                    "🍽",

                    "Uang Makan",

                    "btnPreviewMeal"

                )}

                ${this.card(

                    "💵",

                    "Komisi",

                    "btnPreviewCommission"

                )}

                ${this.card(

                    "🧾",

                    "Gaji 15",

                    "btnPreviewSalary15"

                )}

            </div>

        `;

    },

    /*==================================
    CARD
    ==================================*/

    card(icon,title,id){

        return `

            <div class="card laporan-card">

                <div class="laporan-icon">

                    ${icon}

                </div>

                <h3>

                    ${title}

                </h3>

                <button

                    id="${id}"

                    class="btn">

                    <i class="fa-solid fa-eye"></i>

                    Preview

                </button>

            </div>

        `;

    },

    /*==================================
    EVENT
    ==================================*/

    event(){

document
.getElementById("btnPreviewOmset")
.addEventListener("click",()=>{

     Omset.preview();

});

document
.getElementById("btnPreviewExpense")
.addEventListener("click",()=>{

    Expense.preview();

});


document
.getElementById("btnPreviewMeal")
.addEventListener("click",()=>{

    HrMeal.preview();

});


document
.getElementById("btnPreviewCommission")
.addEventListener("click",()=>{

    HrCommission.previewCommission();

});


document
.getElementById("btnPreviewSalary15")
.addEventListener("click",()=>{

    HrCommission.previewSalary15();

});

},

    refresh(){}

};
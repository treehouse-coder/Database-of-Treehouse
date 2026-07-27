/*======================================
OMSET MODULE
======================================*/

const Omset = {


    /*==================================
INITIALIZE
==================================*/



init(){

    renderPage(
        this.page()
    );

    this.event();

    this.load();

},

  /*==================================
page
==================================*/
  
    page(){

        return `

            <div class="page-header">

                <div>

                    <h2 class="page-title">

                        Omset

                    </h2>

                    <p class="page-subtitle"
                       id="omset-period">

                        Ringkasan Omset

                    </p>

                </div>

            </div>


            <!-- Total Omset -->

            <div class="card omset-total-card">

                <h3>Total Omset</h3>

                <h1 id="omset-total">

                    Load

                </h1>

            </div>


            <!-- Payment -->

            <div class="omset-payment-grid">

                <div class="card payment-card">

                    <span>Cash</span>

                    <h3 id="cash-total">Load</h3>

                </div>

                <div class="card payment-card">

                    <span>QRIS</span>

                    <h3 id="qris-total">Load</h3>

                </div>

                <div class="card payment-card">

                    <span>Debit</span>

                    <h3 id="debit-total">Load</h3>

                </div>

                <div class="card payment-card">

                    <span>Credit</span>

                    <h3 id="credit-total">Load</h3>

                </div>

                <div class="card payment-card">

                    <span>Transfer</span>

                    <h3 id="transfer-total">Load</h3>

                </div>

                <div class="card payment-card">

                    <span>Giftcard</span>

                    <h3 id="giftcard-total">Load</h3>

                </div>

            
            </div>




            <!-- Grafik -->

            <div class="card">

                <div class="card-header">

                    <h3>

                        Grafik Omset Harian

                    </h3>

                </div>

                <div id="omset-chart">

                    Grafik akan ditampilkan di sini

                </div>

            </div>

        `;

    },

/*==================================
EVENT
==================================*/

event(){

    

},

/*======================================
PREVIEW
======================================*/

async preview(){

    Loading.show("Memuat Preview...");

    try{

        const result =

            await API.getOmsetTable(

                APP.filter

            );

        if(!result.success){

            alert(result.message);

            return;

        }

        Modal.show(

    "Preview Omset",

    result.html,

    async()=>{

        const result =

            APP.filter.branch=="KARAWACI"

            ?

            await API.printOmsetKarawaci()

            :

            await API.printOmsetGlaze();

        if(result.success){

            Modal.hide();

            SuccessModal.show({

                title : "PDF Berhasil Dibuat",

                fileName : result.fileName,

                folderUrl : result.folderUrl || ""

            });

        }else{

            alert(result.message);

        }

    }

);

    }

    finally{

        Loading.hide();

    }

},

  /*==================================
LOAD
==================================*/

async load(){

   

   $("#omset-total").textContent = "...";

    $("#cash-total").textContent = "...";

    $("#qris-total").textContent = "...";

    $("#debit-total").textContent = "...";

    $("#credit-total").textContent = "...";

    $("#transfer-total").textContent = "...";

    $("#giftcard-total").textContent = "...";

     this.period();

    const response =
        await API.getOmset(APP.filter);

    if(!response.success){

        console.error(response.message);

        return;

    }

    this.render(response.data);

},

    /*==================================
PERIOD
==================================*/

period(){

    const monthName =
        getMonths()[APP.filter.month - 1];

    const text =
        `${APP.filter.branch || "Semua Cabang"} - ${monthName} ${APP.filter.year}`;

    const element =
        document.getElementById("omset-period");

    if(element){

        element.textContent = text;

    }

},

/*==================================
RENDER
==================================*/

render(data){

    $("#omset-total").textContent =
        formatRupiah(data.total);

    $("#cash-total").textContent =
        formatRupiah(data.cash);

    $("#qris-total").textContent =
        formatRupiah(data.qris);

    $("#debit-total").textContent =
        formatRupiah(data.debit);

    $("#credit-total").textContent =
        formatRupiah(data.credit);

    $("#transfer-total").textContent =
        formatRupiah(data.transfer);

    $("#giftcard-total").textContent =
        formatRupiah(data.giftcard);

},


/*==================================
LOADING
==================================*/

renderLoading(){

    $("#omset-total").textContent = "load";

    $("#cash-total").textContent = "load";

    $("#qris-total").textContent = "load";

    $("#debit-total").textContent = "load";

    $("#credit-total").textContent = "load";

    $("#transfer-total").textContent = "load";

    $("#giftcard-total").textContent = "load";

},

/*==================================
REFRESH
==================================*/

refresh(){

    this.period();

    this.load();

}

};
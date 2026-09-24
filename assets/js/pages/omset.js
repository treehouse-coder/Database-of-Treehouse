/*======================================
OMSET MODULE
======================================*/

const Omset = {
chart: null,
customerChart: null,

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

                    
                    <p class="page-subtitle"
                       id="omset-period">

                        Ringkasan Omset

                    </p>

                </div>

            </div>


            <!-- Total Omset -->

<div class="omset-total-wrapper">

    <div class="card omset-total-card">

        <h3>Total Omset</h3>

        <h1 id="omset-total">

            Load

        </h1>

    </div>

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


            <!-- Grafik Jumlah Pelanggan -->

<div class="card">

    <div class="card-header">

        <h3>
            Jumlah Pelanggan Harian
        </h3>

    </div>

    <div id="customer-daily-chart">

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


    /*==================================
    GET LOCAL DATA
    ==================================*/

    let localData =
        await DataSync.getOmset();


    /*==================================
    JIKA BELUM ADA
    DOWNLOAD DARI API
    ==================================*/

    if(!localData){

        console.log(
            "OMSET LOCAL TIDAK ADA - DOWNLOAD"
        );


        try{

            await DataSync.omset();


            localData =
                await DataSync.getOmset();

        }

        catch(error){

            console.error(
                "Gagal download omset:",
                error
            );

            return;

        }

    }


    /*==================================
    DATA TIDAK DITEMUKAN
    ==================================*/

    if(!localData){

        console.error(
            "Data omset tidak tersedia."
        );

        return;

    }


    /*==================================
    RENDER LOCAL DATA
    ==================================*/

    console.log(
        "OMSET MENGGUNAKAN LOCAL DATA:",
        localData
    );


    this.render(
        localData.data
    );


    /*==================================
    CHART
    ==================================*/

    await this.loadChart();

    await this.loadCustomerChart();

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

/*======================================
LOAD CHART
======================================*/

async loadChart(){

    const result =
        await API.getOmsetDailyChart();

    console.log(
        "OMSET DAILY CHART:",
        result
    );

    if(!result.success){

        console.error(
            result.message
        );

        return;

    }

    this.renderChart(
        result.labels,
        result.values
    );

},

/*======================================
LOAD CUSTOMER DAILY CHART
======================================*/

async loadCustomerChart(){

    const result =
        await API.getCustomerDailyChart();

    console.log(
        "CUSTOMER DAILY CHART:",
        result
    );

    if(!result.success){

        console.error(
            result.message
        );

        return;

    }

    this.renderCustomerChart(
        result.labels,
        result.values
    );

},

/*======================================
RENDER CUSTOMER DAILY CHART
======================================*/

renderCustomerChart(labels, values){

    const container =
        document.getElementById(
            "customer-daily-chart"
        );

    if(!container){

        return;

    }

    /*==================================
    HAPUS CHART LAMA
    ==================================*/

    if(this.customerChart){

        this.customerChart.destroy();

        this.customerChart = null;

    }

    container.innerHTML = `

        <canvas id="customerDailyChart"></canvas>

    `;

    const canvas =
        document.getElementById(
            "customerDailyChart"
        );

    if(!canvas){

        return;

    }

    /*==================================
    BUAT CHART BARU
    ==================================*/

    this.customerChart =
        new Chart(canvas,{

            type:"line",

            data:{

                labels:labels,

                datasets:[{

                    label:"Jumlah Pelanggan",

                    data:values,

                    tension:0.3

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        });

},

/*======================================
RENDER CHART
======================================*/

renderChart(labels, values){

    const container =
        document.getElementById(
            "omset-chart"
        );

    if(!container){

        return;

    }


    /*==================================
    HAPUS CHART LAMA
    ==================================*/

    if(this.chart){

        this.chart.destroy();

        this.chart = null;

    }


    container.innerHTML = `

        <canvas id="omsetDailyChart"></canvas>

    `;


    const canvas =
        document.getElementById(
            "omsetDailyChart"
        );


    if(!canvas){

        return;

    }


    /*==================================
    BUAT CHART BARU
    ==================================*/

    this.chart = new Chart(canvas,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Omset",

                data:values,

                tension:0.3

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false

        }

    });

},

/*==================================
REFRESH
==================================*/

refresh(){

    this.period();

    this.load();

    

}

};
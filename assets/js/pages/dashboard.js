/*======================================
DASHBOARD MODULE
======================================*/

const Dashboard = {

    /*==================================
    INITIALIZE
    ==================================*/

    init(){

    renderPage(this.page());

    this.period();

    this.event();

    requestAnimationFrame(()=>{

        this.load();

    });



},

    /*==================================
    PAGE
    ==================================*/

    page(){

        return `

            <div class="page-header">

                <div>

                    <h2 class="page-title">

                        Dashboard

                    </h2>

                    <p class="page-subtitle"
                        id="dashboard-period">

                            Ringkasan data

                    </p>

                </div>

            </div>

            <div class="dashboard-summary">

                <div class="card dashboard-card">

                    <h3>Omset</h3>

                    <h2 id="dashboard-sales">Rp 0</h2>

                    <small>Belum ada data</small>

                </div>

                <div class="card dashboard-card">

                    <h3>Expense</h3>

                    <h2 id="dashboard-expense">Rp 0</h2>

                    <small>Belum ada data</small>

                </div>

                <div class="card dashboard-card">

                    <h3>Profit</h3>

                    <h2 id="dashboard-profit">Rp 0</h2>

                    <small>Belum ada data</small>

                </div>

                <div class="card dashboard-card">

                    <h3>Transaksi</h3>

                    <h2 id="dashboard-transaction">0</h2>

                    <small>Belum ada data</small>

                </div>

            </div>

            <!-- Dashboard Chart -->

            <div class="card dashboard-chart">

                <div class="card-header">

                <h3>

                Omset 7 Hari Terakhir

                </h3>

                </div>

                <div class="chart-placeholder">

                    <canvas id="dashboardChart"></canvas>

                </div>

            </div>

        `;

    },

    /*==================================
SUMMARY
==================================*/

summary(data){

    const sales =
        $("#dashboard-sales");

    const expense =
        $("#dashboard-expense");

    const profit =
        $("#dashboard-profit");

    const transaction =
        $("#dashboard-transaction");


    if(!sales){

        return;

    }


    sales.textContent =
        formatRupiah(data.sales);

    expense.textContent =
        formatRupiah(data.expense);

    profit.textContent =
        formatRupiah(data.profit);

    transaction.textContent =
        data.transaction;

},
    /*==================================
    EVENT
    ==================================*/

    event(){

    },



   /*==================================
LOAD
==================================*/

async load(){
    $("#dashboard-sales").textContent = "...";

    $("#dashboard-expense").textContent = "...";

    $("#dashboard-profit").textContent = "...";

    $("#dashboard-transaction").textContent = "...";

    const response =
        await API.getDashboard(
            APP.filter
        );


    if(!response.success){

        console.error(response.message);

        return;

    }


    this.summary({

        sales :
            response.data.sales,

        expense :
            response.data.expense || 0,

        profit :
            response.data.profit || 0,

        transaction :
            response.data.transaction || 0

    });

    await this.loadChart();

},

/*======================================
LOAD CHART
======================================*/

async loadChart(){

    const result =
        await API.getDashboardChart();

    console.log(result);

    if(!result.success){

        return;

    }

    this.renderChart(

        result.labels,

        result.values

    );


    },

/*======================================
RENDER CHART
======================================*/

renderChart(labels, values){

    const canvas =
        document.getElementById("dashboardChart");

    if(!canvas){

        return;

    }

    new Chart(canvas,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Omset",

                data:values

            }]

        }

    });

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
        document.getElementById("dashboard-period");


    if(element){

        element.textContent = text;

    }

    },

/*==================================
REFRESH
==================================*/
    
    refresh(){

    this.period();

    this.load();

}
    
    

};
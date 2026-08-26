/*======================================
DASHBOARD MODULE
======================================*/

const Dashboard = {

    /*==================================
    INITIALIZE
    ==================================*/

    chart: null,
    customerChart: null,
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

                    

                </div>

                <div class="card dashboard-card">

                    <h3>Expense</h3>

                    <h2 id="dashboard-expense">Rp 0</h2>

                    

                </div>

                <div class="card dashboard-card">

                    <h3>Profit</h3>

                    <h2 id="dashboard-profit">Rp 0</h2>

                    

                </div>

                <div class="card dashboard-card">

                    <h3>Transaksi</h3>

                    <h2 id="dashboard-transaction">0</h2>

                    

                </div>

            </div>

            <!-- Dashboard Chart -->

            <div class="card dashboard-chart">

                <div class="card-header">

                <h3>

                Summary

                </h3>

                </div>

                <div class="chart-placeholder">

                    <canvas id="dashboardChart"></canvas>

                </div>

            </div>

            <!-- Customer Chart -->

<div class="card dashboard-chart">

    <div class="card-header">

        <h3>
            Jumlah Pelanggan Setiap Bulan
        </h3>

    </div>

    <div class="chart-placeholder">

        <canvas id="customerChart"></canvas>

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
    await this.loadCustomerChart();

},

/*======================================
LOAD CHART
======================================*/

async loadChart(){

    const result =
        await API.getDashboardChart();

    

    if(!result.success){

        return;

    }

    this.renderChart(

        result.labels,

        result.values

    );


    },

    /*======================================
LOAD CUSTOMER CHART
======================================*/

async loadCustomerChart(){

    const result =
        await API.getCustomerChart();

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
RENDER CHART
======================================*/

renderChart(labels, values){

    const canvas =
        document.getElementById("dashboardChart");

    if(!canvas){

        return;

    }

    if(this.chart){

        this.chart.destroy();

        this.chart = null;

    }

    this.chart = new Chart(canvas,{

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

/*======================================
RENDER CUSTOMER CHART
======================================*/

renderCustomerChart(labels, values){

    const canvas =
        document.getElementById(
            "customerChart"
        );

    if(!canvas){

        return;

    }

    if(this.customerChart){

        this.customerChart.destroy();

        this.customerChart = null;

    }

    this.customerChart =
        new Chart(canvas,{

            type:"line",

            data:{

                labels:labels,

                datasets:[{

                    label:"Jumlah Pelanggan",

                    data:values

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                scales:{

                    y:{

                        beginAtZero:true,

                        ticks:{

                            precision:0

                        }

                    }

                }

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
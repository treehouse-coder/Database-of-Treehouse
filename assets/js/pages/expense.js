/*======================================
EXPENSE MODULE
======================================*/

const Expense = {

    /*==================================
    INITIALIZE
    ==================================*/
    init(){

    renderPage(
        this.page()
    );

    this.period();

    this.event();

    this.load();

},

    /*==================================
    PAGE
    ==================================*/

    page(){

        return `

            <div class="page-header">

                <div>

                    <h2 class="page-title">

                        Expense

                    </h2>

                    <p class="page-subtitle"
                       id="expense-period">

                        Ringkasan Expense

                    </p>

                </div>

            </div>


            <!-- Total Expense -->

            <div class="omset-total-wrapper">

    <div class="card omset-total-card">

        <h3>Total Expense</h3>

        <h1 id="expense-total">

            Load

        </h1>

    </div>

</div>


            <!-- Expense Category -->

            <div class="omset-payment-grid">

                <div class="card payment-card">

                    <span>Operasional</span>

                    <h3 id="expense-operasional">

                        Rp 0

                    </h3>

                </div>

                <div class="card payment-card">

                    <span>Gaji 15</span>

                    <h3 id="expense-gaji15">

                        Rp 0

                    </h3>

                </div>

                <div class="card payment-card">

                    <span>Gaji</span>

                    <h3 id="expense-gaji">

                        Rp 0

                    </h3>

                </div>

                

                <div class="card payment-card">

                    <span>Uang makan</span>

                    <h3 id="expense-uangmakan">

                        Rp 0

                    </h3>

                </div>

                <div class="card payment-card">

                    <span>Lainnya</span>

                    <h3 id="expense-lainnya">

                        0

                    </h3>

                </div>

                <div class="card payment-card">

                    <span>Total Item</span>

                    <h3 id="expense-item">

                        0

                    </h3>

                </div>

            </div>


            

        `;

    },


    /*==================================
RENDER TABLE
==================================*/

renderTable(data){

    const tbody =
        $("#expense-table tbody");

    if(!tbody){

        return;

    }

    if(data.length===0){

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Tidak ada data
                </td>
            </tr>
        `;

        return;

    }

    let html = "";

    data.forEach(item=>{

        html += `
            <tr>
                <td>${item.tanggal}</td>
                <td>${item.nota}</td>
                <td>${item.barang}</td>
                <td class="text-right">${item.qty}</td>
                <td class="text-right">${formatRupiah(item.harga)}</td>
                <td class="text-right">${formatRupiah(item.total)}</td>
            </tr>
        `;

    });

    tbody.innerHTML = html;

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
            await API.getExpenseTable(
                APP.filter
            );

        if(!result.success){

            alert(result.message);

            return;

        }

        Modal.show(

    "Preview Expense",

    result.html,

    async()=>{

        const result =

            APP.filter.branch=="KARAWACI"

            ?

            await API.printExpenseKarawaci()

            :

            await API.printExpenseGlaze();

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
PERIOD
==================================*/

period(){

    const monthName =
        getMonths()[APP.filter.month - 1];

    const text =
        `${APP.filter.branch || "Semua Cabang"} - ${monthName} ${APP.filter.year}`;

    const element =
        document.getElementById("expense-period");

    if(element){

        element.textContent = text;

    }

},

/*==================================
RENDER
==================================*/

render(data){

    $("#expense-total").textContent =
        formatRupiah(data.total);

    $("#expense-operasional").textContent =
        formatRupiah(data.operasional);

    $("#expense-gaji15").textContent =
        formatRupiah(data.gaji15);

    $("#expense-gaji").textContent =
        formatRupiah(data.gaji);

    $("#expense-uangmakan").textContent =
        formatRupiah(data.uangmakan);

    $("#expense-lainnya").textContent =
        formatRupiah(data.lainnya);

    $("#expense-item").textContent =
        data.totalitem;

},

/*==================================
LOAD
==================================*/

async load(){
    $("#expense-total").textContent = "...";

    $("#expense-operasional").textContent = "...";

    $("#expense-gaji15").textContent = "...";

    $("#expense-gaji").textContent = "...";

    $("#expense-uangmakan").textContent = "...";

    $("#expense-lainnya").textContent = "...";

    $("#expense-item").textContent = "...";

    this.period();

    const response =
        await API.getExpense(APP.filter);

    if(!response.success){

        console.error(response.message);

        return;

    }

    this.render(response.data);

},



    /*==================================
    REFRESH
    ==================================*/

    refresh(){

        this.period();

        this.load();

    }

};
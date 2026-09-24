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

                

                <p class="page-subtitle"
                   id="expense-period">

                    Ringkasan Expense

                </p>

            </div>

            <button
                class="primary-button expense-search-button"
                id="expense-search-button">

                Search

            </button>

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

    const button =
        $("#expense-search-button");

    if(!button){

        return;

    }

    button.addEventListener(
        "click",
        ()=>{

            this.search();

        }
    );

},


/*======================================
SEARCH
======================================*/

async search(){

    Modal.show(

        "Search Expense",

        `

        <div class="expense-search-modal">

            <div class="expense-search-form">

                <input
                    type="text"
                    id="expense-search-name"
                    class="expense-search-input"
                    placeholder="Cari nama..."
                    autocomplete="off"
                >

                <button
                    type="button"
                    id="expense-search-submit"
                    class="primary-button">

                    Search

                </button>

            </div>


            <div
                id="expense-search-result"
                class="expense-search-result">

                <div class="expense-search-empty">

                    Masukkan nama untuk mencari data.

                </div>

            </div>

        </div>

        `

    );


    const input =
        $("#expense-search-name");

    const button =
        $("#expense-search-submit");


    if(input){

        input.focus();

    }


    if(button){

        button.addEventListener(
            "click",
            ()=>{

                this.searchData();

            }
        );

    }


    if(input){

        input.addEventListener(
            "keydown",
            event=>{

                if(event.key === "Enter"){

                    event.preventDefault();

                    this.searchData();

                }

            }
        );

    }

},


/*======================================
SEARCH DATA
======================================*/

async searchData(){

    const input =
        $("#expense-search-name");

    const resultElement =
        $("#expense-search-result");


    if(!input || !resultElement){

        return;

    }


    const nama =
        input.value.trim();


    if(!nama){

        resultElement.innerHTML = `

            <div class="expense-search-empty">

                Masukkan nama yang ingin dicari.

            </div>

        `;

        input.focus();

        return;

    }


    resultElement.innerHTML = `

        <div class="expense-search-loading">

            Mencari data...

        </div>

    `;


    try{

        const response =
            await API.searchExpense(
                nama,
                APP.filter.branch
            );


        if(!response.success){

            resultElement.innerHTML = `

                <div class="expense-search-empty">

                    ${response.message || "Data tidak ditemukan."}

                </div>

            `;

            return;

        }


        this.renderSearchResult(
            response.data
        );


    }
    catch(error){

        console.error(
            "SEARCH EXPENSE ERROR:",
            error
        );


        resultElement.innerHTML = `

            <div class="expense-search-empty">

                Gagal mengambil data.

            </div>

        `;

    }

},


/*======================================
RENDER SEARCH RESULT
======================================*/

renderSearchResult(data){

    const element =
        $("#expense-search-result");


    if(!element){

        return;

    }


    if(!data || data.length === 0){

        element.innerHTML = `

            <div class="expense-search-empty">

                Data tidak ditemukan.

            </div>

        `;

        return;

    }


    let html = `

        <div class="expense-search-count">

            Ditemukan ${data.length} data

        </div>


        <div class="expense-search-table-wrapper">

            <table class="expense-search-table">

                <thead>

                    <tr>

                        <th>Nama</th>

                        <th>Qty</th>

                        <th>Harga Total</th>

                        <th>Tanggal</th>

                    </tr>

                </thead>


                <tbody>

    `;


    data.forEach(item=>{

        html += `

            <tr>

                <td>
                    ${item.nama || ""}
                </td>

                <td class="text-right">
                    ${item.qty || 0}
                </td>

                <td class="text-right">
                    ${formatRupiah(item.total || 0)}
                </td>

                <td>
                    ${item.tanggal || ""}
                </td>

            </tr>

        `;

    });


    html += `

                </tbody>

            </table>

        </div>

    `;


    element.innerHTML = html;

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

    $("#expense-lainnya").textContent = "";

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
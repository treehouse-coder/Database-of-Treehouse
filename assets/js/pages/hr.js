/*======================================
HR MANAGER MODULE
======================================*/

const Hr = {

    current : "dashboard",

    /*==================================
    INITIALIZE
    ==================================*/

    init(){

        renderPage(
            this.page(),
            "hr"
        );

        this.event();

        this.load();

    },


    /*==================================
PAGE
==================================*/

page(){

    return `

        


        <div class="hr-layout">

            <!--==================================
            SIDEBAR
            ==================================-->

            <aside class="hr-sidebar">

                <div class="hr-sidebar-title">

                    MENU

                </div>

            <div class="hr-floating-menu">

    <button class="hr-icon active"
            data-page="dashboard"
            title="Dashboard">

        <i class="fa-solid fa-house"></i>

    </button>

    <button class="hr-icon"
            data-page="employee"
            title="Staff">

        <i class="fa-solid fa-users"></i>

    </button>

    <button class="hr-icon"
            data-page="holiday"
            title="Leave">

        <i class="fa-solid fa-calendar-days"></i>

    </button>

    <button class="hr-icon"
            data-page="slip"
            title="Payroll">

        <i class="fa-solid fa-file-invoice-dollar"></i>

    </button>

    <button class="hr-icon"
            data-page="commission"
            title="Commission">

        <i class="fa-solid fa-chart-line"></i>

    </button>

</div>

            </aside>


            <!--==================================
            CONTENT
            ==================================-->

            <section class="hr-main">

                <div id="hr-content">

                </div>

            </section>

        </div>

    `;

},


    /*==================================
EVENT
==================================*/

event(){

    const tabs =

        document.querySelectorAll(".hr-icon");

    tabs.forEach(tab=>{

        tab.addEventListener("click",()=>{

            tabs.forEach(btn=>{

                btn.classList.remove("active");

            });

            tab.classList.add("active");

            this.show(

                tab.dataset.page

            );

        });

    });

},

/*==================================
    Show PAGE
    ==================================*/
show(page){

    this.current = page;

    const content =
        document.getElementById("hr-content");

    switch(page){

        case "dashboard":

            content.innerHTML = `

                <div class="card">

                    <h2>Dashboard HR</h2>

                </div>

            `;

            break;


        case "employee":

    HrEmployee.init();

    break;


        case "holiday":

            content.innerHTML = `

                <div class="card">

                    <h2>Jadwal Libur</h2>

                </div>

            `;

            break;


        case "slip":

    HrSlip.init();

break;

case "meal":

    HrMeal.init();

break;


        case "commission":

            HrCommission.init();

        break;

        }

},


    /*==================================
    LOAD
    ==================================*/

    async load(){

    this.show(this.current);

},

/*======================================
REFRESH
======================================*/

    refresh(){

    switch(this.current){

        case "slip":

            HrSlip.load();

            break;

        case "meal":

            HrMeal.refresh();

            break;

        default:

            this.load();

    }

}

};


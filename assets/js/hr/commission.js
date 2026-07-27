const HrCommission = {

    init(){

        const content =
            document.getElementById("hr-content");

        content.innerHTML =
            this.page();

        this.updatePeriod();

        this.event();

    },


    /*======================================
    PAGE
    ======================================*/

   page(){

    return `

        <div class="commission-grid">

            <!-- KOMISI -->

<div class="card commission-card">

    <div class="commission-icon">

        <i class="fa-solid fa-sack-dollar"></i>

    </div>

    <h3>Komisi</h3>

    <div class="commission-period">

        <span>Periode</span>

        <strong id="commission-period">
            -
        </strong>

    </div>



  

   

    

</div>


            <div class="card commission-card">

    <div class="commission-icon">

        <i class="fa-solid fa-money-check-dollar"></i>

    </div>

    <h3>Gaji 15</h3>

    <div class="commission-period">

        <span>Periode</span>

        <strong id="salary15-period">
            -
        </strong>

    </div>

    

    

    
    

</div>

    `;

},


/*======================================
UPDATE PERIOD
======================================*/

updatePeriod(){

    const month =
        getMonths()[APP.filter.month-1];

    const period =
        `${month} ${APP.filter.year}`;

    document.getElementById("commission-period").textContent =
        period;

    document.getElementById("salary15-period").textContent =
        period;

},

    /*======================================
    EVENT
    ======================================*/

    event(){

        
    

    },


    /*======================================
    PRINT KARAWACI
    ======================================*/

    async printKarawaci(){

        const button =
            document.getElementById(
                "btnPrintKarawaci"
            );

        button.disabled = true;

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Membuat PDF...';

        try{

            const result =
                await API.printCommissionKarawaci();

            if(result.success){

                alert(

                    "PDF berhasil dibuat\n\n" +

                    result.fileName

                );

            }else{

                alert(result.message);

            }

        }catch(error){

            console.error(error);

            alert("Gagal membuat PDF.");

        }

        button.disabled = false;

        button.innerHTML =
            '<i class="fa-solid fa-print"></i> Print Karawaci';

    },


    /*======================================
    PRINT GLAZE
    ======================================*/

    async printGlaze(){

        const button =
            document.getElementById(
                "btnPrintGlaze"
            );

        button.disabled = true;

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Membuat PDF...';

        try{

            const result =
                await API.printCommissionGlaze();

            if(result.success){

                alert(

                    "PDF berhasil dibuat\n\n" +

                    result.fileName

                );

            }else{

                alert(result.message);

            }

        }catch(error){

            console.error(error);

            alert("Gagal membuat PDF.");

        }

        button.disabled = false;

        button.innerHTML =
            '<i class="fa-solid fa-print"></i> Print Glaze';

    },

    
/*======================================
PRINT GAJI15 KARAWACI
======================================*/

async printSalary15Karawaci(){

    const button =
        document.getElementById(
            "btnPrintSalary15Karawaci"
        );

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Membuat PDF...';

    try{

        const result =
            await API.printSalary15Karawaci();

        if(result.success){

            alert(

                "PDF berhasil dibuat\n\n" +

                result.fileName

            );

        }else{

            alert(result.message);

        }

    }catch(error){

        console.error(error);

        alert("Gagal membuat PDF.");

    }

    button.disabled = false;

    button.innerHTML =
        '<i class="fa-solid fa-print"></i> Print Gaji15 Karawaci';

},

/*======================================
PRINT GAJI15 GLAZE
======================================*/

async printSalary15Glaze(){

    const button =
        document.getElementById(
            "btnPrintSalary15Glaze"
        );

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Membuat PDF...';

    try{

        const result =
            await API.printSalary15Glaze();

        if(result.success){

            alert(

                "PDF berhasil dibuat\n\n" +

                result.fileName

            );

        }else{

            alert(result.message);

        }

    }catch(error){

        console.error(error);

        alert("Gagal membuat PDF.");

    }

    button.disabled = false;

    button.innerHTML =
        '<i class="fa-solid fa-print"></i> Print Gaji15 Glaze';

},


/*======================================
PREVIEW KOMISI
======================================*/

async previewCommission(){

    Loading.show("Memuat Preview...");

    try{

       

        const result =
            await API.getCommissionTable(
                APP.filter
            );

        if(!result.success){

            alert(result.message);

            return;

        }

        const branch =
            APP.filter.branch;

        const title =

            branch=="KARAWACI"

                ? "Preview Komisi Karawaci"

                : "Preview Komisi Glaze";

        Modal.show(

    title,

    result.html,

    async()=>{

        const result =

            branch=="KARAWACI"

            ?

            await API.printCommissionKarawaci()

            :

            await API.printCommissionGlaze();

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

    }finally{

        Loading.hide();

    }

},

/*======================================
PREVIEW GAJI 15
======================================*/

async previewSalary15(){

    Loading.show("Memuat Preview...");

    try{

        

        const result =
            await API.getSalary15Table(
                APP.filter
            );

        if(!result.success){

            alert(result.message);

            return;

        }

        const branch =
            APP.filter.branch;

        const title =

            branch=="KARAWACI"

                ? "Preview Gaji 15 Karawaci"

                : "Preview Gaji 15 Glaze";

        Modal.show(

    title,

    result.html,

    async()=>{

        const result =

            branch=="KARAWACI"

            ?

            await API.printSalary15Karawaci()

            :

            await API.printSalary15Glaze();

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

    }finally{

        Loading.hide();

    }

}


};
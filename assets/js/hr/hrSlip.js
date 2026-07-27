/*======================================
HR SLIP
======================================*/

const HrSlip = {

    employees : [],

    filtered : [],

    init(){

        const content =

            document.getElementById(
                "hr-content"
            );

        content.innerHTML =

            this.page();

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

            Slip Gaji

        </h2>

        <p class="page-subtitle">

            Pilih karyawan untuk melihat slip gaji

        </p>

    </div>

</div>

<div class="card">

    <div class="table-toolbar">

        <input

            id="slipSearch"

            class="form-control"

            type="text"

            placeholder="Cari nama...">

        <select

            id="slipBranch"

            class="form-control">

            <option value="">

                Semua Cabang

            </option>

            <option value="GLAZE">

                Gading Serpong

            </option>

            <option value="KARAWACI">

                Karawaci

            </option>

        </select>

        <select

            id="slipStatus"

            class="form-control">

            <option value="">

                Semua Status

            </option>

            <option value="AKTIF">

                Aktif

            </option>

            <option value="NONAKTIF">

                Nonaktif

            </option>

        </select>

    </div>

    <div class="table-container">

        <table class="table">

            <thead>

                <tr>

                    <th>Nama</th>

                    <th>Cabang</th>

                    <th>Posisi</th>

                    <th>No HP</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody id="slipTableBody">

                <tr>

                    <td colspan="5"

                        class="text-center">

                        Memuat data...

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>

`;

},

    /*==================================
    EVENT
    ==================================*/

    event(){

        document
            .getElementById("slipSearch")
            .addEventListener("input",()=>{

                this.filter();

            });

        document
            .getElementById("slipBranch")
            .addEventListener("change",()=>{

                this.filter();

            });

        document
            .getElementById("slipStatus")
            .addEventListener("change",()=>{

                this.filter();

            });

    },

    /*==================================
    LOAD
    ==================================*/

    async load(){

        const result =

            await API.getEmployee();

        if(!result.success){

            alert(result.message);

            return;

        }

        this.employees = result.data;

        this.filtered = [...result.data];

        this.render(this.filtered);

    },

    /*==================================
    FILTER
    ==================================*/

    filter(){

        const keyword =

            document
                .getElementById("slipSearch")
                .value
                .toLowerCase()
                .trim();

        const branch =

            document
                .getElementById("slipBranch")
                .value;

        const status =

            document
                .getElementById("slipStatus")
                .value;

        this.filtered =

            this.employees.filter(row=>{

                const okName =

                    row.nama
                       .toLowerCase()
                       .includes(keyword);

                const okBranch =

                    !branch ||

                    row.cabang===branch;

                const okStatus =

                    !status ||

                    row.status===status;

                return(

                    okName &&

                    okBranch &&

                    okStatus

                );

            });

        this.render(this.filtered);

    },



    /*==================================
    RENDER
    ==================================*/

    render(data){

        const tbody =

            document.getElementById(
                "slipTableBody"
            );

        tbody.innerHTML =

            data.map(row=>`

<tr>

<td>

<span

class="employee-name"

data-id="${row.no}">

${row.nama}

</span>

</td>

<td>${row.cabang}</td>

<td>${row.posisi}</td>

<td>${row.hp}</td>

<td>${row.status}</td>

</tr>

`).join("");

        tbody
            .querySelectorAll(".employee-name")
            .forEach(item=>{

                item.addEventListener("click",()=>{

                    HrSlip.preview(

                        item.dataset.id

                    );

                });

            });

    },

    
/*==================================
PREVIEW
==================================*/

async preview(id){

    const employee =

        this.employees.find(row=>

            Number(row.no)===Number(id)

        );

    if(!employee){

        return;

    }

    Loading.show(

        "Memuat Preview..."

    );

    try{

        const result =

            await API.getSlip(

                employee.nama

            );

        if(!result.success){

            alert(result.message);

            return;

        }

        Modal.show(

            "Slip Gaji",

            result.html,

            null,

            ()=>{

                SignatureModal.show(

                    employee.nama,

                    ()=>{

                        Modal.setPrintMode(

                            async()=>{

                                Loading.show(

                                    "Membuat Slip..."

                                );

                                try{

                                    const pdf =

                                        await API.printSlip(

                                            employee.nama

                                        );

                                    if(!pdf.success){

                                        alert(pdf.message);

                                        return;

                                    }

                                    Modal.hide();

                                    SuccessModal.show({

                                        title :

                                            "Slip Gaji Berhasil Dibuat",

                                        fileName :

                                            pdf.fileName,

                                        folderUrl :

                                            pdf.folderUrl || "",

                                        actions : [

                                            {

                                                id : "wa",

                                                text : "WhatsApp",

                                                icon : "fa-brands fa-whatsapp",

                                                callback : ()=>{

                                                console.log("Nomor WA :", employee.hp);

                                        HrSlip.openWhatsapp(

                                            employee.hp,

                                            pdf.fileUrl

                                             );

                                        }

                                   }

                                        ]

                                    });

                                }

                                finally{

                                    Loading.hide();

                                }

                            },

                            {

                                buttonText : "Print Slip",

                                buttonIcon : "fa-print"

                            }

                        );

                    }

                );

            }

        );

    }

    finally{

        Loading.hide();

    }

},

/*==================================
PREVIEW
==================================*/

openWhatsapp(phone,fileUrl){

    phone = String(phone);

    phone = phone.replace(/\D/g,"");


    if(phone.startsWith("08")){

        phone =
            "62" +
            phone.substring(1);

    }


    if(phone.startsWith("8")){

        phone =
            "62" +
            phone;

    }


    const message =

        "Slip Gaji Anda sudah tersedia.\n\n" +

        fileUrl;


    window.open(

        "https://wa.me/" +

        phone +

        "?text=" +

        encodeURIComponent(message),

        "_blank"

    );

},

};
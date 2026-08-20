/*======================================
HR DASHBOARD
======================================*/

const HrDashboard = {


    /*==================================
    INIT
    ==================================*/

    init(){

        this.render();

        this.load();

    },


    /*==================================
    RENDER
    ==================================*/

    render(){

        const content =
            document.getElementById("hr-content");


        content.innerHTML = `

            <div class="hr-dashboard">


                <!--==================================
                TITLE
                ==================================-->

                <div class="hr-dashboard-header">

                    <h2>
                        Dashboard HR
                    </h2>

                </div>


                <!--==================================
                CARDS
                ==================================-->

                <div class="hr-dashboard-grid">


                    <!-- KARYAWAN AKTIF -->

                    <div class="hr-dashboard-card">

                        <div class="hr-dashboard-card-icon">

                            <i class="fa-solid fa-users"></i>

                        </div>

                        <div class="hr-dashboard-card-info">

                            <div class="hr-dashboard-card-title">

                                Karyawan Aktif

                            </div>

                            <div
                                class="hr-dashboard-card-value"
                                id="hrActiveEmployee"
                            >

                                0

                            </div>

                        </div>

                    </div>


                    <!-- KARAWACI -->

                    <div class="hr-dashboard-card">

                        <div class="hr-dashboard-card-icon">

                            <i class="fa-solid fa-user-group"></i>

                        </div>

                        <div class="hr-dashboard-card-info">

                            <div class="hr-dashboard-card-title">

                                Therapist Karawaci

                            </div>


                            <div class="hr-dashboard-gender">


                                <div>

                                    <i class="fa-solid fa-mars"></i>

                                    <span>
                                        Pria
                                    </span>

                                    <b id="hrKarawaciMale">
                                        0
                                    </b>

                                </div>


                                <div>

                                    <i class="fa-solid fa-venus"></i>

                                    <span>
                                        Wanita
                                    </span>

                                    <b id="hrKarawaciFemale">
                                        0
                                    </b>

                                </div>


                            </div>

                        </div>

                    </div>


                    <!-- GLAZE -->

                    <div class="hr-dashboard-card">

                        <div class="hr-dashboard-card-icon">

                            <i class="fa-solid fa-user-group"></i>

                        </div>

                        <div class="hr-dashboard-card-info">

                            <div class="hr-dashboard-card-title">

                                Therapist Glaze

                            </div>


                            <div class="hr-dashboard-gender">


                                <div>

                                    <i class="fa-solid fa-mars"></i>

                                    <span>
                                        Pria
                                    </span>

                                    <b id="hrGlazeMale">
                                        0
                                    </b>

                                </div>


                                <div>

                                    <i class="fa-solid fa-venus"></i>

                                    <span>
                                        Wanita
                                    </span>

                                    <b id="hrGlazeFemale">
                                        0
                                    </b>

                                </div>


                            </div>

                        </div>

                    </div>


                </div>


            </div>

        `;

    },


 /*==================================
LOAD
==================================*/

async load(){

    const response =
        await API.getHRDashboard();

    if(!response.success){

        console.error(
            response.message
        );

        return;

    }

    const data =
        response.data;


    document
        .getElementById("hrActiveEmployee")
        .textContent =
            data.activeEmployee;


    document
        .getElementById("hrKarawaciMale")
        .textContent =
            data.karawaciMale;


    document
        .getElementById("hrKarawaciFemale")
        .textContent =
            data.karawaciFemale;


    document
        .getElementById("hrGlazeMale")
        .textContent =
            data.glazeMale;


    document
        .getElementById("hrGlazeFemale")
        .textContent =
            data.glazeFemale;

}

};
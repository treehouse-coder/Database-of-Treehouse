/*======================================
HR EMPLOYEE
======================================*/

const HrEmployee = {

    currentId : null,

    employees : [],

    filtered : [],

    /*==================================
    INIT
    ==================================*/

    init(){

        const content =

            document.getElementById("hr-content");

        content.innerHTML =

            EmployeePage.render();

        EmployeeEvent.init();

        this.load();

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

        this.employees =

            result.data;

        this.filtered =

            [...result.data];

        EmployeeTableRenderer.render(

            this.filtered

        );

    },

    /*==================================
    DETAIL
    ==================================*/

    detail(id){

        const row =

            this.employees.find(employee=>

                Number(employee.no)===Number(id)

            );

        if(!row){

            return;

        }

        this.currentId = id;

        EmployeeDetail.show(row);

    },

    /*==================================
    STATUS
    ==================================*/

    statusClass(status){

        switch(

            String(status)

                .toUpperCase()

        ){

            case "AKTIF":

                return "status-active";

            case "CUTI":

                return "status-leave";

            case "NONAKTIF":

            case "RESIGN":

                return "status-inactive";

            default:

                return "";

        }

    },

    /*==================================
    REFRESH
    ==================================*/

    refresh(){

        this.load();

    }

};
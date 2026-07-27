/*======================================
EMPLOYEE EVENT
======================================*/

const EmployeeEvent = {

    init(){

        this.addButton();

        this.search();

        this.branch();

        this.status();

    },

    /*==================================
    BUTTON
    ==================================*/

    addButton(){

        const button =

            document.getElementById(

                "btnAddEmployee"

            );

        if(!button){

            return;

        }

        button.addEventListener(

            "click",

            ()=>{

                EmployeeForm.add();

            }

        );

    },

    /*==================================
    SEARCH
    ==================================*/

    search(){

        const input =

            document.getElementById(

                "employeeSearch"

            );

        if(!input){

            return;

        }

        input.addEventListener(

            "input",

            ()=>{

                EmployeeFilter.apply();

            }

        );

    },

    /*==================================
    BRANCH
    ==================================*/

    branch(){

        const branch =

            document.getElementById(

                "employeeBranch"

            );

        if(!branch){

            return;

        }

        branch.addEventListener(

            "change",

            ()=>{

                EmployeeFilter.apply();

            }

        );

    },

    /*==================================
    STATUS
    ==================================*/

    status(){

        const status =

            document.getElementById(

                "employeeStatus"

            );

        if(!status){

            return;

        }

        status.addEventListener(

            "change",

            ()=>{

                EmployeeFilter.apply();

            }

        );

    }

};
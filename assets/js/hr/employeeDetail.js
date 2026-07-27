/*======================================
EMPLOYEE DETAIL
======================================*/

const EmployeeDetail = {

    show(employee){

        EmployeeModal.show({

    title : "Detail Karyawan",

    body : EmployeeRenderer.render(employee),

    buttons : [

        {

            text : "Edit",

            icon : "fa-pen",

            action : ()=>{

                EmployeeModal.hide();

                EmployeeForm.open(employee);

            }

        },

        {

            text : "Close",

            icon : "fa-xmark",

            outline : true,

            action : ()=>{

                EmployeeModal.hide();

            }

        }

    ]

});

    }

};
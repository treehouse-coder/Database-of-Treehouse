/*======================================
EMPLOYEE FORM
======================================*/

const EmployeeForm = {

    current : null,

    /*==================================
    OPEN
    ==================================*/

    open(employee){

        this.current = { ...employee };

        EmployeeModal.show({

            title : "Edit Karyawan",

            body : this.form(employee),

            buttons : [

                {

                    text : "Simpan",

                    icon : "fa-floppy-disk",

                    action : ()=>{

                        EmployeeFormSave.save(

                            EmployeeForm.current

                        );

                    }

                },

                {

                    text : "Batal",

                    icon : "fa-xmark",

                    outline : true,

                    action : ()=>{

                        EmployeeModal.hide();

                    }

                }

            ]

        });

    },

    /*==================================
    ADD
    ==================================*/

    add(){

        this.current = null;

        EmployeeModal.show({

            title : "Tambah Karyawan",

            body : this.form({

                nama : "",

                cabang : "KARAWACI",

                posisi : "",

                gender : "P",

                alamat : "",

                ktp : "",

                tanggalMasuk : "",

                hp : "",

                status : "AKTIF"

            }),

            buttons : [

                {

                    text : "Simpan",

                    icon : "fa-floppy-disk",

                    action : ()=>{

                        EmployeeFormSave.saveNew();

                    }

                },

                {

                    text : "Batal",

                    icon : "fa-xmark",

                    outline : true,

                    action : ()=>{

                        EmployeeModal.hide();

                    }

                }

            ]

        });

    },

    /*==================================
    FORM
    ==================================*/

    form(employee){

        return EmployeeFormRenderer.render(employee);

    }

};
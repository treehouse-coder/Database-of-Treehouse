/*======================================
EMPLOYEE FORM SAVE
======================================*/

const EmployeeFormSave = {

    /*==================================
    GET DATA
    ==================================*/

    getData(includeId = false){

        const data = {

            nama : document.getElementById("empNama").value.trim(),

            cabang : document.getElementById("empCabang").value,

            posisi : document.getElementById("empPosisi").value,

            gender : document.getElementById("empGender").value,

            alamat : document.getElementById("empAlamat").value.trim(),

            ktp : document.getElementById("empKtp").value.trim(),

            tanggalMasuk : document.getElementById("empMasuk").value,

            hp : document.getElementById("empHp").value.trim(),

            status : document.getElementById("empStatus").value

        };

        if(includeId){

            data.id = EmployeeForm.current.id;

        }

        return data;

    },

    /*==================================
    VALIDATE
    ==================================*/

    validate(data){

        if(!data.nama){

            alert("Nama wajib diisi.");

            return false;

        }

        if(!data.posisi){

            alert("Posisi wajib diisi.");

            return false;

        }

        return true;

    },

    /*==================================
UPDATE
==================================*/

async save(){

    const data = this.getData(true);

    const result =

        await API.updateEmployee(data);

    if(!result.success){

        alert(result.message);

        return;

    }

    EmployeeModal.hide();

    SuccessModal.show({

        title : "Data Berhasil Disimpan",

        fileName : "Perubahan data karyawan telah disimpan."

    });

    await HrEmployee.load();

},

/*==================================
INSERT
==================================*/

async saveNew(){

    const data = this.getData(false);

    if(!this.validate(data)){

        return;

    }

    const result =

        await API.addEmployee(data);

    if(!result.success){

        alert(result.message);

        return;

    }

    EmployeeModal.hide();

    SuccessModal.show({

        title : "Karyawan Berhasil Ditambahkan",

        fileName : data.nama

    });

    await HrEmployee.load();

}

};
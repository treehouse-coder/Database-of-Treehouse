/*======================================
EMPLOYEE FORM RENDERER
======================================*/

const EmployeeFormRenderer = {

    render(employee){

        return `

<div class="employee-form">

    ${this.identity(employee)}

    ${this.employment(employee)}

    ${this.personal(employee)}

    ${this.contact(employee)}

</div>

`;

    },



    /*======================================
    IDENTITY
    ======================================*/

    identity(employee){

        return `

<div class="form-group">

    <label>Nama</label>

    <input
        id="empNama"
        class="form-control"
        value="${employee.nama || ""}">

</div>

<div class="form-group">

    <label>Jenis Kelamin</label>

    <select
        id="empGender"
        class="form-control">

        <option value="P"
            ${employee.gender==="P"?"selected":""}>

            Perempuan

        </option>

        <option value="L"
            ${employee.gender==="L"?"selected":""}>

            Laki-laki

        </option>

    </select>

</div>

<div class="form-group">

    <label>No KTP</label>

    <input
        id="empKtp"
        class="form-control"
        value="${employee.ktp || ""}">

</div>

`;

    },



    /*======================================
    EMPLOYMENT
    ======================================*/

    employment(employee){

        return `

<div class="form-group">

    <label>Cabang</label>

    <select
        id="empCabang"
        class="form-control">

        <option value="KARAWACI"
            ${employee.cabang==="KARAWACI"?"selected":""}>

            Karawaci

        </option>

        <option value="GLAZE"
            ${employee.cabang==="GLAZE"?"selected":""}>

            Gading Serpong

        </option>

    </select>

</div>

<div class="form-group">

    <label>Posisi</label>

    <select
        id="empPosisi"
        class="form-control">

        <option value="THERAPIST" ${employee.posisi==="THERAPIST"?"selected":""}>Therapist</option>

        <option value="RESEPSIONIS" ${employee.posisi==="RESEPSIONIS"?"selected":""}>Resepsionis</option>

        <option value="ADMIN" ${employee.posisi==="ADMIN"?"selected":""}>Admin</option>

        <option value="SPV" ${employee.posisi==="SPV"?"selected":""}>Supervisor</option>

        <option value="MANAGER" ${employee.posisi==="MANAGER"?"selected":""}>Manager</option>

    </select>

</div>

<div class="form-group">

    <label>Tanggal Masuk</label>

    <input
        id="empMasuk"
        class="form-control"
        type="date"
        value="${employee.tanggalMasuk || ""}">

</div>

<div class="form-group">

    <label>Status</label>

    <select
        id="empStatus"
        class="form-control">

        <option value="AKTIF"
            ${employee.status==="AKTIF"?"selected":""}>Aktif</option>

        <option value="NONAKTIF"
            ${employee.status==="NONAKTIF"?"selected":""}>Nonaktif</option>

    </select>

</div>

`;

    },



    /*======================================
    PERSONAL
    ======================================*/

    personal(employee){

        return `

<div class="form-group">

    <label>Alamat</label>

    <textarea
        id="empAlamat"
        class="form-control"
        rows="3">${employee.alamat || ""}</textarea>

</div>

`;

    },



    /*======================================
    CONTACT
    ======================================*/

    contact(employee){

        return `

<div class="form-group">

    <label>No HP</label>

    <input
        id="empHp"
        class="form-control"
        value="${employee.hp || ""}">

</div>

`;

    }

};
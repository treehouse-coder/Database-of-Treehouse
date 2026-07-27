/*======================================
EMPLOYEE RENDERER
======================================*/

const EmployeeRenderer = {

    render(row){

    return `

<div class="employee-detail">

    ${this.renderProfile(row)}

    <div class="employee-info">

        ${this.item("Cabang",row.cabang,"fa-solid fa-building")}

        ${this.item("Jenis Kelamin",row.gender,"fa-solid fa-venus-mars")}

        ${this.item("No HP",row.hp,"fa-solid fa-phone")}

        ${this.item("No KTP",row.ktp,"fa-solid fa-id-card")}

        ${this.item("Tanggal Masuk",row.tanggalMasuk,"fa-solid fa-calendar")}

        ${this.item("Alamat",row.alamat,"fa-solid fa-location-dot")}

    </div>

</div>

`;

},


/*======================================
PROFILE
======================================*/

renderProfile(row){

    return `

<div class="employee-profile">

    <div class="employee-avatar">

        <i class="fa-solid fa-user"></i>

    </div>

    <h2>${row.nama}</h2>

    <p>${row.posisi}</p>

    <span class="employee-status ${this.statusClass(row.status)}">

        ${row.status}

    </span>

</div>

`;

},


/*======================================
identity
======================================*/

renderIdentity(row){

    return `

<div class="employee-info">

    ${this.item(

        "Jenis Kelamin",

        row.gender,

        "fa-solid fa-venus-mars"

    )}

    ${this.item(

        "No KTP",

        row.ktp,

        "fa-solid fa-id-card"

    )}

</div>

`;

},

renderEmployment(row){

    return `

<div class="employee-info">

    ${this.item(

        "Cabang",

        row.cabang,

        "fa-solid fa-building"

    )}

    ${this.item(

        "Tanggal Masuk",

        row.tanggalMasuk,

        "fa-solid fa-calendar"

    )}

</div>

`;

},

renderContact(row){

    return `

<div class="employee-info">

    ${this.item(

        "No HP",

        row.hp,

        "fa-solid fa-phone"

    )}

</div>

`;

},

renderAddress(row){

    return `

<div class="employee-info">

    ${this.item(

        "Alamat",

        row.alamat,

        "fa-solid fa-location-dot"

    )}

</div>

`;

},


/*======================================
ITEM
======================================*/

item(

    label,

    value,

    icon

){

    return `

<div class="employee-item">

    <div class="employee-item-icon">

        <i class="${icon}"></i>

    </div>

    <div class="employee-item-content">

        <strong>${label}</strong>

        <span>${value || "-"}</span>

    </div>

</div>

`;

},


/*======================================
STATUS
======================================*/

statusClass(status){

    switch((status || "").toLowerCase()){

        case "aktif":

        case "active":

            return "status-active";

        case "cuti":

        case "leave":

            return "status-leave";

        default:

            return "status-inactive";

    }

}

};
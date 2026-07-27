/*======================================
EMPLOYEE PAGE
======================================*/

const EmployeePage = {

    render(){

        return `

<div class="page-header">

    <div>

        <h2 class="page-title">

            Karyawan

        </h2>

        <p class="page-subtitle">

            Kelola data seluruh karyawan

        </p>

    </div>

    <button
        id="btnAddEmployee"
        class="btn">

        <i class="fa-solid fa-plus"></i>

        Tambah

    </button>

</div>

<div class="card">

    <div class="table-toolbar">

        <input
            id="employeeSearch"
            class="form-control"
            type="text"
            placeholder="Cari nama...">

        <select
            id="employeeBranch"
            class="form-control">

            <option value="">Semua Cabang</option>

            <option value="GLAZE">
                Gading Serpong
            </option>

            <option value="KARAWACI">
                Karawaci
            </option>

        </select>

        <select
            id="employeeStatus"
            class="form-control">

            <option value="">Semua Status</option>

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

            <tbody id="employeeTableBody">

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

    }

};
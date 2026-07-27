/*======================================
EMPLOYEE TABLE RENDERER
======================================*/

const EmployeeTableRenderer = {

    render(data){

        const tbody =

            document.querySelector(

                "#employeeTableBody"

            );

        if(!tbody){

            return;

        }

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

        document

            .querySelectorAll(".employee-name")

            .forEach(item=>{

                item.addEventListener("click",()=>{

                    HrEmployee.detail(

                        Number(

                            item.dataset.id

                        )

                    );

                });

            });

    }

};
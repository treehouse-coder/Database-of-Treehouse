/*======================================
EMPLOYEE FILTER
======================================*/

const EmployeeFilter = {

    apply(){

        const keyword =

            document

                .getElementById("employeeSearch")

                .value

                .toLowerCase()

                .trim();

        const branch =

            document

                .getElementById("employeeBranch")

                .value;

        const status =

            document

                .getElementById("employeeStatus")

                .value;

        HrEmployee.filtered =

            HrEmployee.employees.filter(row=>{

                const matchName =

                    row.nama

                        .toLowerCase()

                        .includes(keyword);

                const matchBranch =

                    branch===""

                    ||

                    row.cabang===branch;

                const matchStatus =

                    status===""

                    ||

                    row.status===status;

                return (

                    matchName

                    &&

                    matchBranch

                    &&

                    matchStatus

                );

            });

        EmployeeTableRenderer.render(

            HrEmployee.filtered

        );

    }

};
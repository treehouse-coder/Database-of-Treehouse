/*======================================
TABLE COMPONENT
======================================*/

const Table = {

    render(containerId, headers, rows){

        const container =
            document.getElementById(containerId);

        if(!container){

            return;

        }

        let html = `

            <div class="table-container">

                <table class="table">

                    <thead>

                        <tr>

        `;

        headers.forEach(header=>{

            html += `<th>${header}</th>`;

        });

        html += `

                        </tr>

                    </thead>

                    <tbody>

        `;

        rows.forEach(row=>{

            html += "<tr>";

            row.forEach(col=>{

                html += `<td>${col}</td>`;

            });

            html += "</tr>";

        });

        html += `

                    </tbody>

                </table>

            </div>

        `;

        container.innerHTML = html;

    }

};
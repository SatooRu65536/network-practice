fetch("/address").then(response => {
    response.json().then((data) => {
        const tableBody = document.querySelector("#address-list > tbody");
        data.forEach(elm => {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerText = elm.first_name;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = elm.last_name;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerText = elm.email;
            tr.appendChild(td);

            tableBody.appendChild(tr);
        });
    });
});


document.getElementById('search-submit').addEventListener('click', (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("fn", document.getElementById('search-firstname').value);
    params.append("ln", document.getElementById('search-lastname').value);
    params.append("em", document.getElementById('search-email').value);

    fetch("/address?" + params).then(response => {
        response.json().then((data) => {
            const tableBody = document.querySelector("#address-list > tbody");
            const clone = tableBody.cloneNode(false);
            tableBody.remove();

            data.forEach(elm => {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerText = elm.first_name;
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerText = elm.last_name;
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerText = elm.email;
                tr.appendChild(td);

                clone.appendChild(tr);
                document.getElementById('address-list').appendChild(clone);
            });
        });
    });
});

document.getElementById('add-submit').addEventListener('click', () => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("fn", document.getElementById('search-firstname').value);
    params.append("ln", document.getElementById('search-lastname').value);
    params.append("em", document.getElementById('search-email').value);

    fetch("/address?" + params).then(response => {
        response.json().then((data) => {
            const tableBody = document.querySelector("#address-list > tbody");
            const clone = tableBody.cloneNode(false);
            tableBody.remove();

            data.forEach(elm => {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerText = elm.first_name;
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerText = elm.last_name;
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerText = elm.email;
                tr.appendChild(td);

                clone.appendChild(tr);
                document.getElementById('address-list').appendChild(clone);
            });
        });
    });
});

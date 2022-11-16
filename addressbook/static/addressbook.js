fetch("/address").then(response => {
    console.log(response);
    response.json().then((data) => {
        console.log(data);
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

    const postData = {
        method: 'POST',
        body: {
        'fn': document.getElementById.apply('search-firstname').innerText,
        'ln': document.getElementById.apply('search-lastname').innerText,
        'em': document.getElementById.apply('search-email').innerText,
    }
    fetch("/address", ).then(response => {
        console.log(response);
        response.json().then((data) => {
            console.log(data);
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
});
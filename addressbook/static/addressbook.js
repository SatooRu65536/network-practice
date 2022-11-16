fetch("/address").then(response => {
    response.json().then((data) => {
        const tableBody = document.querySelector("#address-list > tbody");
        data.body.forEach(elm => {
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


const textBoxes = [...document.getElementsByTagName('input')];
const message = document.getElementById('message');
textBoxes.forEach((textBox) => {
    textBox.addEventListener('input', () => {
        if (!message.innerText) return;
        textBoxes.forEach(tb => tb.style.backgroundColor = null);
        document.getElementById('message').innerText = '';
    });
});


const errorIndicator = (errorCode) => {
    const fn = document.getElementById('add-firstname');
    const ln = document.getElementById('add-lastname');
    const em = document.getElementById('add-email');

    switch (errorCode) {
        case 400:
            if (!fn.value) fn.style.backgroundColor = '#FF9F9F';
            if (!ln.value) ln.style.backgroundColor = '#FF9F9F';
            if (!em.value) em.style.backgroundColor = '#FF9F9F';
            break;
        case 401:
        case 450:
            em.style.backgroundColor = '#FF9F9F';
            break;
        case 451:
            break;
    }
}


const fetchData = (params) => {
    fetch("/address?" + params).then(response => {
        response.json().then((data) => {
            const tableBody = document.querySelector("#address-list > tbody");
            const clone = tableBody.cloneNode(false);
            tableBody.remove();
            data.body.forEach(elm => {
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
            });
            document.getElementById('address-list').appendChild(clone);

            message.innerText = data.status.message;
            if (data.status.isError) {
                message.style.color = 'red';
                errorIndicator(data.status.errorCode);
            } else {
                message.style.color = 'blue';
            }
        });
    });
}


document.getElementById('search-submit').addEventListener('click', (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("fn", document.getElementById('search-firstname').value);
    params.append("ln", document.getElementById('search-lastname').value);
    params.append("em", document.getElementById('search-email').value);
    params.append("mode", "search");

    fetchData(params);
});


document.getElementById('add-submit').addEventListener('click', (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("fn", document.getElementById('add-firstname').value);
    params.append("ln", document.getElementById('add-lastname').value);
    params.append("em", document.getElementById('add-email').value);
    params.append("mode", "add");

    fetchData(params);
});

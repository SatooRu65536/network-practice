console.log('JavaScript index.js fire!');


document.getElementById('btn').addEventListener('click', () => {
    fetch(`/json_sample`)
        .then(response => {
            console.log(response.status)  // => 200
            return response.json().then(data => {
                console.log(data);

                const hedding1 = document.querySelector('h1#message')
                hedding1.textContent = data.message
            });
        });
})
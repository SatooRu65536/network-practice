const key = [0, 2, 1]
let i = 0;

window.addEventListener('click', (e) => {
    const w_h = window.innerHeight;
    if (i < key.length && Math.floor(e.y / (w_h / 3)) == key[i]) {
        i++;
        if (i == key.length) {
            document.getElementById('normal').style.display = 'none';
            document.getElementById('special').style.display = 'block';
        }
    } else {
        i = 0;
    }
});
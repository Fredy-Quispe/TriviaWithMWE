function toggleResultBox(show) {
    var resultBox = document.getElementById('resultBox');
    resultBox.style.display = show ? 'block' : 'none';
}

function checkAnswer() {
    console.log('Haciendo clic en el botón');  // Agrega esta línea
    var countryInput = document.getElementById('countryInput').value;

    // Realizar una solicitud AJAX al servidor para enviar el texto
    fetch('/api/send_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input_sentence: countryInput,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Mostrar el resultado en el div resultBox
        var resultBox = document.getElementById('resultBox');
        resultBox.innerText = data.result;
        toggleResultBox(true);

        document.getElementById('countryInput').value = '';
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('resultBox').style.display = 'block';
    document.getElementById('countryInput').style.display = 'none';

    document.querySelector('.acs-btn .btn-retu').style.display = 'inline-block';
    document.querySelector('.acs-btn .btn-show').style.display = 'none';
}

function goBack() {
    document.querySelector('.acs-btn .btn-retu').style.display = 'none';
    document.querySelector('.acs-btn .btn-show').style.display = 'inline-block';

    document.getElementById('triviaForm').reset();
    document.getElementById('countryInput').style.display = 'block';
    document.getElementById('resultBox').style.display = 'none';
}


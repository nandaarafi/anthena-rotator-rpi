const getElementById = (id) => {
    return document.getElementById(id);
  }
  
  const degreeBox = getElementById("textBox"); // Use the correct id "textBox"
  const buttonTerapkan = getElementById("ButtonTerapkan"); // Use the correct id "ButtonTerapkan"
  
  
buttonTerapkan.addEventListener('click', function () {
    // Get the textbox value
    const degreeInput = degreeBox   ;
    const degree = parseFloat(degreeInput.value);

    // Check if the degree is a number and within the desired range
    if (!isNaN(degree) && degree >= 0 && degree < 360) {
        // Send the degree value to your server using a fetch request
        fetch('/terapkan', {
            method: 'POST',
            body: JSON.stringify({ degree }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.status === 200) {
                // Handle success
                console.log('Degree sent successfully.');
            } else {
                // Handle errors
                console.error('Failed to send degree.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        // Handle the case when the degree input is not valid
        console.error('Degree is not valid. It should be a number between 0 and 360.');
    }
});
  
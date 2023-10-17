const getElementById = (id) => {
    return document.getElementById(id);
  }
  
const degreeBox = getElementById("textBox"); // Use the correct id "textBox"
  // Add an event listener to the "Terapkan" button
const buttonTerapkan = getElementById("ButtonTerapkan");
const buttonStop = getElementById("ButtonStop");
const buttonleft = getElementById("leftImage");
const buttonleftstop = getElementById("ButtonStopLeft");
const buttonright = getElementById("rightImage");
const buttonrightstop = getElementById("ButtonStopRight");
const alertBox = document.getElementById('alertBox');
// Temukan elemen dengan ID "degreetext"




function showAlert(message) {
  window.alert(message);
}

function getDataDegeree() {
  fetch('/get-data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  
    var datas = data.degree;
    console.log(datas);
  var elemenH1 = document.getElementById("degreetext");
    elemenH1.innerHTML = datas + '°';
  })
        .catch((error) => {
          console.error('Error:', error);
        });

}

setInterval(getDataDegeree,1000);

buttonTerapkan.addEventListener('click', function () {
    // Get the textbox value
    const degreeInput = degreeBox;
    const degree = parseFloat(degreeInput.value);

    // Check if the degree is a number and within the desired range
    if (!isNaN(degree) && degree >= 0 && degree < 360) {
        // Send the degree value to your server using a fetch request
        fetch('/terapkan', {
            method: 'POST',
            body: JSON.stringify({degree}),
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
        // Display the alert
        // alertBox.style.display = 'block'; // Show the alert
    
        // // After a few seconds, hide the alert (adjust the timeout as needed)
        // setTimeout(() => {
        //     alertBox.style.display = 'none'; // Hide the alert
        // }, 5000); // Hide after 5 seconds (5000 milliseconds)
        showAlert("Degree is not valid")
        console.error('Degree is not valid. It should be a number between 0 and 360.');
    }
}); 
buttonStop.addEventListener('click', function () {
    // const stop = "true" 
    fetch('/stop', {
        method: 'POST',
        body: JSON.stringify({ stop: "true" }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Handle success
            console.log('stop data sent successfully.');
          } else {
            // Handle errors
            console.error('Failed to send data.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
});

buttonleft.addEventListener('click', function () {
  // const kiri = "true" 
  fetch('/left', {
      method: 'POST',
      body: JSON.stringify({ kiri: "true" }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Handle success
          console.log('stop data sent successfully.');
        } else {
          // Handle errors
          console.error('Failed to send data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});

buttonleftstop.addEventListener('click', function () {
  // const kiri = "true" 
  fetch('/leftstop', {
      method: 'POST',
      body: JSON.stringify({ kiri: "false" }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Handle success
          console.log('stop data sent successfully.');
        } else {
          // Handle errors
          console.error('Failed to send data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});



buttonright.addEventListener('click', function () {
  // const kiri = "true" 
  fetch('/right', {
      method: 'POST',
      body: JSON.stringify({ kanan: "true" }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Handle success
          console.log('kanan data sent successfully.');
        } else {
          // Handle errors
          console.error('Failed to send data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});

buttonrightstop.addEventListener('click', function () {
  // const kiri = "true" 
  fetch('/rightstop', {
      method: 'POST',
      body: JSON.stringify({ kanan: "false" }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Handle success
          console.log('stop data kanan sent successfully.');
        } else {
          // Handle errors
          console.error('Failed to send data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});



  


  

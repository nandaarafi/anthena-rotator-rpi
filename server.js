const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./rotator-antena-firebase-adminsdk-gl3ag-532f19e764.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'http://127.0.0.1:9000/?ns=rotator-antena', // Replace with your Firebase Database URL
});

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname }); // Mengirimkan file index.html saat permintaan root '/'
  });


// Define API routes and Firebase interactions here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rute untuk mengambil data dari Firebase
app.get('/get-data', (req, res) => {
  res.setHeader(  'Content-Type', 'application/json',);
  // res.setHeader('Cache-Control', 'no-cache');
  // res.setHeader('Connection', 'keep-alive');
  const db = admin.database();
  const ref = db.ref('/degree');

  ref.once("value", function(data) {
    const targetValue = data.val();
    // console.log(targetValue);
    res.status(200).json({degree : targetValue})
  });

  // Tambahkan pendengar perubahan data di Firebase
  // ref.on('value', (snapshot) => {
  //   const degreeData = snapshot.val();
    
  //   // Mengirim peristiwa SSE dengan data yang diperbarui
  //   res.write(`data: ${JSON.stringify(degreeData)}\n\n`);
  // });
});
// app.get('/get-data', (req, res) => {
//   const db = admin.database();
//   const ref = db.ref('/degree'); // Ganti dengan jalur yang Anda inginkan

//   ref.once('value', (snapshot) => {
//     const degreeData = snapshot.val();
//     res.json(degreeData); // Kirim data sebagai respons JSON
//   });
// });

app.post('/stop', (req, res) => {
    // Handle the request and update the Realtime Database with { stop: "true" }
    // You'll need to use Firebase Admin SDK to perform the database update.
    // Example:
    const db = admin.database();
    const ref = db.ref('/');
    ref.update({ stop: "true" })
      .then(() => {
        res.status(200).send('Stop signal sent');
      })
      .catch((error) => {
        res.status(500).send('Error sending stop signal');
      });
  });

// Define a route to handle form submissions
app.post('/terapkan', (req, res) => {
    // Mengambil nilai degree dari permintaan yang dikirim oleh klien
    const degree = req.body.degree;
  
    // Pastikan degree adalah angka dan berada dalam rentang yang benar
    if (typeof degree !== 'number' || degree < 0 || degree >= 360) {
      window.alert("Degree is not valid");
      res.status(400).send('Degree is not valid. It should be a number between 0 and 360.');
      return;
    }
  
    const db = admin.database();
    const ref = db.ref('/');
    const formattedDegree = `"${degree}"`;
    // Mengirim nilai degree ke Firebase Realtime Database
    ref.update({ input_degree: formattedDegree})
      .then(() => {
        res.status(200).send('Degree sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending degree:', error);
        res.status(500).send('Error sending degree.');
      });
  });
  
app.post('/left', (req, res) => {
    // Handle the request and update the Realtime Database with { stop: "true" }
    // You'll need to use Firebase Admin SDK to perform the database update.
    // Example:
    const db = admin.database();
    const ref = db.ref('/');
    ref.update({ kiri: "true" })
      .then(() => {
        res.status(200).send('kiri true signal sent');
      })
      .catch((error) => {
        res.status(500).send('Error sending kiri signal');
      });
  });
  app.post('/leftstop', (req, res) => {
    // Handle the request and update the Realtime Database with { stop: "true" }
    // You'll need to use Firebase Admin SDK to perform the database update.
    // Example:
    const db = admin.database();
    const ref = db.ref('/');
    ref.update({ kiri: "false" })
      .then(() => {
        res.status(200).send('kiri false signal sent');
      })
      .catch((error) => {
        res.status(500).send('Error sending kiri signal');
      });
  });

  app.post('/right', (req, res) => {
    // Handle the request and update the Realtime Database with { stop: "true" }
    // You'll need to use Firebase Admin SDK to perform the database update.
    // Example:
    const db = admin.database();
    const ref = db.ref('/');
    ref.update({ kanan: "true" })
      .then(() => {
        res.status(200).send('kiri true signal sent');
      })
      .catch((error) => {
        res.status(500).send('Error sending kiri signal');
      });
  });
  app.post('/rightstop', (req, res) => {
    // Handle the request and update the Realtime Database with { stop: "true" }
    // You'll need to use Firebase Admin SDK to perform the database update.
    // Example:
    const db = admin.database();
    const ref = db.ref('/');
    ref.update({ kanan: "false" })
      .then(() => {
        res.status(200).send('kiri false signal sent');
      })
      .catch((error) => {
        res.status(500).send('Error sending kiri signal');
      });
  });

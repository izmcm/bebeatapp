const functions = require('firebase-functions');
const WaveFile = require('wavefile');

let wav = new WaveFile();

exports.rawToWav = functions.https.onRequest((req, res) => {
  console.log(req.body);
  const {rawAudio} = req.body; 
  const LIMITE = 32767;
  const RANGE_ANALOG = 1024;
  audioInput = rawAudio.filter(item => item != null);
  audioInput = rawAudio.map(item => item * LIMITE/RANGE_ANALOG);
  wav.fromScratch(1, 2300, '16', audioInput);
  const buff = Buffer.from(wav.toBuffer())
  res.json(buff.toString('base64'))  
});


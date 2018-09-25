function transmitir(){

   $("#img-live").show();
   $("#body-video-conferencista iframe").remove();
   const localVideoEl = document.getElementById('local-video');

   // crea la conexión webrtc
   const webrtc = new SimpleWebRTC({
       // define el elemento donde se observa el flujo de la cámara
       localVideoEl: 'local-video',
       // URL del servidor de señalización
       url: 'http://dbaa58fc.ngrok.io',
       // solicita autorización para el uso de la cámara
       autoRequestMedia: true,
       debug: false,
       detectSpeakingEvents: true,
       autoAdjustMic: true
   });

   // Necesario si se desea procesar el flujo de video local
   webrtc.on('localStream', () => {
       console.log('local');

        });

   // Crea una nueva sala de video
   const createRoom = (roomName) => {
       console.info(`Creating new room: ${roomName}`);
       webrtc.createRoom(roomName, (err, name) => {
         console.log('Sala creada con el nombre: ' + roomName);
       });
   };

   //document.getElementById('start-bt').addEventListener('click', (event) => {
       console.log('Inicia transmisión');
       // El nombre de la sala es A1 pero puede ser cambiado
       createRoom('A1');
  // });

}
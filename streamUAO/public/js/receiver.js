function unirse() {

   const remoteVideosEl = document.getElementById('remote-video');

   // crea la conexión webrtc
   const webrtc = new SimpleWebRTC({
       // define el elemento donde se observa el flujo de la cámara remota
       remoteVideosEl: 'remote-video',
       // URL del servidor de señalización
       url: 'http://dbaa58fc.ngrok.io',
       autoRequestMedia: false,
       debug: false,
       detectSpeakingEvents: true,
       autoAdjustMic: false
   });

   webrtc.on('videoAdded', (video, peer) => {
     });

  
    // Une al cliente a una sala previamente creada
   const joinRoom = (roomName) => {
       console.log(`Uniendo al cliente a la sala: ${roomName}`);
       webrtc.joinRoom(roomName);
   };
  //document.getElementById('start-bt').addEventListener('click', (event) => {
       console.log('Iniciar recepción');
       // El nombre de la sala es A1 pero puede ser cambiado
       joinRoom('A1');
   //});

}

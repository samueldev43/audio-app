const h2 = document.querySelector('h2')
const btnRecord = document.querySelector('.record-audio')
const btnStop = document.querySelector('.record-stop')

const audioContainer = document.querySelector('.audios')

function recordAudio(){
    let mediaRecorder
    
     navigator.mediaDevices.getUserMedia({audio: true})
     .then(stream => {
         mediaRecorder = new MediaRecorder(stream)
         let add = []
         mediaRecorder.ondataavailable = data => {
             add.push(data.data)
         }

         mediaRecorder.onstop = () => {
             const blob = new Blob(add, {type: 'audio/ogg; code=opus'})
             const reader = new window.FileReader()
             reader.readAsDataURL(blob)
             reader.onloadend = () => {
                 const audio = document.createElement('audio')
                 audio.src = reader.result
                 audio.controls = true
                 audioContainer.appendChild(audio)
             }
         }

         btnRecord.addEventListener('click', function(){
             h2.innerText = 'Gravando'
             mediaRecorder.start()
         })

         btnStop.addEventListener('click', function(){
             h2.innerText = ''
             mediaRecorder.stop()
         })

     }, err => console.log(err))
 }

 recordAudio()
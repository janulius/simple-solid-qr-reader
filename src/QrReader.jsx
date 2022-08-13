import { onMount, onCleanup } from "solid-js";

let videoEl = null

function QrReader(props) {
  const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });

  const detectCode = () => {
    if (videoEl?.srcObject) {
      barcodeDetector.detect(videoEl).then(codes => {
        if (codes.length === 0) return;

        for (const barcode of codes)  {
          props.onScan(barcode)
        }
      }).catch(err => {
        // Log an error if one happens
        console.error(err);
      })
    }
  }

  onMount(() => {
    if (!('BarcodeDetector' in window)) {
       return alert('Error: Your browser doesn\'t support BarcodeDetector.')
    }

    videoEl = document.querySelector('#video')

    if (navigator.mediaDevices?.getUserMedia) {
      const constraints = {
        video: true,
        audio: false
      }

      navigator.mediaDevices.getUserMedia(constraints).then(stream => videoEl.srcObject = stream);
    }
  });

  const timer = setInterval(detectCode, 500);
  onCleanup(() => clearInterval(timer));

  return (
    <video id="video" width="640" height="480" autoplay></video>
  )
}

export default QrReader

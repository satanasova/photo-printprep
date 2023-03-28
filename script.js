const uploadContainer = document.querySelector('.upload-container'),
      uploadInputs = Array.from(document.querySelectorAll('.upload-input')),
      images = Array.from(document.querySelectorAll('.uploaded-img')),
      canvas = document.querySelector('.canvas'),
      downloadBtn = document.querySelector('.download-btn')


// upload images
uploadContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('upload-btn')) {
    const clickedUploadBtn = e.target
    const clickedUploadInput = uploadInputs.find(inp => inp.getAttribute('dataIdx') === clickedUploadBtn.getAttribute('dataIdx'));
    clickedUploadInput.click();
  } 
})

uploadInputs.forEach(inp => {
  inp.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) {
      const imageOnPos = images.find(img => img.getAttribute('dataIdx') === e.target.getAttribute('dataIdx'));
      console.log(imageOnPos);
      const objectUrl = URL.createObjectURL(file);
      imageOnPos.src = objectUrl;
    }

    setTimeout(() => {
      drawCanvas();
    }, 0)

    
  })

})


// get max width from images
function getMaxImgWidth() {
  if (images.length > 0) {
    const imagesWidths = images.map(img => img.naturalWidth)
    const largestImageWidth = Math.max(...imagesWidths)
    console.log(imagesWidths, largestImageWidth);
    return largestImageWidth
  }
}

// canvas
function drawCanvas() {
  setTimeout(() => {
    const maxImgWidth = getMaxImgWidth();
    canvas.width = maxImgWidth * 2;
    canvas.height = canvas.width * 1.5

    const ctx = canvas.getContext('2d');

    // ctx.beginPath(); 
    // // ctx.arc(images[0].width / 2,  images[0].height / 2, images[0].width / 2, 0, 2 * Math.PI); 
    // ctx.arc(canvas.width / 4,  canvas.height / 6, canvas.width / 4, 0, 2 * Math.PI); 
    // ctx.clip(); 
  

  
    // ctx.drawImage(photoToCrop, sx , sy , frame.offsetWidth / photoRatio, frame.offsetHeight / photoRatio , 0, 0, frame.offsetWidth , frame.offsetHeight)
    ctx.drawImage(images[0], 0, 0, images[0].naturalWidth, images[0].naturalHeight, canvas.width * 0.03, canvas.height * 0.02, canvas.width / 2 , canvas.height / 3);
    ctx.drawImage(images[1], 0, 0, images[1].naturalWidth, images[1].naturalHeight,  canvas.width / 2 - canvas.width * 0.03, canvas.height * 0.33, canvas.width / 2 , canvas.height / 3);
    ctx.drawImage(images[2], 0, 0, images[2].naturalWidth, images[2].naturalHeight,  canvas.width * 0.03, canvas.height * 0.66 -  canvas.height * 0.02, canvas.width / 2 , canvas.height / 3);

    console.log(canvas.width, images[2]);
  }, 1000);
   
}

drawCanvas()

// download photo
downloadBtn.addEventListener('click', () => {
  const img = canvas.toDataURL('image/jpg');
  downloadBtn.setAttribute('href', img )
})
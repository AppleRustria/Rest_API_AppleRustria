
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
const apiKey = "7eGmGpTh1geKsde79rhppWcLUwHWsLVBebwYyMtc"; 

const earthImageUrl = "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/rcam/RLB_486615482EDR_F0481570RHAZ00323M_.JPG"; // Replace with a valid Earth image URL

const imageContainer = document.getElementById("image-container");
const earthButton = document.getElementById("earth-button");
const marsButton = document.getElementById("mars-button");

// Function to display the Earth image
function displayEarthImage() {
  imageContainer.innerHTML = ""; 

  const earthImage = document.createElement("img");
  earthImage.src = earthImageUrl;
  earthImage.alt = "Earth Image";
  earthImage.style.maxWidth = "100%";
  earthImage.style.borderRadius = "10px";
  earthImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  
  imageContainer.appendChild(earthImage);
}

// Function to fetch and display Mars images
async function displayMarsImages(parameter) {
  let finalUrl;

  if (parameter === "sol") {
    finalUrl = `${baseUrl}?sol=1000&api_key=${apiKey}`; // Use sol (Martian day)
  } else if (parameter === "earth_date") {
    finalUrl = `${baseUrl}?earth_date=2015-6-3&api_key=${apiKey}`; // Use earth_date (YYYY-MM-DD format)
  } else {
    console.error("Invalid parameter");
    return;
  }

  let result = await fetch(finalUrl);
  let jsonRes = await result.json();

  if (jsonRes.photos.length === 0) {
    console.error("No photos found for", parameter);
    return;
  }

  imageContainer.innerHTML = ""; 

  // Only display the first Mars image
  let photo = jsonRes.photos[5];
  const marsImage = document.createElement("img");
  marsImage.src = photo.img_src;
  marsImage.alt = `Mars Photo by ${photo.camera.full_name}`;
  marsImage.style.maxWidth = "100%";
  marsImage.style.borderRadius = "10px";
  marsImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  
  imageContainer.appendChild(marsImage);
}

// Display Earth image initially
displayEarthImage();

// Button event listeners
earthButton.addEventListener("click", () => displayEarthImage());
marsButton.addEventListener("click", () => displayMarsImages("sol")); 
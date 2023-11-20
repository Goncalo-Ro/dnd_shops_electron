// materials.js

document.addEventListener('DOMContentLoaded', function () {
    const addMaterialButton = document.getElementById('addMaterialButton');
    const submitButton = document.getElementById('submitButton');
    const overlay = document.getElementById('overlay');
    if (addMaterialButton && submitButton && overlay) {
      addMaterialButton.addEventListener('click', toggleModal);
      submitButton.addEventListener('click', addMaterial);
      overlay.addEventListener('click', toggleModal);
    } else {
      console.error('One or more elements not found.');
    }
    fetchMaterials();
  });
  
  function fetchMaterials() {
    const { getPythonPath } = require('dnd-economy/src/pythonPath');
    const pythonPath = getPythonPath();
    const options = {
      mode: 'text',
      pythonPath: pythonPath,  // Adjust this to the path of your Python interpreter
      scriptPath: __dirname,
      args: [],  // Additional arguments if needed
    };

    PythonShell.run('dnd-economy/src/script.py', options, (err, results) => {
      if (err) throw err;
      
      const materialDict = JSON.parse(results[0]);
      console.log(materialDict);

      // Use the material dictionary to create items
      createItemsFromDictionary(materialDict);
    });
  }

  function createItemsFromDictionary(materialList) {
    const grid = document.querySelector('.grid');

    for (const [name, imagePath] of Object.entries(materialList)) {
        const newMaterial = document.createElement('div');
        newMaterial.className = 'grid-item';

        // Create an image element
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = name;
        imgElement.style.width = '100px';
        imgElement.style.height = '100px';
        newMaterial.appendChild(imgElement);

        // Create a name element
        const nameElement = document.createElement('div');
        nameElement.innerHTML = `<p class="item-name" title="${name}">${name}</p>`;
        newMaterial.appendChild(nameElement);

        grid.appendChild(newMaterial);
    }
  }

  function toggleModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
      modal.classList.toggle('active');
      overlay.classList.toggle('active');
  
      // Reset input values when closing the modal
      if (!modal.classList.contains('active')) {
        resetInputValues();
      }
    } else {
      console.error('Modal or overlay element not found.');
    }
  }
  
  function addMaterial() {
    const fnameInput = document.getElementById('fname');
    const imgInput = document.getElementById('img');
  
    // Do something with the input values, e.g., add a new material
    const grid = document.querySelector('.grid');
    const newMaterial = document.createElement('div');
    newMaterial.className = 'grid-item';
  
    // Create an image element
    const imgElement = document.createElement('img');
  
    // Check if a file is selected
    if (imgInput.files && imgInput.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        imgElement.src = e.target.result;
        imgElement.alt = fnameInput.value;
        imgElement.style.width = '100px';
        imgElement.style.height = '100px';
        newMaterial.appendChild(imgElement);
  
        // Create a name element
        const nameElement = document.createElement('div');
        nameElement.innerHTML = `<p class="item-name" title = "${fnameInput.value}">${fnameInput.value}</p>`; // Add styling with a class
        newMaterial.appendChild(nameElement);
  
        grid.appendChild(newMaterial);
  
        // Close the modal
        toggleModal();
  
        // Reset input values
        resetInputValues();
      };
  
      // Read the image file as a data URL
      reader.readAsDataURL(imgInput.files[0]);
    }
  }
  
  // Reset input values function remains the same
  
    
  
  function resetInputValues() {
    const fnameInput = document.getElementById('fname');
    const imgInput = document.getElementById('img');
  
    if (fnameInput && imgInput) {
      // Reset input values
      fnameInput.value = '';
      imgInput.value = '';
    } else {
      console.error('One or more elements not found.');
    }
  }
  
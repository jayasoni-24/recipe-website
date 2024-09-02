function saveRecipe(event) {
    event.preventDefault();
    
    const recipeName = document.getElementById('recipe-name').value;
    const recipeImage = document.getElementById('recipe-image').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    
    const recipe = {
        name: recipeName,
        image: recipeImage,
        ingredients: ingredients,
        instructions: instructions
    };
    
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    window.location.href = '2recipe.html';
}

function loadRecipes() {
    const recipeList = document.getElementById('recipe-list');
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    recipeList.innerHTML = recipes.map((recipe, index) => `
        <div class="recipe">
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <button onclick="openLightbox(${index})">View Instructions</button>
            <span class="remove" onclick="removeRecipe(${index})" style="cursor: pointer;">&times;</span> <!-- Cross icon added -->
        </div>
    `).join('');
}

function searchRecipes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) || 
        recipe.ingredients.toLowerCase().includes(searchTerm)
    );

    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = filteredRecipes.map((recipe, index) => `
        <div class="recipe">
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <button onclick="openLightbox(${index})">View Instructions</button>
            <span class="remove" onclick="removeRecipe(${index})" style="cursor: pointer;">&times;</span> <!-- Cross icon added -->
        </div>
    `).join('');
}

// Function to open the lightbox and display instructions
function openLightbox(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const lightbox = document.getElementById('lightbox');
    const instructions = recipes[index].instructions;

    document.getElementById('lightbox-instructions').textContent = instructions;
    lightbox.style.display = 'flex'; // Change 'block' to 'flex' for centering
}

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Function to remove a recipe
function removeRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1); // Remove the recipe at the specified index
    localStorage.setItem('recipes', JSON.stringify(recipes)); // Update local storage
    loadRecipes(); // Reload recipes to update the displayed list
}

// Load recipes on page load
window.onload = loadRecipes;

class UI{

     displayCategories() {
          const categoryList = cocktail.getCategories()
                .then(categories => {
                     const catList = categories.categories.drinks;

                    // Append a first option without value
                    const firstOption = document.createElement('option');
                    firstOption.textContent = '- Select -';
                    firstOption.value = '';
                    document.querySelector('#search').appendChild(firstOption);

                     // Append into the Select
                    catList.forEach(category => {
                         const option = document.createElement('option');
                         option.textContent = category.strCategory;
                         option.value = category.strCategory.split(' ').join('_');
                         document.querySelector('#search').appendChild(option);
                    })
                })
     }


    displayWithIngredient(drinks){
        const resultWrapper = document.querySelector('.results-wrapper');

        resultWrapper.style.display = "block";

        const resultDiv = document.querySelector('#results');

        drinks.forEach((drink)=>{
            resultDiv.innerHTML +=`
            <div class="col-md-6">
                         <div class="card my-3">
                              <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                              +
                              </button>
                              <img class="card-img-top" src="http://${drink.strDrinkThumb}" alt="${drink.strDrink}">

                              <div class="card-body">
                                   <h2 class="card-title text-center">${drink.strDrink}</h2>
                                   <p class="card-text font-weight-bold">Instructions: </p>
                                   <p class="card-text">
                                         ${drink.strInstructions}
                                   </p>
                                   <p class="card-text">
                                        <ul class="list-group">
                                             <li class="list-group-item alert alert-danger">Ingredients</li>
                                             ${this.displayIngredients(drink)}
                                        </ul>
                                   </p>
                                   <p class="card-text font-weight-bold">Extra Information:</p>
                                   <p class="card-text">
                                        <span class="badge badge-pill badge-success">
                                             ${drink.strAlcoholic}
                                        </span>
                                        <span class="badge badge-pill badge-warning">
                                             Category: ${drink.strCategory}
                                        </span>
                                   </p>
                              </div>
                         </div>
                    </div>
            `;
        })

    }


    displayDrinks(drinks){
     const resultsWrapper = document.querySelector('.results-wrapper');
     resultsWrapper.style.display = 'block';

     // Insert the results
     const resultsDiv = document.querySelector('#results');

     // Loop trought drinks
     drinks.forEach(drink => {
          resultsDiv.innerHTML += `
               <div class="col-md-4">
                    <div class="card my-3">
                         <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                         +
                         </button>
                         <img class="card-img-top" src="http://${drink.strDrinkThumb}" alt="${drink.strDrink}">
                         <div class="card-body">
                              <h2 class="card-title text-center">${drink.strDrink}</h2>
                              <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                         </div>
                    </div>
               </div>
          `;
     });
    }

    //prints the ingredient and measurement
     displayIngredients(drink){
          let ingredients = [];
          for(let i=1; i<16; i++){
               const ingredientMeasurement = {};
               if( drink[`strIngredient${i}`] !== ''){
                    ingredientMeasurement.ingredient = drink[`strIngredient${i}`];
                    ingredientMeasurement.measure = drink[`strMeasure${i}`];
                    ingredients.push(ingredientMeasurement);
               }
          }


          let buildIngredientTemplate = '';

          ingredients.forEach((ingredient)=>{
               buildIngredientTemplate += `
               <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}  </li>
               `;
          })
     

          return buildIngredientTemplate;
     }


     // Display single recipe
     displaySingleRecipe(recipe) {
          // Get variables
          const modalTitle = document.querySelector('.modal-title'),
                modalDescription = document.querySelector('.modal-body .description-text'),
                modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

         // Set the values
         modalTitle.innerHTML = recipe.strDrink;
         modalDescription.innerHTML = recipe.strInstructions;

         // Display the ingredients
         modalIngredients.innerHTML = this.displayIngredients(recipe);
     }





    printMessage(message, className){

        const div = document.createElement('div');

            div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">

            <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
            
            
            `;

            //insert before

            const reference =document.querySelector('.jumbotron h1');
            const parentNode =reference.parentElement;
            parentNode.insertBefore(div, reference);

            //remove after 3 seconds

          setTimeout(()=>{
            document.querySelector('.alert').remove();
           },3000);
        
    }

    clearResults(){
         const resultDiv = document.querySelector('#results');
         resultDiv.innerHTML = '';
    }
}
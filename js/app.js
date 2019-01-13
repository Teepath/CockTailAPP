 // instatiate classes

const ui = new UI();
const cocktail = new CockTails();



// create eventListener

function eventListener(){

    document.addEventListener('DOMContentLoaded', documentReady);

    const  searchForm = document.getElementById('search-form');
    
    if(searchForm){
        searchForm.addEventListener('submit', getCocktail)
    }

    //resultDiv listener

    const resultDel = document.querySelector('#results');

    if(resultDel){

    resultDel.addEventListener('click', resultDelegation);

    }
}


eventListener();




//functions


function getCocktail(e){
    e.preventDefault();

    const searchTerm = document.getElementById('search').value;

    //check if something on the saerch input
        if(search === ""){

            //call user interface print message
            ui.printMessage('Please insert something to select', "danger");

            
        }else {
            // Server response from promise

            let serverResponse;

            //Query by type i.e name, categories, ingredient

            const type = document.querySelector('#type').value;

            switch(type){
                case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
                case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient( searchTerm );
                break; 
            }


                ui.clearResults();
            
                serverResponse.then(cocktails=>{
                   if(cocktails.cocktails.drinks === null){
                        ui.printMessage('There\'re no results, please search for another drink', "danger");
                    } else {
                        if(type === 'name'){
                            // display with ingredient

                            ui.displayWithIngredient(cocktails.cocktails.drinks);
                        }else {
                            //display withou ingredients (category, alcohol, ingredients)

                            
                            ui.displayDrinks(cocktails.cocktails.drinks);
                        }
                       
                    }
            })
        
        }
    
}

//delegation

function resultDelegation(e){
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')){
        cocktail.getSingleRecipe( e.target.dataset.id)
            .then(recipe=>{
                ui.displaySingleRecipe( recipe.recipe.drinks[0] );
            })
    }
}


function documentReady() {
    // Display on load the favorites from storage
   // ui.isFavorite();

    // Select the search category select
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
         ui.displayCategories();
    }

}
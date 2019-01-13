class CockTails{

    async getDrinksByName(name){

        const urlResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        const cocktails = await urlResponse.json();


        return {
            cocktails
        }

    }


    async getDrinksByIngredient(ingredient){
        const urlResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const cocktails = await urlResponse.json();


        return {
            cocktails
        }
    }

    async getSingleRecipe(id){

        const urlResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const recipe = await urlResponse.json();


        return {
            recipe
        }

    }


    async getCategories() {
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        // Wait for response and return JSON
        const categories = await apiResponse.json();

        return {
             categories
        }
   }

}
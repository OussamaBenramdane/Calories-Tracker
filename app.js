// Storage Controller

//Item Controller

const ItemCtrl = (function(){
    const Item = function(id , name , calorries){
        this.id = id;
        this.name = name;
        this.calorries = calorries;
    }

    //Dats Structure / State
    const data = {
        items : [
            {id:0 , name:'Steak Dinner' , calories : 1200},
            {id:1 , name:'Cookies' , calories : 800},
            {id:2 , name:'Eggs' , calories : 50}

        ],
        currentItem: null,
        totalCalories : 0
    }
    //Public methodes
    return {
        logData:function(){
            return data ;
        }
    }

})();

//UI Controller
const UICtrl = (function(){
    return{
        //Public methodes
    }
})();

// App Controller
const App = (function(ItemCtrl,UICtrl){

    //Public methodes
    return{
        init : function(){
            console.log('Initialazing App')
        }
    }
})(ItemCtrl,UICtrl);

//Initialazing App
App.init();
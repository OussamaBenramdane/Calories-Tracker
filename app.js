// Storage Controller

//Item Controller

const ItemCtrl = (function(){
    const Item = function(id , name , calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Dats Structure / State
    const data = {
        items : [],
        currentItem: null,
        totalCalories : 0
    }
    //Public methodes
    return {
        getItems : function(){
            return data.items;
        }, 
        addItem: function(name , calories){
            let ID ;
            // Create ID
            if(data.items.length >0){
                ID = data.items[data.items.length -1].id + 1;
            }else{
                ID = 0
            }
            //Pars Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID , name , calories);

            // Insert item into data set

             data.items.push(newItem);

             return newItem ;

        },
        getTotalCalories:function(){
            let total = 0 ;
            //Loop through items cals
            data.items.forEach(function(item){
                total += item.calories;
            });

            // Set total to data set
            data.totalCalories = total ;

            // Return total calories
            return data.totalCalories ;

        },
        logData:function(){
            return data ;
        }
    }

})();



//UI Controller
const UICtrl = (function(){
    //Selector
    const UiSelectors={
        itemList :'#item-list',
        addBtn : '.add-btn',
        itemNameIput : '#item-name',
        itemCalorriesInput : '#item-calories',
        totalCalories : '.total-calories'
    }
    //Public methodes
    return{

        populateItemList : function(items){
            let html = '';
            items.forEach(element => {
                html += `<li class="collection-item" id="item-${element.id}">
                            <strong>${element.name} : </strong>
                            <em>${element.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>`
            });
            // Insert liste items into ul
            document.querySelector(UiSelectors.itemList).innerHTML=html;
        },
        getTemInput :function () {
           return{
               name : document.querySelector(UiSelectors.itemNameIput).value,
               calories : document.querySelector(UiSelectors.itemCalorriesInput).value
           } 
        },
        addListItem : function (item){
            //Show the list
            document.querySelector(UiSelectors.itemList).style.display='block';
            //Create li element
            const li = document.createElement('li');
            //Add class
            li.className ='collection-item';
            //Add Id
            li.id=`item-${item.id}`;
            //Add Html
            li.innerHTML = 
            `<strong>${item.name} : </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`
            //Insert item
            document.querySelector(UiSelectors.itemList).insertAdjacentElement('beforeend',li)

        },
        clearInput : function(){
            //Clearing the input
            document.querySelector(UiSelectors.itemNameIput).value = '';
            document.querySelector(UiSelectors.itemCalorriesInput).value = '';


        },
        hideList : function(){
            document.querySelector(UiSelectors.itemList).style.display = 'none';
        },
        showTotalCalories(totalCalories){
            document.querySelector(UiSelectors.totalCalories).textContent = totalCalories ;
        },
        getSelectors: function(){
            return UiSelectors;
        }

    }
})();





// App Controller
const App = (function(ItemCtrl,UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        //Get Ui Selectors
        const UISelectors = UICtrl.getSelectors();

        //Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);
    }
    //Add item submit
    const itemAddSubmit = function(e){
        // Get form iputfrom Ui controller
        const input =UICtrl.getTemInput();
        // Ceck for input
        if(input.name !=''&& input.calories!==''){
            // Add item
            const newItem = ItemCtrl.addItem(input.name , input.calories);
            //Add item to the UI
            UICtrl.addListItem(newItem);

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }
    //Public methodes

    return{
        init : function(){
            //Fetch Items from data Struct
            const items = ItemCtrl.getItems();

            //Check iff any items
            if(items.length ===0){
               UICtrl.hideList();
            }else{
            //Populate List with items
             UICtrl.populateItemList(items);
            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            }



            // Load ecentlestners
            loadEventListeners();
        }
    }
})(ItemCtrl,UICtrl);

//Initialazing App
App.init();
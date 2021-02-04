// Storage Controller
const StorageCtrl = (function(){
    // Public methods
    return{
        storeItem: function(item){
            let items;
            // Check if any items in local storage
            if(localStorage.getItem('items')===null){
                items = [];
                // Push new item
                items.push(item);
                //Set local storage
                localStorage.setItem('items' ,JSON.stringify(items));
            }else{

                // Get what is already in local storage

                 items = JSON.parse(localStorage.getItem('items'));

                 // Push new item
                 items.push(item);

                 // Reset Local storage
                 localStorage.setItem('items' ,JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items = [];
            if(localStorage.getItem('items')=== null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage:function(updatedItem){

            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item,index){
                if(updatedItem.id=== item.id){
                    items.splice(index , 1 , updatedItem);
                }

            });
            // Reset Local storage
            localStorage.setItem('items' ,JSON.stringify(items));

        },
        deleteItemFromStorage : function(id){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item,index){
                if(id=== item.id){
                    items.splice(index , 1 );
                }

            });
            // Reset Local storage
            localStorage.setItem('items' ,JSON.stringify(items));

        },
        clearItemsFromStorage : function (){

            localStorage.removeItem('items');

        }
    }
})();

//Item Controller

const ItemCtrl = (function(){
    const Item = function(id , name , calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Dats Structure / State
    const data = {
        items : StorageCtrl.getItemsFromStorage(), 
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
        getItemById: function(id){
            let found = null ;
            // Loop through
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item ;
                }
            });
            return found ;
        },
        updateItem : function (name , calories) {
            //Calorie to number
            calories = parseInt(calories);
            

            let found = null;
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){

                 item.name   = name ;
                 item.calories = calories;
                 found =item ;
                }
            });
            return found;
        },
        deleteItem: function(id){
            //Get ids
           const ids = data.items.map(function(item){
                return item.id;
            });

            // Get index
            const index = ids.indexOf(id);

            //Reamove item
            data.items.splice(index ,1);

        },
        clearAllItems:function(){
            data.items = [];
        },
        setCurrentItem:function(item){
            data.currentItem = item ;
        },
        getCurrentItem : function(){

            return data.currentItem;
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
        listItems:'#item-list  li',
        itemList :'#item-list',
        addBtn : '.add-btn',
        updateBtn : '.update-btn',
        deleteBtn : '.delete-btn',
        backBtn : '.back-btn',
        clearBtn : '.clear-btn',
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
            </a>`;
            //Insert item
            document.querySelector(UiSelectors.itemList).insertAdjacentElement('beforeend',li)

        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UiSelectors.listItems);
            //Turn Node list into array
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name} : </strong>
                    <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>` ;
                }
            });
            
        },
        deleteListItem:function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput : function(){
            //Clearing the input
            document.querySelector(UiSelectors.itemNameIput).value = '';
            document.querySelector(UiSelectors.itemCalorriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UiSelectors.itemNameIput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UiSelectors.itemCalorriesInput).value =ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems : function(){
            let listItems = document.querySelectorAll(UiSelectors.listItems);

            //Turn node liste into array
            listItems = Array.from(listItems);
            listItems.forEach(function(item){
                item.remove();
            });
        },
        hideList : function(){
            document.querySelector(UiSelectors.itemList).style.display = 'none';
        },
        showTotalCalories(totalCalories){
            document.querySelector(UiSelectors.totalCalories).textContent = totalCalories ;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UiSelectors.updateBtn).style.display = 'none';
            document.querySelector(UiSelectors.deleteBtn).style.display = 'none';
            document.querySelector(UiSelectors.backBtn).style.display = 'none';
            document.querySelector(UiSelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UiSelectors.updateBtn).style.display = 'inline';
            document.querySelector(UiSelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UiSelectors.backBtn).style.display = 'inline';
            document.querySelector(UiSelectors.addBtn).style.display = 'none';
        },
        getSelectors: function(){
            return UiSelectors;
        }

    }
})();





// App Controller
const App = (function(ItemCtrl,StorageCtrl,UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        //Get Ui Selectors
        const UISelectors = UICtrl.getSelectors();

        //Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

        // DIsable submit on enter
        document.addEventListener('keypress',function (e) {
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });

        //Edit icon click event 
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

        //Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
        //Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);
        //Delete button event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);
        //Clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick);
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

            //Store in localStorage
            StorageCtrl.storeItem(newItem);

            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }
    //Upadate item submit 
    const itemEditClick = function(e){

            if(e.target.classList.contains('edit-item')){
                // Get lidt item id 
                const listId = e.target.parentNode.parentNode.id;
                //Extract the number from the id
                const listIdArr = listId.split('-');
                //Get id
                const id = parseInt(listIdArr[1]);
                // Get item 
                const itemToEdit = ItemCtrl.getItemById(id);
                //Set current item
                ItemCtrl.setCurrentItem(itemToEdit);

                //Add item to form
                UICtrl.addItemToForm();

            }
            e.preventDefault()
    }
    const itemUpdateSubmit = function(e){
        // Get item input
        const input = UICtrl.getTemInput();
        //update item

        const updatedItem = ItemCtrl.updateItem(input.name , input.calories);

        // Update Ui 
        UICtrl.updateListItem(updatedItem);
        //Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add total calories to the UI
        UICtrl.showTotalCalories(totalCalories);
        // Update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }
    //Delete button event
        const itemDeleteSubmit = function(e){
            // Get current item
            const currentItem = ItemCtrl.getCurrentItem();
            //Delete from data structure
            ItemCtrl.deleteItem(currentItem.id);

            //Delete from the ui
            UICtrl.deleteListItem(currentItem.id);

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);
            UICtrl.clearEditState();
            //Delete from local storage
            StorageCtrl.deleteItemFromStorage(currentItem.id);
            e.preventDefault();
         }

    //Clear all button event
    const clearAllItemsClick = function(){
        //Delete all items from data structure
        ItemCtrl.clearAllItems();

         //Get total calories
         const totalCalories = ItemCtrl.getTotalCalories();
         //Add total calories to the UI
         UICtrl.showTotalCalories(totalCalories);

        //Remove from the Ui
        UICtrl.removeItems();

        //Remov frome local storage
        StorageCtrl.clearItemsFromStorage();
        //Hide ul
        UICtrl.hideList();

    }
    //Public methodes

    return{
        init : function(){
            // Clear edit state
            UICtrl.clearEditState();
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
})(ItemCtrl,StorageCtrl,UICtrl);

//Initialazing App
App.init();
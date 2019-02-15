//List Class represents a List
class List {
  constructor(title,item) {

    this.title=title;
    this.item=item;
 }
}

//UI Class Handle UITasks
class UI{

static displayLists(){
    const lists = Store.getLists();
    lists.forEach(function(item){
    UI.addItemToList(item)
  });
}

static showAlert(message,className){
  const div= document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#list-form');
  container.insertBefore(div,form);
  setTimeout(function(){
    document.querySelector('.alert').remove()
  },2000);
}

static addItemToList(item){
    const list = document.querySelector('#item-list')
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${item.title}</td>
    <td>${item.item}</td>

    <!-- <td>{book.isbn}</td> -->
    <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    `;
    list.appendChild(row);
}


 static deleteItem(elem){
   if(elem.classList.contains('delete')) {
     elem.parentElement.parentElement.remove();
   }
 }


 static clearFileds(){
   document.querySelector('#title').value="";
   document.querySelector('#item').value="";
   }
}

//Store Class Handle Storege
class Store {


  static getLists(){
     let lists;
     if(localStorage.getItem('lists') === null){
      lists=[];
     }else{
        lists=JSON.parse(localStorage.getItem('lists'));
     }
    return lists;
  }


static addList(list){
    const lists = Store.getLists();
    lists.push(list);
    localStorage.setItem('lists',JSON.stringify(lists));
  }


  static removeList(item){
     const lists = Store.getLists();
     lists.forEach((list,index) => {
       if(list.item === item){
         lists.splice(index,1);
       }
     });
     localStorage.setItem('lists',JSON.stringify(lists));
  }
}


//Event Display Lists
document.addEventListener('DOMContentLoaded', UI.displayLists);
//Event Add a item
document.querySelector('#list-form').addEventListener('submit',function(e){

  e.preventDefault();

  const title = document.querySelector('#title').value;
  const item = document.querySelector('#item').value;

  //Use an if statment to validate input
  if(title === '' || item === '' ){
    UI.showAlert('please insert something','danger')
  }else{
    const list = new List(title,item);
    UI.addItemToList(list);
    Store.addList(list);
    UI.clearFileds();
    UI.showAlert('item added','success')

  }
});



//Event remove a item from list
document.querySelector('#item-list').addEventListener('click',function(e) {
  //Remove item from UI
  UI.deleteItem(e.target);
  // Remove item from localStorage
  Store.removeList(e.target.parentElement.previousElementSibling.textContent);
  //Show a success alert when you remove item
  UI.showAlert('item deleted','success')
});

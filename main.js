let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

//get Total
function getTotal(){
    if (price.value !='') {
        let result = (+price.value +  +taxes.value +  +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else {
        total.innerHTML = '';
        total.style.background = 'rgb(183, 19, 7)';
    }
};

//create Product
let dataPro;

if(localStorage.Product !=null){
    dataPro  = JSON.parse(localStorage.Product);
}else{
    dataPro = [];
}


submit.onclick = function(){

    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    if(title.value !='' && price.value !='' && category.value !=''&& newPro.count<100){
            if (mood==='create') {
                if (newPro.count >1) {
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                    dataPro.push(newPro);
            }
        }else{
            dataPro[ tmp ] = newPro;
            mood = 'create';
            submit.innerHTML='create';
            count.style.display='block';
        }
        clearData();
    }

       
    //save localStorage
    localStorage.setItem('Product', JSON.stringify(dataPro));
    console.log(dataPro);

    showData();
}

//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read
function showData(){
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    
          </tr>
        `;
        console.log(table);  
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length>0) {
        btnDelete.innerHTML=`
        <button onclick="deleteAll()" id="delete">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML='';
    }
}
showData();

//DELETE ONE DATA
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.Product = JSON.stringify(dataPro);
    showData();

}
//deleteAll product

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update data

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display='none';
    getTotal();
    submit.innerHTML='Update';
    mood = 'update';
    tmp= i;
    scroll({
       top:0,
       behavior:'smooth' 
    })
}

// Search
let searchMood = 'title';
function getSearchMood(id){
    
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood ='title';
    }else{
        searchMood ='category';

    }
    search.placeholder='search by '+ searchMood;
    search.focus();
    search.value='';
    showData();   
}

// search data

function searchData(value){
    let table = '';

for(let i = 0; i<dataPro.length; i++){    
    if(searchMood=='title')
    {
        
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        
            </tr>
            `;
            }
        
    }else{
        
        if (dataPro[i].category.includes(value.toLowerCase()))  {
                table += `
                <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            
                </tr>
                `;
            }
        
    }
}
document.getElementById('tbody').innerHTML=table;

}



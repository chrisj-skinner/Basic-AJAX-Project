function getJSON(url) {
   // set up a new Promise
   // @resolve -> then
   // @reject  -> catch
   return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = handleResponse;
      xhr.onerror = function(error){
         reject(error); // ajaxPromise 'catch'
      };
      xhr.send();

      // handle the ajax response
      function handleResponse() {
         if (xhr.readyState === 4) {
            if (xhr.status === 200){
               let employees = JSON.parse(xhr.responseText);
               resolve(employees); // ajaxPromise 'then'
            } else {
               reject(this.statusText); // ajaxPromise 'catch'
            }
         }
      }
   });
}

// cycle through each employee and create listItems
function createListItems(employees) {
   let i,
       statusHTML = '';

   for (i = 0; i < employees.length; i++) {
      if (employees[i].inoffice === true) {
         statusHTML += '<li class="in">';
      } else {
         statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name + '</li>';
   }
   return statusHTML;
}

// wrap listItems in a UL
function createUnordedList(listItems) {
   return '<ul class="bulleted">' + listItems + '</ul>';
}

// append the UL to the dom
function appendToDom(unordedList) {
   document.getElementById('employeeList').innerHTML = unordedList;
}

const ajaxPromise = getJSON('data/employee-status.json');

ajaxPromise
   .then(createListItems)
   .then(createUnordedList)
   .then(appendToDom)
   .catch(function(error){
      console.log(error);
   });

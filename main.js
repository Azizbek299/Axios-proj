// AXIOS GLOBALS    Как установить и пользоваться с токеном
axios.defaults.headers.common['X-Auth-Token'] =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';







//  ******************  GET method




function getData() {
  // axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')  // Кискача шундай килса хам булади 5 та сахифадан дегани

  axios({
    method: "get",                                                 //   Какой метод используем  GET
    url: "https://jsonplaceholder.typicode.com/todos",             //   Откуда тянем  дату
    params: {
      _limit: 5,                                                     //    Лимит, количество даты (for pagination )
    },
  })
    //.then(res=> console.log(res))
    .then((rec) => showData(rec))
    .catch((err) => console.error(err));
}






//  ******************  POST method


function postData() {
    // axios.post("https://jsonplaceholder.typicode.com/todos", {title: 'New Post', completed: false})   //  Короткий путь для отправления даты
  
    axios({
      method: "post",                                                 //   Какой метод используем  POST
      url: "https://jsonplaceholder.typicode.com/todos",             //   Куда отправляем  дату
      data: {
        title: 'New Post',                                           //    Поля названия даты или (input)
        completed: false
    },
    })
    
      .then((rec) => showData(rec))
      .catch((err) => console.error(err));
  }


//  ******************  UPDATE  method   для каждой обновляемый даты нужен свой уникальный id

//  ****************  PUT разница с PATCH ом,  PUT которое в дата базе не заполненые поле удаляеть а PATCH которое не заполненые поля оставляет как прежнем состояний записи 

  function updateData() {
    // axios.put('https://jsonplaceholder.typicode.com/todos/1')        //  Короткий путь для обновления даты
  
    axios({
      method: "put",                                                   //   Какой метод используем  PUT
      url: "https://jsonplaceholder.typicode.com/todos/1",             //   Какой именно пост обновляем по id
      data: {
        title: 'Updated Post',                                         //    Поля названия даты или (input)
        completed: true
    },
    })
   
      .then((rec) => showData(rec))
      .catch((err) => console.error(err));
  }
  
  
  //  ******************  DELETE  method  


  function deleteData() {
    // axios.delete('https://jsonplaceholder.typicode.com/todos/1')        
    axios({
      method: "delete",                                                  
      url: "https://jsonplaceholder.typicode.com/todos/1",            
 
    })
   
      .then((rec) => showData(rec))
      .catch((err) => console.error(err));
  }



  //  ****************  Запрос в одновременно на несколька  api  ( url адреса )

  function getManyDataOneTime() {
    axios.all([                                                   //  Запросы внутры списка
      axios.get('https://jsonplaceholder.typicode.com/todos'),
      axios.get('https://jsonplaceholder.typicode.com/posts')
    ])
    .then(res => {                                //  1)  Эту функцию можно поменять на короткую функцию
      console.log(res[0])
      console.log(res[1])
      showData(res[1])
    })

    // .then(axios.spread((todos, posts) => showData(posts)))  //  2)   Это функция по корочее можно не использовать индексы а на место индекса можно пользоваться перемеными

    .catch((err) => console.error(err));
  }
  


// ************   Для манипуляции header ом   for Authorization or for login, token ....

  function customHeaders() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'sometoken'
      }
    };

  axios.post(
    'https://jsonplaceholder.typicode.com/todos',
    {
      title: 'New Todo',
      completed: false
    },
    config
  )
  .then(res => showData(res))
  .catch(err => console.error(err));

  }


  // ERROR HANDLING
function errorHandling() {
  axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
      // validateStatus: function(status) {
      //   return status < 500; // Reject only if status is greater or equal to 500
      // }
    })
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert('Error: Page Not Found');
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
}







function showData(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getData);
document.getElementById('post').addEventListener('click', postData);
document.getElementById('update').addEventListener('click', updateData);
document.getElementById('delete').addEventListener('click', deleteData);
document.getElementById('sim').addEventListener('click', getManyDataOneTime);
document.getElementById('headers').addEventListener('click', customHeaders);

document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

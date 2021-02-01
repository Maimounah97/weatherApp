// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=7269eedefa2afe75bd5b52f093e5aa35';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
  const zip =  document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getData(baseURL,zip, apiKey)
  .then(function(data){
    console.log(data);
    postData('/', {zip:data.zip , feelings:feelings});
  })
  .then(updateUI())
  
  }

  
/* Function to GET Web API Data*/
const getData = async (baseURL, zip, key)=>{
  const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),       
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};


/* updateUI */

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].feelings;

  }catch(error){
    console.log("error", error);
  }
}
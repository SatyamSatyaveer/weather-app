 
 const temperatureField=document.querySelector('.temp');
 const locationField=document.querySelector('.time_location h3');
 const dateTimeField=document.querySelector('.time_location span');
 
 
 const dayField=document.querySelector('.myday')
const conditionField=document.querySelector('.condition p');
const windField=document.querySelector('.condition1')
const searchField=document.querySelector('.search_area');
const form=document.querySelector('form')

form.addEventListener('submit', searchForLocation)
 
 
let target='lucknow'
const fetchResult= async (targetLocation)=>{
   
    let url=`http://api.weatherapi.com/v1/current.json?key=7e6fe2219c674883be980800252803&q=${targetLocation}&aqi=no`
    const res=await fetch(url);

    //now convert response into json but axios does it directly
     const data=await res.json();
    console.log(data);
    console.log(data.location.localtime);

    let locationName=data.location.name;
    console.log(locationName);
    let time=data.location.localtime;
    let temp=data.current.temp_c;
    let wind=data.current.wind_kph;
    console.log(wind);
    let condition=data.current.condition.text
   
    updateDetails(temp,locationName,time,condition,wind)

}
function updateDetails(temp,locationName,time,condition,wind){
    let splitDate = time.split(' ')[0];  
    let splitTime=time.split(' ')[1];
     // Extract YYYY-MM-DD

    // Create a Date object from the extracted date
    let formattedDate = new Date(splitDate); 

    // Get the correct day name
    let currentDay = getDayName(formattedDate.getDay());
    console.log(currentDay);
    temperatureField.innerText=`${temp}   \u00B0C` ;
    locationField.innerText=locationName;
    
    windField.innerText=wind;
    conditionField.innerText=condition;
    dateTimeField.innerText=`${splitDate}        ${splitTime} `;
    dayField.innerText=`${currentDay}`;
    
    


}

function searchForLocation(e){
    e.preventDefault();
    target=searchField.value;
    fetchResult(target)
}

fetchResult(target);
function getDayName(number){
    switch(number){
        case 0:
             return 'Sunday';
        case 1:
             return 'Monday';
        case 2:
             return 'Tuesday';
        case 3: 
        return 'Wednesday';
        case 4:
             return 'Thursday';
        case 5: 
        return 'Friday';
        case 6:
             return 'Saturday';
    }
}
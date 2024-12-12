import { validateForm } from "./validate.js";
import { v4 as uuidv4 } from 'uuid';


const formEl = document.forms["request-form"]



validateForm.onSuccess((event) => {


    
    

    

    const nameInputEl = formEl.elements[0]
    const phoneInputEl = formEl.elements[1]
    const dateInputEl = formEl.elements[2]
    const cityInputEl = formEl.elements[3]
    const addressInputEl = formEl.elements[4]

    const monthArr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthNo = Number(dateInputEl.valueAsDate.getMonth())
    const monthData = `${dateInputEl.valueAsDate.getDate()} ${monthArr[monthNo]} ${dateInputEl.valueAsDate.getFullYear()}`
    
    
    const formData = {
        id: uuidv4(),
        name: nameInputEl.value,
        phone_number: phoneInputEl.value,
        date: dateInputEl.value,
        city: cityInputEl.value,
        address: addressInputEl.value,
        month: monthData

    }



    let newElements = []

    
    const existingElements = localStorage.getItem("courierRequests")
    const existingElementsArr = JSON.parse(existingElements)

    
   

    if(existingElements){

        let existingPhoneNoArr = existingElementsArr.find( e => {
            return e.phone_number === phoneInputEl.value
        })
        if(!existingPhoneNoArr){
            
            existingElementsArr.push(formData)

            localStorage.setItem("courierRequests", JSON.stringify(existingElementsArr))
        }else{
            alert("You Have a Pending Request From this Mobile Number!")
        }
        

        
        

        

        
    }
    else{
        newElements.push(formData)

        localStorage.setItem("courierRequests", JSON.stringify(newElements))

    }


    resetFormData();   
    getAllCourierDatas();




  })


  function getAllCourierDatas(){

      
      const courierRequestArr = JSON.parse(localStorage.getItem("courierRequests"))
      
      const displaySectionEl = document.querySelector(".requests-display")
      
      const display = document.querySelector(".user-details")
      
     

        if(courierRequestArr && courierRequestArr.length > 0){

            const requestCount = document.querySelector(".requests-count")
  
            requestCount.innerText = courierRequestArr.length

            
            displaySectionEl.hidden = false

            display.innerHTML = ""

            const finalGridElArr = []
    
            courierRequestArr.map( request => {
            
        
                const newGridEl =  `<div class="grid">
                                                                
                                        <h4 class="grid-header">Customer</h4>
                                        <h4 class="grid-header">Pickup Date</h4>
                                        <h4 class="grid-header">Mobile</h4>
                                        <h4 class="grid-header">Address</h4>
                                        <h4 class="grid-header">Actions</h4>
                                        
                                        <div class="grid-content">${request.name}</div>
                                        <div class="grid-content">${request.month}</div>
                                        <div class="grid-content" id="mobile">${request.phone_number}</div>
                                        <div class="grid-content request-address">${request.address}</div>
                                        <div class="grid-content grid-buttons">
                                            <button class="edit-btn">Edit<i class="fa-solid fa-pen-to-square" style="color: #fff;"></i></button>
                                            <button class="delete-btn">Delete</button>
                                        </div>
                                                                
                                    </div>`
        
                finalGridElArr.push(newGridEl)


               

                                        
            
            
            })
            finalGridElArr.forEach( el => {
                display.innerHTML += el
            })

            const deleteBtns = document.querySelectorAll(".delete-btn")


            deleteBtns.forEach( btn => {
                
                btn.addEventListener("click", deleteRequest)
                
            })
            

        }else{
            displaySectionEl.hidden = true
            
        }

  }

  function resetFormData(){
    
    const formElementsArr = [...formEl.elements]
    formElementsArr.forEach( element => {
        if(element.tagName !== "BUTTON"){
            element.value = ""
        }
        
    })  
  }

  function deleteRequest(event){
    const mobileNumber = event.target.parentElement.previousElementSibling.previousElementSibling.innerText
    
    const localStorageArr = JSON.parse(localStorage.getItem("courierRequests"))
    const updatedLocalStorageArr = []
    const comfirmMsg = confirm("Do you want to Delete this Request?")

    if(comfirmMsg){
        localStorageArr.forEach( request => {
        
            if(mobileNumber !== request.phone_number){
                updatedLocalStorageArr.push(request)
            }
            
            
        })
        localStorage.setItem("courierRequests", JSON.stringify(updatedLocalStorageArr))
    }

    getAllCourierDatas();

    
    
  }




  getAllCourierDatas();


  














  








    
    

    
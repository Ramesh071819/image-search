var apikey="563492ad6f917000010000014b0881014f2b40a790c7d80d0aee28f3"

var input=document.querySelector("input");
                                                                   // HTML ELEMENTS 1-7
var button=document.querySelector("#click");

var showMore=document.querySelector(".show_more");

let pageNumber=1;
let searchText="";                        // VARIABLES 9-11
let search=false;


input.addEventListener("input", function(event){
    event.preventDefault();                               //PAGE RELOAD
    searchText=event.target.value;                //CAPTURE THE VALUE INPUT GIVEN
})

button.addEventListener("click", function(event){         //CLICK FUNCTION
    if(input.value==""){
        alert("please enter some text")             //INPUT NOT GIVEN 
        return;
    }
    clearGallery();
    search=true;
    searchPhotos(searchText,pageNumber)            // PAGE NUMBER IS URL PARAMETER
})

//defining clearGallery function for initializing again

function clearGallery(){
    document.querySelector(".display-images").innerHTML="";
    pageNumber=1;
}

//fetching images using API
 async function CuratedPhotos(pageNumber){                      //FOR EXTERNAL API USING ASYNC
  const data= await fetch(`https://api.pexels.com/v1/curated?page=1(pageNumber)`,{
      method:"GET",
      headers:{
          "Accept":"application/json",
          "Authorization":apikey
      }
  })
  const response = await data.json()             // COMPATABLE WITH ALL DEVICES KEY AND VALUE BASE  FOR JSON

  displayImages(response)
}

function displayImages(response){         //RENDERING THE DATA USING FUNCTION
    response.photos.forEach((image) =>{                    //LOOPING FOR USING FOR EACH 
        const photo = document.createElement("div");
       photo.innerHTML=`<img src=${image.src.large}>            
       <figcaption>Photo by: ${image.photographer}</
       figcaption>`
       document.querySelector(".display-images").appendChild(photo)

    })
 }
 CuratedPhotos(pageNumber)

//
async function searchPhotos(query,pageNumber){
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${pageNumber}`,{
    method:"GET",
    headers:{
    'Accept':"application/json",
    "Authorization":apikey
    }
})
const response=await data.json()
displayImages(response);
}


//show more images function
showMore.addEventListener("click", function() {
    if(!search){
        pageNumber++
        CuratedPhotos(pageNumber)
    }
    else{
        if(searchText.value === ""){
            pageNumber++;
            searchPhotos(searchText,pageNumber)
            return;
        }
    }
})

CuratedPhotos(pageNumber)
console.log("Frontend Javascript is linked!");

// ==============================================
// Start of database tools
// ==============================================

$(document).ready(function() {


    // Get Mongo config info
    let url;
    $.ajax({
        url: "config.json",
        type: "GET",
        dataType: "json",
        success: function(configData) {
            url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
            console.log(url);

            // display products

            $.ajax({
                url: `http://${url}/allProjects`,
                type: "GET",
                dataType: "json",
                success: function(projectsFromDB) {
                    console.log(projectsFromDB);
                    document.getElementById("resultsOne").innerHTML = "";
                    document.getElementById("resultsTwo").innerHTML = "";
                    document.getElementById("resultsThree").innerHTML = "";

                    function resultPage(array) {

                        // randomise order
                        for (let h = array.length - 1; h > 0; h--) {
                            const j = Math.floor(Math.random() * (h + 1));
                            [array[h], array[j]] = [array[j], array[h]];
                        }

                        console.log(array);
                        // end of randomise order

                        // split array / js media queries
                        let mobile = window.matchMedia("(max-width: 600px)");
                        let tablet = window.matchMedia("(min-width: 601px) and (max-width: 1023px)");
                        let desktop = window.matchMedia("(min-width: 1024px)");

                        function splitArray(x, y, z) {
                            if (x.matches) {
                                const threePartIndex = Math.ceil(array.length / 3);

                                const thirdPart = array.splice(-threePartIndex);
                                const secondPart = array.splice(-threePartIndex);
                                const firstPart = array;

                                // end of split array

                                for (let i = 0; i < firstPart.length; i++) {
                                    document.getElementById("resultsOne").innerHTML += `
            
                                <div class="card">
                                        <img class="card-img-top" src="${firstPart[i].img_url}" alt="Project Image">
                                        <div class="card-body-container">
                                        <div class="card-body">
                                            <h5 class="card-title">${firstPart[i].project_name}</h5>
                                            <h6 class="card-subtitle">${firstPart[i].author}</h6>     
                                        </div>              
                                        <button type="button" class="btn modal-btn" value="${firstPart[i]._id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>  
                                        </div>
                                </div>
            
                                `
                                }

                                for (let i = 0; i < secondPart.length; i++) {
                                    document.getElementById("resultsTwo").innerHTML += `
            
                                <div class="card">
                                        <img class="card-img-top" src="${secondPart[i].img_url}" alt="Project Image">
                                        <div class="card-body-container">
                                        <div class="card-body">
                                            <h5 class="card-title">${secondPart[i].project_name}</h5>
                                            <h6 class="card-subtitle">${secondPart[i].author}</h6>     
                                        </div>      
                                        <button type="button" class="btn modal-btn" value="${secondPart[i]._id}" id="modalBtn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>   
                                        </div>                         
                                </div>
            
                                `
                                }

                                for (let i = 0; i < thirdPart.length; i++) {
                                    document.getElementById("resultsThree").innerHTML += `
            
                                <div class="card">
                                        <img class="card-img-top" src="${thirdPart[i].img_url}" alt="Project Image">
                                        <div class="card-body-container">
                                            <div class="card-body">
                                                <h5 class="card-title">${thirdPart[i].project_name}</h5>
                                                <h6 class="card-subtitle">${thirdPart[i].author}</h6>     
                                            </div>  
                                            <button type="button" class="btn modal-btn" value="${thirdPart[i]._id}" id="modalBtn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>
                                        </div>
                                </div>
            
                                `
                                }

                            } else if (y.matches) {
                                const twoPartIndex = Math.ceil(array.length / 2);

                                const secondPart = array.splice(-twoPartIndex);
                                const firstPart = array;

                                for (let i = 0; i < firstPart.length; i++) {
                                    document.getElementById("resultsOne").innerHTML += `
            
                                    <div class="card data-bs-toggle="modal" data-bs-target="#exampleModal"">
                                            <img class="card-img-top" src="${firstPart[i].img_url}" alt="Project Image">
                                            <div class="card-body-container">
                                            <div class="card-body">
                                                <h5 class="card-title">${firstPart[i].project_name}</h5>
                                                <h6 class="card-subtitle">${firstPart[i].author}</h6>     
                                            </div>              
                                            <button type="button" class="btn modal-btn" value="${firstPart[i]._id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>  
                                            </div>  
                                    </div>
                
                                    `
                                }

                                for (let i = 0; i < secondPart.length; i++) {
                                    document.getElementById("resultsTwo").innerHTML += `
            
                                    <div class="card">
                                            <img class="card-img-top" src="${secondPart[i].img_url}" alt="Project Image">
                                            <div class="card-body-container">
                                            <div class="card-body">
                                                <h5 class="card-title">${secondPart[i].project_name}</h5>
                                                <h6 class="card-subtitle">${secondPart[i].author}</h6>     
                                            </div>      
                                            <button type="button" class="btn modal-btn" value="${secondPart[i]._id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>   
                                            </div>                         
                                    </div>
                
                                    `
                                }
                            } else if(z.matches){
                                for (let i = 0; i < array.length; i++) {
                                    document.getElementById("resultsOne").innerHTML += `
            
                                    <div class="card">
                                            <img class="card-img-top" src="${array[i].img_url}" alt="Project Image">
                                            <div class="card-body-container">
                                            <div class="card-body">
                                                <h5 class="card-title">${array[i].project_name}</h5>
                                                <h6 class="card-subtitle">${array[i].author}</h6>     
                                            </div>              
                                            <button type="button" class="btn modal-btn" value="${thirdPart[i]._id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long"></i></button>  
                                            </div>  
                                    </div>
                
                                    `
                                }
                            }

                        }

                        splitArray(desktop, tablet)
                        desktop.addListener(splitArray)
                        tablet.addListener(splitArray)
                        mobile.addListener(splitArray)


                        // end of js media queries / split array
                    }

                    resultPage(projectsFromDB) //run result page function with data from DB
                    
                        // modal click function
                        $(".modal-btn").on("click", function() {
                            let selectedProject = $(this).attr("value");
                            $.ajax({
                                type: "GET",
                                url: `http://${url}/allProjects`,
                                dataType: "json",
                                success: function(data) {
                                    for (let i = 0; i < data.length; i++) {
                                        if (data[i]._id === selectedProject) {
                                            $(".modal").html(`        
                                            <div class="modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content info-container">
                                                    <div class="heading-container justify-content-between align-items-center d-flex p-5">
                                                        <div class="heading">
                                                            <h1>${data[i].project_name}</h1>
                                                        </div>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body info-body px-5">
                                                        <div class="info-left">
                                                            <p>${data[i].project_description}</p>
                                                            <br>
                                                            <p>
                                                                <strong>${data[i].author}</strong><br>
                                                                <a href="${data[i].project_url}">See more</a>
                                                            </p>
                                                        </div>
                                                        <div class="info-right px-2">
                                                            <img src="${data[i].img_url}" class="info-img">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            `);
                                        }
                                    }
                                }
                            })
                            $(".modal").addClass("show");
                        })
                        // end of modal click function
                    
                },
                error: function() {
                    alert("unable to get projects")
                }
            })

            // end of display projects
        },
        error: function(error) {
            console.log(error);
        }
    })




    // Add a new project
    $(".addProjectBtn").click(function() {
        event.preventDefault();
        let projectTitle = $("#projectTitle").val();
        let projectDescription = $("#projectDescription").val();
        let imageUrl = $("#imageUrl").val();
        let authorName = $("#authorName").val();
        let projectUrl = $("#projectLink").val();
        console.log(projectTitle, projectDescription, imageUrl, authorName, projectUrl);
        if (projectTitle === "" || projectDescription === "" || imageUrl === "" || authorName === "" || projectUrl === "") {
            $(".add-project-form").append(`
            <div id="#newProjectWarning" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                <strong>Woah there!</strong> Please fill in every field above before submitting.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `)
        } else {
            $.ajax({
                url: `http://${url}/addProject`,
                type: "POST",
                data: {
                    project_name: projectTitle,
                    project_description: projectDescription,
                    author: authorName,
                    img_url: imageUrl,
                    project_url: projectUrl
                },
                success: function(project) {
                    console.log(project);
                    $("#projectTitle").val("");
                    $("#projectDescription").val("");
                    $("#imageUrl").val("");
                    $("#authorName").val("");
                    $("#projectLink").val("");
                    $(".add-project-form").append(`
                    <div id="#newProjectSuccess" class="alert alert-success alert-dismissible fade show mt-4" role="alert">
                        <strong>Nice!</strong> A new project has been submitted successfully.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    `)
                },
                error: function() {
                    console.log("Can't call API");
                    $(".add-project-form").append(`
                    <div id="#newProjectWarning" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                        Hmm... Can't seem to call the API right now.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    `)
                }
            }) // end of ajax
        } // end of if
    })
    // end of add new project

    // Update a project
    $(".updateProjectBtn").click(function() {
        event.preventDefault();
        let projectId = $("#projectID").val();
        let projectTitle = $("#newProjectTitle").val();
        let projectDescription = $("#newProjectDescription").val();
        let imageUrl = $("#newImageUrl").val();
        let authorName = $("#newAuthorName").val();
        let projectUrl = $("#newProjectLink").val();
        console.log(projectId, projectTitle, projectDescription, imageUrl, authorName, projectUrl);
        if (projectId === "") {
            $(".update-project-form").append(`
            <div id="#updateProjectWarning" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                <strong>Woops!</strong> Please provide a project ID to update first.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `)
        } else {
            $.ajax({
                url: `http://${url}/updateProject/${projectId}`,
                type: "PATCH",
                data: {
                    project_name: projectTitle,
                    project_description: projectDescription,
                    author: authorName,
                    img_url: imageUrl,
                    project_url: projectUrl
                },
                success: function(data) {
                    console.log(data);
                    $("#projectID").val("");
                    $("#newProjectTitle").val("");
                    $("#newProjectDescription").val("");
                    $("#newImageUrl").val("");
                    $("#newAuthorName").val("");
                    $("#newProjectLink").val("");
                    $(".update-project-form").append(`
                    <div id="#updateProjectSuccess" class="alert alert-success alert-dismissible fade show mt-4" role="alert">
                        <strong>Yay!</strong> Project has been updated successfully.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    `)
                },
                error: function() {
                    console.log("Cannot update project");
                    $(".update-project-form").append(`
                    <div id="#updateProjectWarning" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                        Dang! Can't update the project. Make sure you've provided an existing ID.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    `)
                }
            }) // end of ajax
        } // end of if
    })
    // end of update project

    // Delete a project
    $(".deleteProjectBtn").click(function() {
        event.preventDefault();
        let projectId = $("#deleteProjectId").val();
        console.log(projectId);
        if (projectId === "") {
            $(".delete-project-form").append(`
            <div id="#deleteProjectWarning" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                <strong>Error!</strong> Please provide a project ID to delete first.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `)
        } else {
            $.ajax({
                url: `http://${url}/deleteProject/${projectId}`,
                type: "DELETE",
                success: function() {
                    console.log("Deleted project");
                    $("#deleteProjectId").val("");
                    $(".delete-project-form").append(`
                    <div id="#deleteProjectSuccess" class="alert alert-success alert-dismissible fade show mt-4" role="alert">
                        <strong>Zap!</strong> Project was deleted successfully.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    `)
                },
                error: function() {
                    console.log("Error! Cannot call API");
                    $(".delete-project-form").append(`
                    <div id="#deleteProjectWarning" class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                        There's been a problem conencting to the API.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    `)
                }
            }) // end of ajax
        } // end of if
    })
})
// end of delete project





// ----------------------
// accordion functionality
// ----------------------

$(".choice").on("click", function() {
    console.log("test");
    $(".choice").removeClass("expand");
    $(".choice").addClass("small");
    $(this).removeClass("small");
    $(this).addClass("expand");
})

$(".update").on("click", function() {

    console.log("clicked")
})

// document.querySelector("#input").addEventListener("keydown", (event) => {
//     if (event.key == "Enter")
//         apiRequest();
// });

// document.querySelector("#search").addEventListener("click", () => {
//     apiRequest();
// });

// apiRequest = () => {

//     document.querySelector("#grid").textContent = "";

//     const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

//     fetch(url)

//         .then(response => {
//             if (!response.ok) throw Error(response.statusText);
//             return response.json();
//         })

//         .then(data => {
//             loadImages(data);
//         })

//         .catch(error => console.log(error));
// }

// loadImages = (data) => {
//     for (let i = 0; i < data.results.length; i++) {
//         let image = document.createElement("div");
//         image.className = "img";
//         image.style.backgroundImage = "url(" + data.results[i].urls.raw + "&w=1366&h=768" + ")";
//         image.addEventListener("dblclick", function() {
//             window.open(data.results[i].links.download, '_blank');
//         })
//         document.querySelector("#grid").appendChild(image);
//     }
// }

// var settings = {
//     "url": "https://api.unsplash.com/search/photos?query=student&client_id=jrK96VZ00Bo6HPnq3qB92xZwWk-hUjfs-q0azMy3p10",
//     "method": "GET",
//     "timeout": 0,
//     "headers": {
//         "Content-Type": "application/json"
//     },
//     "data": JSON.stringify({
//         "first_name": "",
//         "last_name": "",
//         "profile_image": "medium",
//         "portfolio_url": "",
//         "links": {
//             "photos": "",
//             "portfolio": "",

//         }
//     }),
// };)     //     }),
// };),
// };)/ };)
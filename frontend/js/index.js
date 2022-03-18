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
            alert("Please enter all project details before submitting");
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
                    alert("Project added");
                },
                error: function() {
                    console.log("Can't call API");
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
            alert("Please provide a project ID for updating");
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
                    alert("Project has been updated");
                },
                error: function() {
                    console.log("Cannot update project");
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
            alert("Please provide an project ID to delete");
        } else {
            $.ajax({
                url: `http://${url}/deleteProject/${projectId}`,
                type: "DELETE",
                success: function() {
                    console.log("Deleted project");
                    $("#deleteProjectId").val("");
                    alert("Product successfully deleted");
                },
                error: function() {
                    console.log("Error! Cannot call API");
                }
            }) // end of ajax
        } // end of if
    })
    // end of delete project

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
// };

// $.ajax(settings).done(function(response) {
//     console.log(response);
// });
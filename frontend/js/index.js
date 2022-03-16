console.log("Frontend Javascript is linked!");

document.querySelector("#input").addEventListener("keydown", (event) => {
    if (event.key == "Enter")
        apiRequest();
});

document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
});

apiRequest = () => {

    document.querySelector("#grid").textContent = "";

    const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

    fetch(url)

        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })

        .then(data => {
            loadImages(data);
        })

        .catch(error => console.log(error));
}

loadImages = (data) => {
    for (let i = 0; i < data.results.length; i++) {
        let image = document.createElement("div");
        image.className = "img";
        image.style.backgroundImage = "url(" + data.results[i].urls.raw + "&w=1366&h=768" + ")";
        image.addEventListener("dblclick", function() {
            window.open(data.results[i].links.download, '_blank');
        })
        document.querySelector("#grid").appendChild(image);
    }
}

var settings = {
    "url": "https://api.unsplash.com/search/photos?query=student&client_id=jrK96VZ00Bo6HPnq3qB92xZwWk-hUjfs-q0azMy3p10",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "first_name": "",
        "last_name": "",
        "profile_image": "medium",
        "portfolio_url": "",
        "links": {
            "photos": "",
            "portfolio": "",

        }
    }),
};

// $.ajax(settings).done(function(response) {
//     console.log(response);
// });
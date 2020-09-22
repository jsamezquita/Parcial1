    window.onload = function () {
            var content = document.getElementById("content");
            const datos = "data.json";
            fetch(datos).then(response => response.json()).then(data => {
                const hamburgers = data[0].products;
                console.log(hamburgers);
                const tacos = data[1];
                const saladas = data[2];
                const desserts = data[3];
                const drinkssides = data[4];

                buildTab(hamburgers);

                function buildTab(tab){
                    var div = document.createElement("div");
                    let htmlContent = "<div class='row'>";
                    tab.forEach(item=>{
                        var div = document.createElement("div");
                        htmlContent+=" <img class='card-img-top' style='width:10%; object-fit:cover'src='"+item.image+"' alt='Card image cap'><div class='card-body'><h5 class='card-title'>"+item.name+"</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-dark'>Add to car </a></div>"
                    });
                    htmlContent += "</div>"
                    div.innerHTML = htmlContent;
                    content.append(div);
                }
            });
    }

            
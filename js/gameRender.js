var gameFile;
var toRender = 0; //track which game is currently rendered

    
function createGamePage() {
    // Check if toRender is less than length.
    if (toRender >= gameFile.length)
        toRender = 0;

    // Important variables
    var H1 = document.querySelector("h1"); 
    var templateEntry = document.querySelector("#templateEntry");   
    var imgTemplate = document.querySelector("#imgSection");
    var songTemplate = document.querySelector("#soundtrackSection");
    var rendering = gameFile[toRender];


    // change h1 tag
    H1.innerHTML = rendering.H1;

    // Populate image sections template.
    console.log(rendering);

    for (var imgData of rendering.imgSection) {
        console.log(imgData);
        var numImg = imgData.imgOverlay.IMG.length;
        var curSec = imgTemplate.content.cloneNode(true);
        
        //fill in description of section
        curSec.querySelector(".desc h2").innerHTML = imgData.desc.H2;
        curSec.querySelector(".desc p").innerHTML = imgData.desc.P;
    
        //fill images in this section with overlay
        // dumb fix because i made a template instead of created a div...
        curSec.querySelector(".hasOverlay").remove();
        for (let i = 0; i < numImg; i++) {
            //get just the hasOverlay div within it.
            var singleImg = imgTemplate.content.querySelector(".hasOverlay").cloneNode(true);
            singleImg.querySelector("img").src = imgData.imgOverlay.IMG[i];
            singleImg.querySelector("img").alt = "alt text";
            singleImg.querySelector("p").innerHTML = imgData.imgOverlay.P[i];
            
            //finished the single img, so append to the cur section clone
            curSec.querySelector(".MMMContent").appendChild(singleImg);
        }

        // desc filled out, all images in, append to template entry!
        templateEntry.appendChild(curSec);
    }

    // Populate soundtrack section template.

    var gameOST = songTemplate.content.cloneNode(true);
    var songData = rendering.songSection;

    //OST Description
    gameOST.querySelector(".desc h2").innerHTML = songData.desc.H2;
    gameOST.querySelector(".desc p").innerHTML = songData.desc.P;

    // embed video
    gameOST.querySelector("iframe").src = songData.link;
    gameOST.querySelector("iframe").width = "300";
    gameOST.querySelector("iframe").height = "200";
    gameOST.querySelector("iframe").title = "Youtube video player";
    gameOST.querySelector("iframe").frameborder = "0";
    
    // create song list
    songData.songNames.forEach((song) => {
        var listItem = document.createElement("li");
        listItem.innerHTML = song;
        gameOST.querySelector("ul").appendChild(listItem);
    });
    templateEntry.appendChild(gameOST);
    // iterate toRender for the next press.
    toRender++;

}

// render the first game on load.
// toRender will certainly always be 0 at start
window.addEventListener("load", () => {
    //load the JSON.
    fetch('./js/gameData.json')
        .then((response) => response.json())
        .then((json) => {
            gameFile = json; 
            createGamePage();
        });

    console.log(gameFile);
});


// change game button click, render the next game templates

document.getElementById("changeGameButton").addEventListener('click', () => {
    document.querySelector("#templateEntry").innerHTML = '';
    createGamePage();
    console.log(toRender);
});
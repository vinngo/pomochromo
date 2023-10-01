//CSS for error thrown after clicking on blocked website

var blockedWebsitesList;
setInterval(updateBlocker, 500);
setInterval(function () {
  for (let i = 0; i < blockedWebsitesList.length; i++) {
    console.log(blockedWebsitesList);
  }
}, 3000);

const generateSTYLES = () => {
  return `<style>@import url(https://fonts.googleapis.com/css?family=opensans:500);
    body {
      background: #73a580;
      color: #fff;
      font-family: "Open Sans", sans-serif;
      max-height: 700px;
      overflow: hidden;
    }
    .c {
      text-align: center;
      display: block;
      position: relative;
      width: 80%;
      margin: 100px auto;
    }
    ._404 {
      font-size: 220px;
      position: relative;
      display: inline-block;
      z-index: 2;
      height: 250px;
      letter-spacing: 15px;
    }
    ._1 {
      text-align: center;
      display: block;
      position: relative;
      letter-spacing: 12px;
      font-size: 4em;
      line-height: 80%;
    }
    ._2 {
      text-align: center;
      display: block;
      position: relative;
      font-size: 20px;
    }
    .text {
      font-size: 70px;
      text-align: center;
      position: relative;
      display: inline-block;
      margin: 19px 0px 0px 0px;
      /* top: 256.301px; */
      z-index: 3;
      width: 100%;
      line-height: 1.2em;
      display: inline-block;
    }
    
   
    .right {
      float: right;
      width: 60%;
    }
    
    hr {
      padding: 0;
      border: none;
      border-top: 5px solid #fff;
      color: #fff;
      text-align: center;
      margin: 0px auto;
      width: 420px;
      height: 10px;
      z-index: -10;
    }
    
    hr:after {
      display: inline-block;
      position: relative;
      top: -0.75em;
      font-size: 2em;
      padding: 0 0.2em;
      background: #33cc99;
    }
    
    }
     </style>`;
};

const generateHTML = (pageName) => {
  return `
     
    <div id="Home" class="w3-container city">

    <head>
      <div class="typewriter">
        <h1> PomoChromo <3</h1>
      </div>
    </head>

  </div>
    <div class='c'>
        <div class='_404'>404</div>
        <hr>
        <div class='_1'>Everyone who ever loved you was wrong. Get back to work.</div>
    </div>
     `;
};

function updateBlocker() {
  chrome.storage.local.get("blockerList", function (data) {
    blockedWebsitesList = data.blockerList;
    for (let i = 0; i < blockedWebsitesList.length; i++) {
      if (window.location.hostname === blockedWebsitesList[i]) {
        document.head.innerHTML = generateSTYLES();
        document.body.innerHTML = generateHTML("YOUTUBE");
      }
    }
  });
}

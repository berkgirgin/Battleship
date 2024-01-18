import { getShipsCoordinates } from "./factories/gameboard.js";
// import { DOM } from "./factories/gamecontroller.js";

export { loadShipImages, addAudioConfig };
//

function loadShipImages(gameboard, gameboardContainer) {
  gameboard.fleet.forEach((ship) => {
    let [X_start, X_end, Y_start, Y_end] = gameboard.getShipsCoordinates(ship);
    let isXAxis = Y_start === Y_end;
    let shipType = ship.shipType;

    const shipTiles = gameboardContainer.querySelectorAll(
      `.tile.has_ship[data-ship_type="${shipType}"]`
    );

    let selector_headTile = `.tile.has_ship[data-x_coor="${X_end}"][data-y_coor="${Y_end}"][data-ship_type="${shipType}"]`;
    let headTiles = gameboardContainer.querySelectorAll(selector_headTile);

    shipTiles.forEach((shipTile) => {
      // battleShipTile.style.backgroundColor = "pink";
      if (isXAxis) {
        shipTile.classList.add("x_axis");
      } else {
        shipTile.classList.add("y_axis");
      }
    });

    headTiles.forEach((headTile) => {
      headTile.classList.add("head_tile");
    });
  });

  // // TO DO: make computer ships invisible, only seen when sunk
  // const battleShipTiles = gameboardContainer.querySelectorAll(
  //   '.tile.has_ship[data-ship_type="battleship"]'
  // );

  // let battleship = gameboard.fleet[1];
  // // console.log(gameboard.getShipsCoordinates(battleship));

  // let [X_start, X_end, Y_start, Y_end] =
  //   gameboard.getShipsCoordinates(battleship);

  // let isXAxis = Y_start === Y_end;

  // let selector_headTile = `.tile.has_ship[data-x_coor="${X_end}"][data-y_coor="${Y_end}"][data-ship_type="battleship"]`;

  // let headTiles = gameboardContainer.querySelectorAll(selector_headTile);

  // battleShipTiles.forEach((battleShipTile) => {
  //   // battleShipTile.style.backgroundColor = "pink";
  //   if (isXAxis) {
  //     battleShipTile.classList.add("x_axis");
  //   } else {
  //     battleShipTile.classList.add("y_axis");
  //   }
  // });

  // headTiles.forEach((headTile) => {
  //   headTile.classList.add("head_tile");
  // });
}

function addAudioConfig() {
  const audioBackground = document.querySelector("audio.background_music");
  const audioIconOn = document.querySelector(
    "button.background_music_button .icon_on"
  );
  const audioIconOff = document.querySelector(
    "button.background_music_button .icon_off"
  );
  audioIconOn.style.display = "none";
  const audioButton = document.querySelector("button.background_music_button");

  function togglePlay() {
    if (audioBackground.paused) {
      audioIconOn.style.display = "block";
      audioIconOff.style.display = "none";
      console.log("playing background music");
      audioBackground.play();
    } else {
      audioIconOn.style.display = "none";
      audioIconOff.style.display = "block";
      console.log("pausing background music");
      audioBackground.pause();
    }
  }

  audioButton.addEventListener("click", () => {
    togglePlay();
  });
}

import { useState } from "react";
import { useEffect } from "react";
import "./reset.css";
import "./spotifyList.css";

let i = 0

function createKey() {
  let key = (Math.random()*(5/4))*Math(random)
  return key
}

function ZoomOnCar({car, zoomExit, index}) {
  return (
    <>
      <div className="background">
        <div className="zoom">
          <img src={car.image} alt="" />
          <h2 className="zoomCarName">{car.name}</h2>
          <h3 className="zoomTypeOfCar">{car.categorie}</h3>
          <p className="zoomCarDesc">{car.desc}</p>
          <button className="zoomExit" onClick={() => zoomExit(index)}>X</button>
        </div>
      </div>
    </>
  )
}

function Car({ cars, zoomExit, addCarToLibrary, moreInfo, upList, downList}) {
  let lentghCarArray = cars.length - 1;

  return (
    <ul>
      {cars.map((car, index) => {
        i++
        return (
          <>
            <li key={i}>
              <div className="carPicture">
                <img src={car.image} alt={car.name} onClick={() => moreInfo(index)}/>
              </div>
              <div className="carDescription">
                <h2 className="nameCar">{car.name}</h2>
                <h3 className="typeOfTheCar">{car.categorie}</h3>
              </div>
              <div className="buttonAddCarToLibrary">
                {!car.like && (
                  <div className="centralized">
                    <button className="buttonAddLibrary" onClick={() => addCarToLibrary(index)}>
                      +
                    </button>
                  </div>
                )}
                {car.like && (
                  <div className="centralized">
                    <button className="buttonTakeOFLibrary">
                      ✓
                    </button>
                  </div>
                )}
                <div className="buttonUpAndDown">
                    <div className="up">
                  {!index == 0 && (
                      <button className="buttonUp" onClick={() => upList(index)}>&uarr;</button>
                  )}
                    </div>
                    <div className="doww">
                  {index < lentghCarArray && (
                    <button className="buttonDown" onClick={() => downList(index)}>&darr;</button>
                  )}
                  </div>
                </div>
              </div>
            </li>
            <hr/>
            {car.zoom && (
              <> 
                < ZoomOnCar car={car} index={index} zoomExit={(e) => zoomExit(e)}/>
              </>
            )}
          </>
        );
      })}
    </ul>
  );
}

function Library({ library }) {
  return (
    <>
      <h1 className="library">Votre bibliothèque :</h1>
      <div className="listLibrary">
        {library.map((library, index) => {
          return (
            <>
            {library.zoom && (
              <div className="">
                <div className="descCarInLibrary">
                  <img src={library.image} alt={library.name} />
                  <h4 className="libraryName">{library.name}</h4>
                </div>
              </div>
            )}
              <div className="descCarInLibrary">
                <img src={library.image} alt={library.name} />
                <h4 className="libraryName">{library.name}</h4>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default function App() {
  const [hello, setHello] = useState("coucou");
  const [car, setCars] = useState([]);
  const [library, setlibrary] = useState([]);

  const getData = function () {
    fetch("/voiture.json")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteItems(index) {
    const newArray = [...car.slice(0, index), ...car.slice(index + 1)];
    setCars(newArray);
  }

  function changeCar(index) {
    let newCarName = document.getElementById("inputNameAnimal").value;
    [...car][index].name = newCarName;
    setCars([...car]);
  }

  const addCarToLibrary = function (index) {
    [...car][index].like = true;
    setCars([...car]);
    setlibrary((old) => [...old, car[index]]);
  };

  const moreInfo = function (index) {
    [...car][index].zoom = true;
    setCars([...car]);
  };

  const zoomExit = function (index) {
    [...car][index].zoom = false;
    setCars([...car]);
  }

  const upList = function (index) {
    if (index > 0) {
      let newArray = [...car.slice(0, index), ...car.slice(index + 1)]
      newArray.splice(index - 1, 0, car[index]);
      setCars(newArray);
    } else {
      return
    }
  }

  const downList = function (index) {
    if (index < car.length - 1) {
    let newArray = [...car.slice(0, index), ...car.slice(index + 1)]
    newArray.splice(index + 1, 0, car[index]);
    setCars(newArray);
  } else {
    return
  }
  }

  return (
    <div className="newList">
      <div>
        <div className="divButtonAddCar">
          <button className="buttonAddCar"
            onClick={() => {
              setCars((old) => [
                ...old,
                {
                  id: "f8 tributo",
                  name: "ferrari f8 tributo",
                  categorie: "hypercar",
                  image:
                    "https://www.circuit-mirecourt.fr/wp-content/uploads/2023/10/rc-events_0002_dsc04106-scaled.jpg",
                  like: false,
                  zoom: false,
                          "desc": "La Ferrari F8 Tributo embarque un V8 biturbo 3.9L de 720 ch, 0-100 km/h en 2,9 s, propulsion affûtée, aérodynamisme optimisé, intérieur luxueux et technologies dérivées de la F1 pour une performance exaltante."
                },
              ]);
            }}
          >
            Add a ferrari
          </button>
          <button className="buttonAddCar"
            onClick={() => {
              setCars((old) => [
                ...old,
                {
                  id: "c2",
                  name: "citroën C2",
                  categorie: "Bête férroce",
                  image:
                    "https://img.leboncoin.fr/api/v1/lbcpb1/images/70/3a/e9/703ae9184223cb606d71c9246a14680f20880a8c.jpg?rule=ad-large",
                  like: false,
                  zoom: false,
                  desc: "La Citroën C2 est une petite citadine au design compact et dynamique, disponible avec des moteurs essence et diesel (60 à 125 ch pour la VTS), une boîte manuelle ou Sensodrive, et une bonne agilité urbaine."
                },
              ]);
            }}
          >
            Add an amazing car
          </button>
          <button className="buttonAddCar"
            onClick={() => {
              setCars((old) => [
                ...old,
                {
                  id: "911 gt3rs",
                  name: "porsche 911 gt3rs",
                  categorie: "hypercar",
                  image:
                    "https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7Zl2dioCxkF%25vUqCNwuWXsOw3meV6iTCj%25zhRc2GRdqAZ%25oD21P%25S1BAXmenugTfeIJpV7nDhQk",
                  like: false,
                  zoom: false,
                  desc: "La Porsche 911 GT3 RS est une sportive radicale avec un flat-6 atmosphérique 4.0L de 525 ch, 0-100 km/h en 3,2 s, aérodynamisme extrême, châssis affûté, propulsion, boîte PDK et un comportement taillé pour le circuit."
                },
              ]);
            }}
          >
            Add a porshe
          </button>
          </div>
        <Car
          cars={car}
          addCarToLibrary={(e) => addCarToLibrary(e)}
          moreInfo={(e) => moreInfo(e)}
          zoomExit={(e) => zoomExit(e)}
          upList={(e) => upList(e)}
          downList={(e) => downList(e)}
        />
        <Library library={library} />
      </div>
    </div>
  );
}

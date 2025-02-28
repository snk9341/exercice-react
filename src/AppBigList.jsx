import { useState } from "react";
import { useEffect } from "react";
import "./bigList.css";

// (methode 3)
function Car({ cars, deleteCar, changeCar}) {
  return (
    <ul>
      {cars.map((car, index) => {
        return (
        <>
          <li key={car + "_c"}>
            <div className="carInfo">
              <div className="carPicture">
                <img src={car.image} alt="photo animal" />
              </div>
              <div className="carDescription">
                <h3 className="typeOfTheCar">{car.categorie}</h3>
                <h2 className="nameCar">{car.name}</h2>
            </div>
            {/* <button onClick={() => deleteCar(index)}>supprime cet élément de la liste</button>
            <input type="text" id="inputNameAnimal" onChange={() => changeCar(index)} /> */}
            </div>  
          </li>
        </>
        )
      })}
    </ul>
  );
}

export default function App() {
  const [hello, setHello] = useState("coucou");
  const [car, setCars] = useState([]);

  const getData = function () {
    fetch('/voiture.json').then((res)=>res.json()).then((data)=>{
      setCars(data)
     })
  }

  useEffect(() => {
    getData();
  }, []);

  const test = function () {
    console.log("ok");
    setHello("prout");
  };

  // (methode 2)
  /*
  const MakeAnimalList = () => {
    const output = [];
    animals.forEach((child, childIndex) => {
      output.push(
      <li key={childIndex}>{child.name}</li>
      );
    });
    return <ul>{output}</ul>;
  };*/

  function deleteItems(index) {
    const newArray = [...car.slice(0, index), ...car.slice(index+1)];
    setAnimals(newArray);
  }

  function changeCar(index) {
    let newAnimalName = document.getElementById('inputNameAnimal').value;
    [...car][index].name = newAnimalName;
    setAnimals([...car]);
  }

  return (
      <div className="newList">
        <button className="buttonNewList" onClick={test}>
          +
        </button>
        <div>{hello}</div>
        <div>
          <button onClick={ () => {setCars(old => [...old, { id: 'f8 tributo',
                                                                name: 'ferrari f8 tributo',
                                                                categorie: "hypercar",
                                                                image: 'https://www.tuningblog.eu/wp-content/uploads/2025/01/Ferrari-F8-Tributo-Typ-F142-4l-Benziner-2WD-HR-Tieferlegungsfedern-28688-1-Front.jpg'
                                                              }])
                                  } 
                          }>Add a ferrari</button>
          <button onClick={ () => {setCars(old => [...old, { id: '911 gt3rs',
                                                                name: 'porsche 911 gt3rs',
                                                                categorie: "hypercar",
                                                                image: 'https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7Zl2dioCxkF%25vUqCNwuWXsOw3meV6iTCj%25zhRc2GRdqAZ%25oD21P%25S1BAXmenugTfeIJpV7nDhQk'
                                                              }])
                                  } 
                          }>Add a porshe</button>
                                    {/* Methode 3: via un composant externe */}

          <Car cars={car} deleteCar={(e) => deleteItems(e)} changeCar={(e) => changeCar(e)}/>
        </div>
      </div>
  );
}

          {/* Methode 1: direct ici 

          <ul>
            { animals.map((animal) => {
              const indexAnimal = (element) => element == animal;
              return (
                <>
                <li key={animal}>{animal.name}</li>
                <button onClick={() => deleteItems(animals.findIndex(indexAnimal))}>supprime cet élément de la liste</button>
                </>
              )
            }) }
          </ul>

          {/* Methode 2: via une fonction *

          <MakeAnimalList />*/}

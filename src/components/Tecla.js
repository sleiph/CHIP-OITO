import styled from 'styled-components'

const TeclaDiv = styled.div`
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    button {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        color: #fff;
        background-color: #3f956f;
        font-size: 16px;
        border-radius: 5px;
        text-decoration: none;
        border: none;
        cursor: pointer;
        outline: none;
        transition: 0.1s all;
    }
    button:hover {
        background-color: #388663;
    }
    button:active {
        transform: scale(0.98);
    }
`
const valarray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "a", "s", "d"]; 
const valarray2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f"]; 

function Tecla( {valor} ) {
   const handleAnswerChange = (event) => {
    if (valarray.includes(event.key)){
        if (valarray.indexOf(event.key) > 8){
            event.key = valarray2[valarray.indexOf(event.key)]
        }
        console.log(event.key);
    }
  }  

  return (
    <TeclaDiv onKeyDown = {handleAnswerChange} tabIndex = "0">
        <button onClick ={() => console.log(valor)}>{valor}</button>
    </TeclaDiv>
  )
}

export default Tecla

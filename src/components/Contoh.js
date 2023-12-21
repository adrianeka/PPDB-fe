// sample data structure
/* const data = [
  {
    id:   1,
    name: 'john',
    gender: 'm'
  }
  {
    id:   2,
    name: 'mary',
    gender: 'f'
  }
] */ // make sure to set the default value in the useState call (I already fixed it)
import React, { useState } from "react"

function Contoh () {

    const [data, setData] = useState([
      {
        id:   1,
        name: 'john',
        gender: 'm'
      },
      {
        id:   2,
        name: 'mary',
        gender: 'f'
      }
    ]);
    
    const updateFieldChanged = index => e => {
      console.log('index: ' + index);
      console.log('property name: '+ e.target.name);
      let newArr = [...data]; // copying the old datas array
      newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
    
      setData(newArr);
    }
    
    return (
        <div>
          {data.map((datum, index) => {
            <li key={datum.name}>
              <input type="text" name="name" value={datum.name} onChange={updateFieldChanged(index)}  />
              {console.log(datum.name)}
              {console.log(datum.id)}
              {console.log(index)}
            </li>
          })}
        </div>
        
        
    )
}

export default Contoh

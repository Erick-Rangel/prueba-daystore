import React from 'react'

const Filters = ({data, handleChange, dispatch, getAllCiudades}) => {



    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllCiudades());
    }


  return (
    <div>
      <select onChange={handleChange}>
        {data?.map((ciudad) => (
          <option key={ciudad.id} value={ciudad.id}>
            {ciudad.Ciudades}
          </option>
        ))}
      </select>

      <button onClick={handleClick}>Todas las ciudades</button>
    </div>
  );
}

export default Filters

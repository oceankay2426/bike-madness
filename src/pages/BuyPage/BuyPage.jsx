import * as bikesAPI from '../../utilities/bike-api';
import React, { useState, useEffect } from 'react';

export default function BuyPage() {
  const [bikes, setbikes] = useState([]);
  useEffect (()=>{
    async function getbikes(){
    const bikes = await bikesAPI.getAllForUser();
     setbikes(bikes)
     console.log(bikes);
    }
    getbikes();
  }, [])

  return (
    <>
      <h1>Bike List</h1>
    {
      bikes.map(o => (
        <div>
          <p>bike number: {o._id}</p>
          <p>total price: {o.totalPrice}</p>
        </div>
      ))
    }
    </>
);
}
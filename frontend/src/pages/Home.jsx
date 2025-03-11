import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [loginUserData,setLoginUserData]= useState();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    getUserData();
  },[])

  const getUserData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });

      setLoginUserData(data.data); // ✅ Now we get ALL users from API
    } catch (error) {
      console.log(`Failed to fetch data`, error);
    }
  };

  console.log(loginUserData);
  return (
    <div className={ ` home min-h-screen p-6`}>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">Welcome {loginUserData && loginUserData.name}</h1>
        <p className=" text-lg mb-6 text-white font-semibold">
          Experience the finest quality rice with Amesia Rice. Our premium selection is sourced from the best farms,
          ensuring rich flavor and superior quality for your meals.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Premium Quality</h2>
            <p className="text-gray-500 mt-2">Our rice is carefully selected to ensure top-notch quality and taste.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">100% Organic</h2>
            <p className="text-gray-500 mt-2">We offer organic rice cultivated with natural farming practices.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Trusted by Many</h2>
            <p className="text-gray-500 mt-2">Join thousands of satisfied customers who love our rice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

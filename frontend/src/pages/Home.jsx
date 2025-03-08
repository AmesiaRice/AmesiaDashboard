const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 ">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">Welcome to Amasia Rice</h1>
        <p className="text-gray-600 text-lg mb-6">
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

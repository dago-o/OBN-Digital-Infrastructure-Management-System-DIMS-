import Imageslider from './Imageslider';
import OBNimage from '../assets/OBNimage1.jpg';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-white text-blue-700 shadow-2xl flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white border-t-4 border-gray-400 shadow-lg">
        <img
          src={OBNimage}
          alt="logo image"
          className="w-24 h-24 object-cover rounded-full border-4 border-blue-600 shadow-lg"
        />
        <nav className="bg-white shadow-lg rounded-lg p-4 px-44">
          <ul className="flex justify-center space-x-6">
            <li>
              <a href="#about" className="hover:underline text-blue-600 hover:text-blue-700 font-semibold">About Us</a>
            </li>
            {/* <li>
              <button className="hover:underline text-blue-600 font-semibold hover:text-blue-700 cursor-pointer" onClick={()=>navigate('/report')}>Report</button>
            </li> */}
            <li>
              <button className="hover:underline text-blue-600 font-semibold hover:text-blue-700 cursor-pointer" onClick={()=> navigate('/login')}>Login</button>
            </li>

             {/* <li>
              <button className="hover:underline text-blue-600 font-semibold hover:text-blue-700 cursor-pointer" onClick={()=> navigate('/users')}>Users</button>
            </li> */}

          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Welcome to OBN-DIMS</h2>
        <Imageslider />

        {/* About Us Section */}
        <section
          id="about"
          className="mt-20 max-w-full mx-48 p-10 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl border-l-8 border-blue-600 flex flex-col items-center"
        >
          <div className="mb-4 flex items-center gap-3">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
            </svg>
            <h2 className="text-3xl font-extrabold text-blue-700">About Us</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            <span className="font-semibold text-blue-700">Welcome to OBN-DIMS!</span> <br />
            We are a <span className="font-semibold">digital inventory management system</span> built for reliability and accessibility.<br />
            Our goal is to simplify product tracking and warehouse control using modern technologies.<br />
            <span className="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium shadow-sm">
              Empowering your inventory, digitally.
            </span>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-r from-blue-50 to-white border-t border-blue-200 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-700">OBN-DIMS</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
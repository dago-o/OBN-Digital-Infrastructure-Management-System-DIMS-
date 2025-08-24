import { FaLaptop, FaUsers, FaBullhorn } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import AdminLayout from './Adminlayout';
// import bgimage from '../assets/admin-bg.jpg'; // Make sure the image path is correct

import bgimage from '../assets/images1.jpg'; 

function Dashboard() {
  return (
    <AdminLayout>
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgimage})` }}
      >

        {/* Content */}
        <div className="relative z-10 p-10">
          {/* Header */}
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow">
            Welcome, Admin 👋{' '}
            <span className="text-blue-700">
              <Typewriter
                words={['Manage Devices', 'Control Users', 'Post Announcements',
              'Track device issues and resolutions', 'Oversee resulution time for each report',
              "Take action based on Resolution rate"
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h2>

          
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;

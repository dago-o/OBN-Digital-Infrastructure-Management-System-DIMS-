import Enduserlayout from "./Enduserlayout";
import { Typewriter } from 'react-simple-typewriter';
import bgimage from '../assets/images1.jpg'; 

function Dashboard() {


  return (
    <Enduserlayout>
      <div
              className="min-h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${bgimage})` }}
            >
      
              {/* Content */}
              <div className="relative z-10 p-10">
                {/* Header */}
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow">
                  Welcome, End User 👋{' '}
                  <span className="text-blue-700">
                    <Typewriter
                      words={['Scan device QR code for details', 'Submit device issues', 'Request device maintenance ',
                    'Check issue resolution progress', 'Confirm issues resolved'
                   
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
    </Enduserlayout>
  );
}

export default Dashboard;

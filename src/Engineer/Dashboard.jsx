
import Engineerlayout from "./Engineerlayout";
import { Typewriter } from 'react-simple-typewriter';
import bgimage from '../assets/images1.jpg'; 

function Dashboard() {
  return (
    <Engineerlayout>
    
        <div
                     className="min-h-screen bg-cover bg-center relative"
                     style={{ backgroundImage: `url(${bgimage})` }}
                   >
             
                     {/* Content */}
                     <div className="relative z-10 p-10">
                       {/* Header */}
                       <h2 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow">
                         Welcome, Engineer 👋{' '}
                         <span className="text-blue-700">
                           <Typewriter
                             words={['Scan device QR code for details', 'Print QR code to assign on physical device', 
                               'Follow Announcement from Admin',
                            'Take issue reported in Notification',
                           'Check issue reported from user',
                            'Make maintenance for issue reported',
                            'Update Status/ progress continually',
                             'Report the final document for the Admin',
                          
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
    </Engineerlayout>
  );
}

export default Dashboard;

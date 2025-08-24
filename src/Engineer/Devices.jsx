import axios from "axios";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useRef } from "react";
import Engineerlayout from "./Engineerlayout";

function Devices() {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showQR, setShowQR] = useState(false);
  

  const qrRef = useRef(); // Add this


  // Fetch devices from backend
  const fetchDevices = () => {
    axios
      .get("http://localhost/projects_and_practices/projects/OBN_project/getdevice.php")
      .then((resp) => {
        setDatas(resp.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const filteredDevices = datas.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //handle print function
  const handlePrint = () => {
  const printContent = qrRef.current.innerHTML;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body {
            text-align: center;
            font-family: Arial, sans-serif;
            margin-top: 50px;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${printContent}
      </body>
    </html>
  `);
  printWindow.document.close();
};


  return (
    <Engineerlayout>
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search devices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded w-1/3 border-2 border-gray-400 focus:outline-none focus:border-blue-500"
        />
        
      </div>

     

      {/* Device Cards */}
       {
        filteredDevices.length > 0 ?(
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-fuchsia-50  rounded-lg shadow-2xl p-16 cursor-pointer hover:shadow-2xs transition group"
            onClick={() => setSelectedDevice(device)}
          >
            <div className="flex flex-col items-center">
              {device.image_url && (
                <img
                  src={`http://localhost/projects_and_practices/projects/OBN_project/${device.image_url}`}
                  alt={device.name}
                  className="w-60 h-64 object-cover  rounded-lg mb-2 transition-transform duration-200 group-hover:scale-105"
                />
              )}
              <h3 className="text-lg font-semibold">{device.name}</h3>
         
            </div>
          </div>
        ))}
      </div>
      ) :(
        <div className="text-center text-gray-500 text-lg mt-10">
          🚫 No products found matching{" "}
          <span className="font-semibold">"{searchTerm}"</span>
        </div>
      )}

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              onClick={() => setSelectedDevice(null)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              {selectedDevice.image_url && (
                <img
                  src={`http://localhost/projects_and_practices/projects/OBN_project/${selectedDevice.image_url}`}
                  alt={selectedDevice.name}
                  className="w-40 h-40 object-cover rounded-lg mb-4"
                />
              )}
              <div className="font-semibold text-lg mb-2"> 
                 <p className="text-gray-700 mb-1">
                <span className="font-medium">ID:</span> {selectedDevice.id}
              </p>

                <p className="text-gray-700 mb-1">
                <span className="font-medium">Name:</span> {selectedDevice.name}
              </p>
              
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Model:</span> {selectedDevice.model}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Serial Number:</span> {selectedDevice.serial_number}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Location:</span> {selectedDevice.location}
              </p>

              </div>
             
              <div className="flex flex-wrap gap-2 mt-2 ">
               
                <button
                  onClick={() => setShowQR(true)}
                  className="bg-blue-600 text-white cursor-pointer px-32 py-2 rounded hover:bg-blue-700"
                >
                  Show QR
                </button>
              </div>
            </div>
            
            {/* QR Modal inside Details Modal */}
            {showQR && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                <div ref={qrRef} className="bg-white p-6 rounded shadow-lg ">
                  <h3 className="mb-4 text-lg font-semibold">
                    {selectedDevice.name} QR Code
                  </h3>
                   <QRCode value={ `
                                      Device ID: ${selectedDevice.id}
                                      Device Name: ${selectedDevice.name}
                                      Device Model: ${selectedDevice.model}
                                      Device Serial Number: ${selectedDevice.serial_number}
                                      Device Location: ${selectedDevice.location}
                                      Device Status: ${selectedDevice.status}
                  
                  
                                     `
                                    } />
                    <div className="flex flex-wrap gap-2 mt-2" >
                      <button
                    onClick={() => setShowQR(false)}
                    className="mt-4 px-12 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Close
                  </button>

                  <button
                 onClick={handlePrint}
                className="mt-4 px-12 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
                   Print
                </button>

                    </div>
                  

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
     </Engineerlayout>
  );
}

export default Devices;
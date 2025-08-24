import  {  BrowserRouter  as  Router,  Routes,  Route  }  from  "react-router-dom";
import  Adddevice  from  './Admin/Adddevice';
import  Devices  from  './Admin/Devices';
import  Users  from  './Admin/Users';
import  EDashboard  from  './Engineer/Dashboard';
import  AdminDashboard  from  './Admin/Dashboard';
import  EnduserDashboard  from  './Enduser/Dashboard';
import  Home  from  './components/Home';
import  Login  from  './components/Login';
import  Announcement  from  "./Admin/Announcemnet";
import  Issuereport  from  "./Enduser/Issuereport";
import  EDevices  from  "./Engineer/Devices";
import  Notification  from  "./Engineer/Notification";
import  UploadReport  from  "./Engineer/Uploadreport";
import  Myissues  from  "./Enduser/Myissues";
import  EngAnnouncement  from  "./Engineer/Announcement";
import  SummaryDashboard  from  "./Admin/AdminDashboard";

function  App()  {
    return  (
        <Router>
          <Routes>
          <Route  path="/"  element={<Home  />}  />
          <Route  path="/login"  element={<Login  />}  />
          <Route  path="/users"  element={<Users  />}  />
          <Route  path="admin/dashboard"  element={<AdminDashboard  />}  />
          <Route  path="/admin/devices"  element={<Devices  />}  />
          <Route  path="/admin/users"  element={<Users/>}  />
          <Route  path="/admin/adddevice"  element={<Adddevice  />}  />
          <Route  path="/engineer/dashboard"  element={<EDashboard  />}  />
          <Route  path="/enduser/dashboard"  element={<EnduserDashboard  />}  />
          <Route  path="/admin/announcement"  element={<Announcement  />}  />
          <Route  path="/enduser/issuereport"  element={<Issuereport  />}  />
          <Route  path="/engineer/devices"  element={<EDevices  />}  />
        <Route  path="/engineer/notification"  element={<Notification/>}  />
        <Route  path="/engineer/uploadreport"  element={<UploadReport/>}  />
        <Route  path="/enduser/myissues"  element={<Myissues  />}  />
        <Route  path="/engineer/announcement"  element={<EngAnnouncement  />}  />
      <Route  path="/admin/admindashboard"  element={<SummaryDashboard  />}  />

          </Routes>
        </Router>
    );
}

export  default  App;
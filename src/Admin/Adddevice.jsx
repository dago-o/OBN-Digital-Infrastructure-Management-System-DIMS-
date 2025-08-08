import axios from "axios";
import { useState, useEffect } from "react";

function Adddevice({ deviceToEdit, onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (deviceToEdit) {
      setName(deviceToEdit.name || "");
      setModel(deviceToEdit.model || "");
      setSerialNumber(deviceToEdit.serial_number || "");
      setLocation(deviceToEdit.location || "");
      setImageFile(null);
    } else {
      setName("");
      setModel("");
      setSerialNumber("");
      setLocation("");
      setImageFile(null);
    }
    setMessage("");
  }, [deviceToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("model", model);
    formData.append("serial_number", serialNumber);
    formData.append("location", location);
    if (imageFile) formData.append("image", imageFile);

    if (deviceToEdit && deviceToEdit.id) {
      formData.append("id", deviceToEdit.id);
    }

    axios
      .post(
        "http://localhost/projects_and_practices/projects/OBN_project/adddevice.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((resp) => {
        setMessage(resp.data.message);
        if (onSubmit) onSubmit(); // Refresh list and close form
        if (!deviceToEdit) {
          setName("");
          setModel("");
          setSerialNumber("");
          setLocation("");
          setImageFile(null);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Something went wrong!");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
        {deviceToEdit ? "Edit Device" : "Add New Device"}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block font-medium text-gray-600">Device Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required={!deviceToEdit}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-600">Device Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-600">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-600">Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-600">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700"
          >
            {deviceToEdit ? "Update Device" : "Add Device"}
          </button>
          {deviceToEdit && (
            <button
              type="button"
              onClick={onClose}
              className="ml-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
        {message && (
          <p className="text-center text-green-600 font-medium mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}

export default Adddevice;
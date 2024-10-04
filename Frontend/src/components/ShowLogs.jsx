import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShowLogs = () => {
  const [logs, setLogs] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [entriesPerPage, setEntriesPerPage] = useState(10); 
  const [inputValue, setInputValue] = useState(10);

  // Fetch logs from the API
  const showLogs = async () => {
    try {
      const response = await axios.get('/logs');
      setLogs(response.data);
    } catch (error) {
      toast.error("Error in showing the logs: " + error.message);
    }
  };

  // Fetch logs on component mount
  useEffect(() => {
    showLogs();
  }, []);

  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  
  const applyEntriesPerPage = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value > 0) {
      setEntriesPerPage(value);
      setCurrentPage(1); 
    } else {
      toast.error("Please enter a valid number greater than 0.");
    }
  };

  const totalPages = Math.ceil(logs.length / entriesPerPage);

  
  const currentLogs = logs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='border-2 m-2 rounded-lg bg-slate-200 border-gray-200'>
      <h1 className='text-3xl text-center mx-4 my-2 p-1 bg-slate-300 rounded-lg'>Logs</h1>
      
      {/* Logs Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date & Time</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Car Plate</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Image Link</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {currentLogs.length > 0 ? (
              currentLogs.map((log) => (
                <tr key={log.id_log}>
                  <td className='px-6 py-4  text-sm text-gray-500'>{new Date(log.data_hour).toLocaleString()}</td>
                  <td className='px-6 py-4  text-sm text-gray-500'>{log.car_plate}</td>
                  <td className='px-6 py-4  text-sm text-gray-500'>
                    <a
                      className='text-blue-500 hover:underline'
                      href={log.img_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='px-6 py-4 text-center text-gray-500'>No logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination and Entries Per Page */}
      <div className='mt-4 flex flex-col items-center'>
        {/* Pagination Controls */}
        <nav className='inline-flex space-x-2 mb-4'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mb-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </nav>

        {/* Input and Button to change entries per page */}
        <div className='mt-2'>
          <label>
            Change number of logs on this page:
            <input
              type="number"
              min="1"
              max="100"
              value={inputValue}
              onChange={handleInputChange}
              className="ml-2 px-2 py-1 border rounded-md text-gray-700"
              placeholder="Enter number"
            />
          </label>
          <button
            onClick={applyEntriesPerPage}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowLogs;

import { useState, useEffect } from "react";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [connections, setConnections] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(
        `https://transport.opendata.ch/v1/connections?from=${from}&to=${to}`
      );
      const data = await response.json();
      if (data && data.connections) {
        setConnections(data.connections);
      }
    }

    fetchData();
  }, [from, to]);

  function formatTime( pTime) {

    let dateObj = new Date(pTime);
    let hours = dateObj.getHours().toString().padStart(2, '0');
    let minutes = dateObj.getMinutes().toString().padStart(2, '0');
    let hhmm = hours + ':' + minutes; 

    return hhmm
  }
  function formatDuration(timeString) {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeString.substr(3, 2));
    const minutes = parseInt(timeParts[1]);
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  return (
    <div className="bg-blue-200">
      <h1 class="w-2/3 mx-auto text-center text-5xl font-extrabold dark:text-black">Swiss Transportation System</h1>
      <form className="w-2/3 mx-auto">

        <div className="mb-6">
          <label
            htmlFor="from"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            From
          </label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            id="from"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label
            htmlFor="to"
            
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            To
          </label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            type="text"
            id="to"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </form>

      <section>
        <div className=" w-2/3 mx-auto py-2 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  From
                </th>
                <th scope="col" className="px-6 py-3">
                  To
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Departure
                </th>
                <th scope="col" className="px-6 py-3">
                  Arrival
                </th>
              </tr>
            </thead>
            <tbody>
              {connections.map((connection, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    {connection.from.station.name} Platform: {connection.from.platform}
                  </td>
                  <td className="px-6 py-4">
                    {connection.to.station.name} Platform:
                    {connection.to.platform}
                  </td>
                  <td className="px-6 py-4">{formatDuration(connection.duration)}</td>
                  <td className="px-6 py-4">{formatTime(connection.from.departure)}</td>
                  <td className="px-6 py-4">{formatTime(connection.to.arrival)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <p>
          Source Code : <a href="https://github.com/Halil-Kuray/Swiss-Transport-Api">https://github.com/Halil-Kuray/Swiss-Transport-Api</a>
        </p>
        <p>
          Powered By : <a href="https://transport.opendata.ch/"> Open Data</a>
        </p>
      </section>
    </div>
  );
}

export default App;

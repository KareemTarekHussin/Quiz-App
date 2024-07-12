
export const ResultsDetails = () => {
    const data = [
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
        { name: 'Jacob Hamuel', score: 16, average: 20, time: '09:00' },
      ];
  return (
   <>

{/* <div className="min-h-screen flex items-center justify-cente bg-yellow-400 p-3"> */}

      <div className="rounded-lg border border-green-300 p-6 shadow-md w-fit">
        <h2 className="text-lg font-semibold mb-4">Results</h2>
        <div className="overflow-x-auto">
          <table className="min-w-ful table-aut border-collaps">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-800 text-white border">Student name</th>
                <th className="px-4 py-2 bg-gray-800 text-white border">Score</th>
                <th className="px-4 py-2 bg-gray-800 text-white border">Average</th>
                <th className="px-4 py-2 bg-gray-800 text-white border">Time submitted</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.score}</td>
                  <td className="px-4 py-2 border">{item.average}</td>
                  <td className="px-4 py-2 border">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    {/* </div> */}







    


   </>
  )
}

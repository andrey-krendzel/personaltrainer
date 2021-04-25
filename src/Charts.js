
import './App.css';
import React from "react";
import { LineChart, Line } from 'recharts';

function Charts(props) {

  const [update, setUpdate] = useState(0);
  const [trainings, setTrainings] = useState([]);

      //Errors for fetch
      function handleErrors(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }
  
    React.useEffect(() => {
      fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(handleErrors)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setTrainings(responseData);
  
          console.log(trainings);
        })
        .catch((error) => console.log(error));
    }, [update]);
  



  return (
    <div>

<LineChart
  width={400}
  height={400}
  data={trainings}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
  <XAxis dataKey="name" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
  <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
</LineChart>

    </div>
  );
}

export default Charts;

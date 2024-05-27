import { useEffect, useState } from 'react';
import { getRequestWithNativeFetch } from '../action/fetch';

const FetchGetRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const listItems = data.map((element) => {
    return (
        <ul type="disc" className="item">
            <li
                style={{
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                Name : {element.name}
            </li>
            <li>Difficulty : {element.difficulty}</li>
            <li>Ingredients : {element.ingredients.map((i)=> {return (<ul><li>{i.name}</li></ul>)})}</li>
            <li>Inventors : {element.inventors.map((i)=> {return (<ul><li>{i.firstName + ' ' + i.lastName}</li></ul>)})}</li>

        </ul>
    );
});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getRequestWithNativeFetch(
          'https://wizard-world-api.herokuapp.com/Elixirs'
        );
        setData(postsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); //call api upon component loading

  return <div className="container">{listItems}{console.log(data)}</div>;
};

export default FetchGetRequest;
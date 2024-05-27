import { useEffect, useState } from 'react';
import { getRequestWithNativeFetch } from '../action/fetch';

const FetchGetRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchinput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
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
  }, [searchInput]); //call api upon component loading

  const onChangeHandler = event => {
    setSearchinput(event.target.value);
    setFilteredData(data.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase())));
 };

 const onClickHandler = event =>{
  setData(filteredData);
 }

 const onResetHandler = event =>{
  setSearchinput('');
 }

  return (<div className="container">
    <div className='filters'>
      <input className='search-param' placeholder='Enter name of elixir to search' id='search-param' onChange={onChangeHandler}></input>
      <button onClick={onClickHandler}>search</button>
      <button onClick={onResetHandler}>resest</button>
      </div>
      {listItems}</div>);
};

export default FetchGetRequest;
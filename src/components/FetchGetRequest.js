import { useEffect, useState } from 'react';
import { getRequestWithNativeFetch } from '../action/fetch';

const FetchGetRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchNameInput, setSearchNameinput] = useState('');
  const [searchIngredientInput, setSearchIngredientinput]=useState('');
  const [searchInventorInput, setSearchInventorinput] = useState('');
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
  }, [searchNameInput]); //call api upon component loading

  const onNameChangeHandler = event => { // TODO: create a single search Form and single Event handler
    setSearchNameinput(event.target.value); // can use Json schema form to simplify logic , avoiding package dependencies
    setFilteredData(data.filter(item => item.name.toLowerCase().includes(searchNameInput.toLowerCase())));
 };
 
//  const onIngredientChangeHandler = event => { search by ingredient name
//   setSearchIngredientinput(event.target.value);
//   console.log('testing ingredient call', data)
//   setFilteredData(data.filter(item => item.ingredients.filter(i=>i.name.toLowerCase().includes(searchIngredientInput.toLowerCase()))))};

// const onInventorNameChangeHandler = event => { // search by inventor name
//   setSearchInventorinput(event.target.value);
//   setFilteredData(data.filter(item => item.inventors.filter(i=>i.firstName.toLowerCase().includes(searchInventorInput.toLowerCase()))));
// };

 const onClickHandler = event =>{
  setData(filteredData);
 }

 const onResetHandler = event =>{
  setData(data)
  
 }

  return (<div className="container">
    <div className='filters'>
      <input className='search-param' placeholder='search by elixir' id='search-param' onChange={onNameChangeHandler}></input>
      {/* <input className='search-param' placeholder='search by ingredient name ' id='search-param' onChange={onIngredientChangeHandler}></input> */}
      {/* <input className='search-param' placeholder='search by inventor name' id='search-param' onChange={onInventorNameChangeHandler}></input> */}
      <button onClick={onClickHandler}>search</button>
      <button onClick={onResetHandler}>reset</button>
     </div>
      {listItems}</div>);
};

export default FetchGetRequest;
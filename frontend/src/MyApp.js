import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then(result => {
      if (result)
        setCharacters(result);
    });
  }, []);

  function removeOneCharacter(index) {
    makeDeleteCall(characters.at(index).id);

    const updated = characters.filter((character, i) => {
      return i !== index
    });

    setCharacters(updated);
  }

  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete('http://localhost:5000/users/' + id);
      if (response === 204)
        return response.data.users_list;
      else
        return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then(result => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
    });
  }

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }


  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )

}

export default MyApp;
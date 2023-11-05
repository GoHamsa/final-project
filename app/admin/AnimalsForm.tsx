'use client';
/* import { useState } from 'react';
import { Animal } from '../../migrations/00000-createTableAnimal';

type Props = {
  animals: Animal[];
}; */

export default function AnimalsForm() {
  /* const [animalList, setAnimalList] = useState(animals);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');

  const [onEditId, setOnEditId] = useState(0);
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditTypeInput, setOnEditTypeInput] = useState('');
  const [onEditAccessoryInput, setOnEditAccessoryInput] = useState('');

  async function createAnimal() {
    const response = await fetch('/api/animals', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameInput,
        type: typeInput,
        accessory: accessoryInput,
      }),
    });

    const data = await response.json();

    setAnimalList([...animalList, data.animal]);
  }

  async function updateAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        type: onEditTypeInput,
        accessory: onEditAccessoryInput,
      }),
    });

    const data = await response.json();

    setAnimalList(
      animalList.map((animal) => {
        if (animal.id === data.animal.id) {
          return data.animal;
        }
        return animal;
      }),
    );
  }

  async function deleteAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    setAnimalList(animalList.filter((animal) => animal.id !== data.animal.id));
  } */

  return <>Admin Page</>;
}

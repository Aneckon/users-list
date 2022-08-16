import React, { useEffect, useState } from 'react';
import { Success } from './components/Success';
import { Users } from './components/Users';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => alert('Помилка при подключеню юзерів'))
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onClickInvite = (id: string) => {
    if (invites.includes(id)) {
      setInvites((prev: string[]) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev: string[]) => [...prev, id]);
    }
  };

  return (
    <div className="App">
      {success ? (
        <Success setSuccess={setSuccess} count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          onClickInvite={onClickInvite}
          invites={invites}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
};

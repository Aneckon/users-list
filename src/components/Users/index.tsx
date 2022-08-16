import React, { FC, Key } from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

interface UsersProps {
  items: any;
  isLoading: any;
  searchValue: string;
  onChangeSearchValue: (e: any) => void;
  onClickInvite: (id: string) => void;
  invites: any;
  setSuccess: (seccess: boolean) => void;
}

export const Users: FC<UsersProps> = ({
  onClickInvite,
  invites,
  onChangeSearchValue,
  searchValue,
  items,
  isLoading,
  setSuccess,
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={searchValue}
          onChange={onChangeSearchValue}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((users: { first_name: string; last_name: string; email: string }) => {
              const name = (users.first_name + users.last_name).toLocaleLowerCase();

              return (
                name.includes(searchValue.toLocaleLowerCase()) ||
                users.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
              );
            })
            .map(
              (users: {
                id: string;
                last_name: string;
                avatar: string;
                email: string;
                first_name: string;
              }) => (
                <User
                  key={users.id}
                  invites={invites.includes(users.id)}
                  onClickInvite={onClickInvite}
                  {...users}
                />
              ),
            )}
        </ul>
      )}
      {invites.length > 0 && (
        <button onClick={() => setSuccess(true)} className="send-invite-btn">
          Відправити запрошення
        </button>
      )}
    </>
  );
};

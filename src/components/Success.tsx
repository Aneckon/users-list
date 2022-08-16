import React, { FC } from 'react';

interface SuccessProps {
  count: number;
  setSuccess: (success: boolean) => void;
}

export const Success: FC<SuccessProps> = ({ count, setSuccess }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всім {count} юзурам відправити запрошення.</p>
      <button onClick={() => setSuccess(false)} className="send-invite-btn">
        Назад
      </button>
    </div>
  );
};

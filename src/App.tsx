import { useState } from 'react';
import './App.css';
import alert from './assets/icons/alert.svg';

import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  emailRequired: string;
  passwordRequired: string;
};

function App() {
const [isAuth, setIsAuth] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    void fetch('', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    setIsAuth(true);
    setValue('emailRequired', '')
    setValue('passwordRequired', '')
  };
  

  return (
    <div className='wrapper'>
      <form className='wrapper__form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='wrapper__form__des'>
            <label>Введите email</label>
            <input
              type='email'
              {...register('emailRequired', { required: true })}
              className='wrapper__form__des-input'
            />
          </div>

          {errors.emailRequired && (
            <div className='alert-dangerous'>
              <img src={alert} alt='Alert' />
              <span>Это поле обязательное для заполнения</span>
            </div>
          )}

          <div className='wrapper__form__des'>
            <label>Введите пароль</label>
            <input
              type='password'
              {...register('passwordRequired', { required: true })}
              className='wrapper__form__des-input'
            />
          </div>

          {errors.passwordRequired && (
            <div className='alert-dangerous'>
              <img src={alert} alt='Alert' />
              <span>Это поле обязательное для заполнения</span>
            </div>
          )}
        </div>
        {
          isAuth && <div className='alert-success'>Успешно!</div>
        }
        <button type='submit' className='wrapper__form-btn'>
          Войти
        </button>
      </form>
    </div>
  );
}

export default App;

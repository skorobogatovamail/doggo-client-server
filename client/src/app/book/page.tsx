"use client";

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { webAppContext } from "../context";
import { retrieveLaunchParams } from '@tma.js/sdk';
import { redirect } from 'next/navigation';
import axios from 'axios';


export default function Book() {
  const app = useContext(webAppContext).appRef.current;
  const [initDataRaw, setInitDataRaw] = useState<string | undefined>('');

  useEffect(() => {
    try {
      // достаем данные, которые отправляются при открытии мини эппа, для авторизации юзера
      const { initDataRaw } = retrieveLaunchParams();
      setInitDataRaw(initDataRaw);
    } catch (error) {
      console.error('Error retrieving launch parameters:', error);
    }
  }, [app]);

  //здесь логика отправки запроса для регистрации нового юзера 
  const handleNewUser = async () => {
    console.log('handling new user')
    // app.showConfirm('Create new doggo account via telegram?', (isConfirmed: boolean) => {
    //   if (isConfirmed) {
    //     console.log('user said yes')
    //   } else {
    //     console.log('user said no')
    //   }
    // })
    const response = await axios('http://dog.ignorelist.com:8800/api/usersFirebase', {
      method: 'GET',
      headers: {
        Authorization: `tma ${initDataRaw}`
      },
    })
    if (response) {
      app.showAlert('yes')
      console.log(response)
    } else {
      app.showAlert('error')
      console.log('error')
    }
    // window.location.href = "/form";
  }

  //здесь логика отправки запроса для поиска уже зарегистрированного юзера 
  const handleOldUser = () => {

  }

  return (
    <div className="h-screen w-full text-center pt-4 flex items-center justify-center flex-col">
        <h1>your first time here?</h1>
        <h1>{initDataRaw}</h1>
        <button className="myBtn" onClick={handleNewUser}>yes</button>
        <button className="myBtn" onClick={handleOldUser}>no, log in</button>
    </div>
  )
}

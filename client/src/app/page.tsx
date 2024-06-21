"use client";

import { useContext, useEffect } from "react";
import { webAppContext } from "./context";
import Link from "next/link";

export default function Home() {
  const app = useContext(webAppContext).appRef.current;

  useEffect(() => {
    setTimeout(() => {
      app.setHeaderColor('#A4E31D')
    }, 3000)
  }, [])

  return (
    <>
      {app.version ? (
        <div className="h-full w-full text-center pt-4 flex flex-col">
          {/* <code className="dark:text-white">{app.colorScheme}</code> */}
          <h3 className="font-bold mb-1 text-xl">
            hey, {app.initDataUnsafe.user?.first_name}!
          </h3>
          <h4>welcome to doggo app</h4>
          <Link href="/book"><button className='myBtn'>GO TO BOOK</button></Link>
          <Link href="/profile"><button className='myBtn'>GO TO PROFILE</button></Link>
          <Link href="/form"><button className='myBtn'>GO TO FORM</button></Link>
          <button className='myBtn' onClick={() => app.expand()}>Full screen</button>
          <button className='myBtn' onClick={() => app.setHeaderColor('#FF7F22')}>headerColor</button>
          <button className='myBtn' onClick={() => app.BackButton.hide()}>hide back button</button>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}

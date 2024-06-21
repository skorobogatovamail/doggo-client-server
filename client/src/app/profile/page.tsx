"use client";

import React, { useLayoutEffect } from "react";

export default function Profile() {
  // const { user } = useAuth();

  // вместо протектед роутер в каждом жлементе где нужна защита придется писать это!
//   useLayoutEffect(() => {
//     if (!user) {
//       redirect("/");
//     }
//   }, []);

  return (
  <div className="flex items-center flex-col">
    this is profile page
  </div>);
}

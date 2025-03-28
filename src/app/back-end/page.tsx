"use client";
import React, { useEffect, useState } from "react";
const Page = () => {
  const [fetchData, setFetchData] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:4000/");
      const data = await res.json();
      setFetchData(data);
    };
    getData();
  }, []);
  return <div>{fetchData?.text}</div>;
};

export default Page;

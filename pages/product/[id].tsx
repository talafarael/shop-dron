import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import "./product.scss";
import TextCard from "@/components/TextCard/textCard";
import { INewData } from "@/type/newData";
import CardImg from "@/components/CardImg/cardImg";
import fetchData from "@/api/getApiProduct";

export default function Main() {
  const [newData, setNewData] = useState<INewData | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [isMounted, setIsMounted] = useState<boolean>(true);
  useEffect(() => {
    setIsMounted(true);

    fetchData(id, isMounted, setNewData);

    return () => {
      setIsMounted(false);
    };
  }, [id]);
  console.log(newData);
  return (
    <div className="containerProduct">
      <div className="conainerForProduct">
        <div className="imgContainer">
          {newData ? <CardImg img={newData.img} /> : <h1>load</h1>}
        </div>
        <div className="informationContainer">
          <TextCard newData={newData} />
        </div>
      </div>
    </div>
  );
}

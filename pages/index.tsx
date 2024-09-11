// import fetchGet from "@/src/api/getApiProduct";

import Card from "@/components/card/card";
import { db } from "../utils/firebase";
interface INewData {
  id: string;
  imgMain: string;
  name: string;
  description: string;
  price: string;
  img:string[];
}
export default function main({ newData }: { newData: INewData[] }) {
  console.log(newData);
  return (
    <div>
      {newData.map((element)=>(<Card key={element.id} data={element} />))}
      <Card data={newData[0]}/>
    </div>
  );
}

import { collection, getDocs } from "firebase/firestore";
export const getStaticProps = async () => {
  const newData = await getDocs(collection(db, "id")).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(newData);
    return newData;
  });
  return {
    props: { newData },
  };
};

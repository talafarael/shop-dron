"use client";
import { ICategory } from "@/type/ICategory";
import React, { useEffect, useState } from "react";
import "./menu.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useResize } from "@/utils/screenSize";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import phone from "@/public/phone-svgrepo-comWhite.svg"
export default function Menu({
  activeMenu,
  setActiveMenu
}: // setActiveMenu,
{
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  activeMenu: boolean;
}) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  const { width } = useResize();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const newCategoryData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as ICategory[];

        setCategories(newCategoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  const handlerCloseMenu=()=>{
    setActiveMenu(false)
  }

  return (
    <>
      {(width && width > 1100) || activeMenu ? (
        <div className="menuContainer">
          <div className="categoryContainer">
            <Link
            onClick={()=> handlerCloseMenu()}
              href={`/`}
              className={
                router.pathname == "/"
                  ? `activeCategoryDiv categoryDiv`
                  : `categoryDiv`
              }
            >
              Усі товари
            </Link>
            {categories?.map((elem: ICategory) => (
              <Link
              onClick={()=> handlerCloseMenu()}
                href={`/category/${elem.category}`}
                className={
                  id == elem.category
                    ? `activeCategoryDiv categoryDiv`
                    : `categoryDiv`
                }
                key={elem.id}
              >
                {elem.category}
              </Link>
            ))}
          </div>
          {width && width < 1100 &&      <div className="contantHeader">
        <Image src={phone} alt='phone' 
        width={20}
        height={20}/>
     <h3>+380984884824</h3></div>}
    
        </div>
      ) : null}
    </>
  );
}

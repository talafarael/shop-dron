"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./inputContainer.css";
import Image from "next/image";
import checkMark from "@/public/check-mark.png";
import Button from "../Button/button";
import { NovaPoshtaSearch } from "@/utils/hooks/novaPoshtaSearch";
import { sendMessageToTelegram } from "@/utils/telegram";
// import component from "@/public/Component1.svg";
type Inputs = {
  Name: string;
  Number: number;
  Deliver: string;
};
interface IAddress {
  Number: string;
  Description: string;
  SettlementDescription: string;
}
export default function InputContainer() {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [deliver, setDeliver] = useState<string | undefined>();
  const [address, setAddress] = useState<IAddress[] | undefined>();
  const [stateAddress, setStateAddress] = useState<boolean>(true);
  const [constAddress, setConstAddress] = useState<IAddress | undefined>();
  const [typeDeliver, setTypeDeliver] = useState<string>("нова почта");
  const [isEnter, setIsEnter] = useState(false);
  const [panelResponse, setPanelResponse] = useState(false);
  NovaPoshtaSearch({
    deliver,
    setStateAddress,
    setConstAddress,
    typeDeliver,
    setAddress,
    setDeliver,
    isEnter,
  });
  const handlerSetAddress = (data: string, newAddress: IAddress) => {
    setIsEnter(true);
    setDeliver(data);
    setConstAddress(newAddress);
    setStateAddress(false);
    setTimeout(() => setIsEnter(false), 0);
  };
  const handlerClear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeDeliver(event.target.value);

    setDeliver("");
    setStateAddress(true);
    setAddress(undefined);
    setConstAddress(undefined);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const localOrder = localStorage.getItem("order");
    const order = localOrder ? JSON.parse(localOrder) : [];
    if (order.length >= 1) {
      constAddress ||
        (address?.length == 1 &&
          sendMessageToTelegram({
            data: data,
            constAddress: constAddress ? constAddress : address[0],
          }).then(() => {
            setDeliver("");
            reset();
            setPanelResponse(true);
          }));
    }else{
      // alert("товаров нет)))")
    }
  };
  return (
    <div className="inputContainerForm">
      {!panelResponse ? (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="titleForm"> Форма заказа</h1>
          <input
            {...register("Name", {
              required: "заповніть поле",
              minLength: {
                value: 5,
                message: "Будь ласка, введіть імя",
              },
            })}
            type="text"
            className="input"
            placeholder={"ПІБ"}
          />
          <div className="error">
            {errors?.Name && typeof errors.Name.message === "string" && (
              <p className="textError">{errors.Name.message}</p>
            )}
          </div>
          <input
            className="input "
            {...register("Number", {
              required: "заповніть поле",
              pattern: {
                value: /^([0-9]{10}|[0-9]{12})$/,
                message: "Будь ласка, введіть правильний номер телефону",
              },
            })}
            type="tel"
            placeholder={"номер телефону"}
          />
          <div className="error">
            {errors?.Number &&
              !errors?.Name &&
              typeof errors.Number.message === "string" && (
                <p className="textError">{errors.Number.message}</p>
              )}
          </div>
          <select
            className="input radioInput"
            {...register("Deliver", {
              required: true,
              onChange: (event) => handlerClear(event),
            })}
          >
            <option value="нова почта">нова почта</option>
            <option value="укр почка">укр почка</option>
          </select>
          <div className="inputDiv">
            <input
              className="input"
              type="text"
              placeholder="місто номер "
              value={deliver}
              onKeyPress={(event) => {
                if (event.key === "Enter" && address?.length == 1) {
                  handlerSetAddress(
                    `${address[0].SettlementDescription} ${address[0].Number}`,
                    address[0]
                  );
                }
              }}
              onChange={(e) => setDeliver(e.target.value)}
            />
            <div className="addressContainer">
              {stateAddress &&
                address?.map((elem, index) => (
                  <p
                    onClick={() =>
                      handlerSetAddress(
                        `${elem.SettlementDescription} ${elem.Number}`,
                        elem
                      )
                    }
                    className="itemAddress"
                    key={index}
                  >
                    {elem.Description}
                  </p>
                ))}
              {constAddress?.Description}
            </div>
          </div>
          <Button func={() => {}} text="купить"></Button>
        </form>
      ) : (
        <div className="orderResponse">
          <Image src={checkMark} alt="checkMark" width={70} height={70}></Image>

          <h1 className="titleForm titleResponse">
            Вітаю замовлення успішно оформлене
          </h1>
          <p className="subtitleForm">
            Менеджер зв’яжеться з вами протягом доби{" "}
          </p>
        </div>
      )}
    </div>
  );
}

import { Outlet } from "react-router-dom";

import Circle from "../../components/Circle";
import Card from "../../components/Card";

import loginPageImage from "../../assets/images/loginPageImage.png";

function LoginPage() {
  return (
    <>
      <div className="w-full h-screen flex justify-center overflow-hidden">
        <div className="hidden maxSize:block grow bg-primary" />

        <div className="max-w-[90rem] w-full flex">
          <div className="bg-primary h-screen w-2/5 min-w-[20rem] max-w-[24rem] flex relative">
            <Card
              size="w-[80%] max-w-[23rem] min-h-[24rem]"
              color="bg-secondry"
              position="self-center mx-auto"
              extra="flex-col"
            >
              <Outlet />
            </Card>
            <Circle
              size="w-[30%]"
              color="bg-accent"
              position="-right-6 top-28 z-0"
            />
            <Circle
              size="w-[5%]"
              color="bg-primary"
              position="-right-8 top-24 z-0"
            />
            <Circle
              size="w-[10%]"
              color="bg-primary"
              position="-right-16 top-32 z-0"
            />
            <Circle
              size="w-[15%]"
              color="bg-accent"
              position="-right-24 top-16 z-0"
            />
          </div>
          <div className="grow flex justify-center">
            <div className="self-center relative max-w-4xl ">
              <img src={loginPageImage} alt="People Readin" />
              <Circle
                size="w-[60%]"
                color="bg-accent"
                position="-top-24 -right-28"
              />
              <Circle
                size="lg:w-[10%] w-[15%]"
                color="bg-secondry"
                position="-bottom-5 right-10 -z-10"
              />
              <Circle
                size="lg:w-[7%] w-[10%]"
                color="bg-accent"
                position="-bottom-10 right-28 lg:right-32 z-10"
              />
              <Circle
                size="lg:w-[4%] w-[5%]"
                color="bg-accent"
                position="-bottom-10 right-3 z-10"
              />
              <div className="" />
            </div>
          </div>
        </div>
        <div className="hidden maxSize:block grow" />
      </div>
    </>
  );
}

export default LoginPage;

import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import Victory from "../../assets/victory.svg";
import { Tabs, TabsList } from "../../components/ui/tabs";

const Auth = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory-image" className="h-25" />
            </div>
            <p className="font-medium text-center">
              Fill In the Details to Get Started
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs>
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login"></TabsContent>
              <TabsContent value="register"></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

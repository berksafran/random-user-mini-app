import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div id="container" className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      {children}
    </div>
  );
};

export default Container;

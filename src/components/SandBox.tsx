import { FunctionComponent } from "react";

interface SandBoxProps {}

const SandBox: FunctionComponent<SandBoxProps> = () => {
  return (
    <>
      <h1 className="display-1 text-center">
        This area is accessible to admin users only and is currently under
        development. <br /> Please accept our apologies.
      </h1>
    </>
  );
};

export default SandBox;

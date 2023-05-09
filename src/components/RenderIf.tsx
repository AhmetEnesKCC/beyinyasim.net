import { PropsWithChildren } from "react";

const RenderIf: React.FC<PropsWithChildren<{ condition: boolean }>> = ({
  children,
  condition,
}) => {
  if (!condition) {
    return <></>;
  } else {
    return <>{children}</>;
  }
};

export default RenderIf;

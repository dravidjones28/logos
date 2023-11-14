import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface LGBox {
  children: ReactNode;
}
const LGBox = ({ children }: LGBox) => {
  return <Box pt="68px">{children}</Box>;
};

export default LGBox;

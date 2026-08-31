import { Box } from "@mui/material";
import { ReactNode } from "react"
import { PageFooter } from "./PageFooter";

type PageContainerProps = {
  maxWidth?: number;
  children: ReactNode;
  reload?: () => void;
}

export function PageContainer({ children, maxWidth = 1200, reload }: PageContainerProps) {
  return (
    <Box sx={{ p: 2, pt: 8, display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
      <Box sx={{ flex: 1, maxWidth: maxWidth, width: "100%" }}>
        {children}
      </Box>
      
      <PageFooter reload={reload} />
    </Box>
  )
}

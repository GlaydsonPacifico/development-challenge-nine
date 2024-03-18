import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  return (
    <>
    <Header />
      <Box component="section" sx={{ p: 2 }}>
      <Outlet />
    </Box>
    </>
  )
}
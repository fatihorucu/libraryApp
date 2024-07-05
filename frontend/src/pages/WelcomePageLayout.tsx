import { Stack, Box, AspectRatio } from "@mui/joy";
import { Outlet } from "react-router-dom";
import UniImg from "../assets/university_img2.jpg";
function WelcomePageLayout() {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} gap={10}>
        <Box width={"55%"}>
          <AspectRatio
            ratio={1}
            objectFit="cover"
            minHeight={768}
            sx={{ borderRadius: "sm" }}
          >
            <img src={UniImg} alt="Bogazici University" />
          </AspectRatio>
        </Box>
        <Box width={"35%"}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}

export default WelcomePageLayout;

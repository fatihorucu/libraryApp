import {
  Box,
  List,
  ListItem,
  ListDivider,
  ListItemButton,
  Dropdown,
  Menu,
  MenuItem,
  MenuButton,
  Typography,
  Avatar,
  AspectRatio,
} from "@mui/joy";
import { Home, Person } from "@mui/icons-material";
import { AuthenticatedUser } from "../../models/authenticatedUser";

interface NavbarProps {
  authenticatedUser: AuthenticatedUser | null;
}

function NavBar({ authenticatedUser }: NavbarProps) {
  return (
    <>
      <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
        <List role="menubar" orientation="horizontal">
          <ListItem role="none">
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
              aria-label="Home"
            >
              <Box sx={{ width: 50, height: 50 }}>
                <AspectRatio ratio={1} sx={{ backgroundColor: "transparent" }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/7/76/Bo%C4%9Fazi%C3%A7i_University_logo.svg"
                    alt="Bogazici University Logo"
                  />
                </AspectRatio>
              </Box>
            </ListItemButton>
          </ListItem>

          <ListItem role="none">
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
            >
              Products
            </ListItemButton>
          </ListItem>

          <ListItem role="none">
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
            >
              Blog
            </ListItemButton>
          </ListItem>
          <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
            <Dropdown>
              <MenuButton endDecorator={<Avatar />} variant="plain">
                User
              </MenuButton>
              <Menu>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Dropdown>
          </ListItem>
        </List>
      </Box>
    </>
  );
}

export default NavBar;

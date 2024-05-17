import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";

// import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconPassword, IconSettings } from "@tabler/icons-react";
import { RESET_STATE } from "store/actions";
import LogOutConfirmationDialog from "ui-component/LogOutConfirmationDialog";
import ChangePasswordModal from "./ChangePasswordModal";
import Notification from "helper/Notification";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    Notification("success", "Logged out successfully");
    localStorage.clear();
    dispatch({ type: RESET_STATE });
    navigate("/pages/login/login3");
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };

  const handleListItemClick = (event, index, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutConfirmation = () => {
    // Close the logout dialog
    setLogoutDialogOpen(false);
    // Perform logout action
    handleLogout();
  };

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            // src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            // size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        {/* <Typography variant="h4">Good Morning,</Typography> */}
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          {/* Johne Doe */}
                          {user.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: "100%",
                      maxHeight: "calc(100vh - 250px)",
                      overflowX: "hidden",
                    }}
                  >
                    <Box>
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                        }}
                      >
                        <ListItemButton
                          selected={selectedIndex === 3}
                          onClick={handleOpenChangePassword}
                        >
                          <ListItemIcon>
                            <IconPassword stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                Change Password
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 4}
                          // onClick={handleLogout}
                          onClick={() => setLogoutDialogOpen(true)} // Open logout confirmation dialog
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={handleCloseChangePassword}
      />

      <LogOutConfirmationDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogoutConfirmation}
      />
    </>
  );
};

export default ProfileSection;

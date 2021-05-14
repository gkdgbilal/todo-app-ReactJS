import {
    AppBar,
    Badge,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import clsx from "clsx";
import {
    AccountCircle, AddCircleOutline,
    ChevronLeft, EditOutlined, ListOutlined,
    Menu as MenuIcon,
    Notifications,
} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    active: {
        background: theme.palette.action.selected
    }
}));


export default function Header() {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    let isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }
    return <>
        <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Todo - App
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <Notifications/>
                    </Badge>
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            {/*<MenuItem onClick={handleLogoutDialog}>Log Out</MenuItem>*/}
        </Menu>
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
            }}
            open={drawerOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawer}>
                    <ChevronLeft/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem
                    button
                    component={NavLink}
                    activeClassName={classes.active}
                    exact
                    to="/">
                    <ListItemIcon>
                        <ListOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="Todo-List"/>
                </ListItem>
                <ListItem
                    button
                    component={NavLink}
                    activeClassName={classes.active}
                    to="/todos">
                    <ListItemIcon>
                        <AddCircleOutline/>
                    </ListItemIcon>
                    <ListItemText primary="Todo-Add"/>
                </ListItem>
                <ListItem
                    button
                    component={NavLink}
                    activeClassName={classes.active}
                    to="/edit/:id">
                    <ListItemIcon>
                        <EditOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="Todo-Edit"/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <div>
                    <ListSubheader inset>Todo - App</ListSubheader>
                </div>
            </List>
        </Drawer>
    </>
}
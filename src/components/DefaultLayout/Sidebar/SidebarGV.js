import * as React from 'react';
import { styled, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WatchIcon from '@mui/icons-material/Watch';
import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EventIcon from '@mui/icons-material/Event';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PercentIcon from '@mui/icons-material/Percent';
import { withRouter } from 'react-router-dom';
import './Sidebar.scss';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: '#292929', // Đổi màu background của AppBar thành màu xanh dương
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const theme = createTheme();

class MiniDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    componentDidMount() {
        window.onpopstate = () => {
            // window.location.reload();
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleWatch = () => {
        this.props.history.push('/dienthoai');
        window.location.reload();
    };

    handleHome = () => {
        this.props.history.push('/menu');
        window.location.reload();
    };

    handleBrand = () => {
        this.props.history.push('/khachhang');
        window.location.reload();
    };

    handleLine = () => {
        this.props.history.push('/phieudat');
        window.location.reload();
    };

    handleOrder = () => {
        this.props.history.push('/hoadon');
        window.location.reload();
    };

    handleGift = () => {
        this.props.history.push('/quatang');
        window.location.reload();
    };

    handleVoucher = () => {
        this.props.history.push('/voucher');
        window.location.reload();
    };

    handleLoai = () => {
        this.props.history.push('/loai');
        window.location.reload();
    };

    handleHang = () => {
        this.props.history.push('/hang');
        window.location.reload();
    };

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
        window.location.reload();
    };

    render() {
        const { open } = this.state;

        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            SK
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <div className="btn-container">
                            <ListItem key="Home" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleHome}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleWatch}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AssignmentIndOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Điện thoại" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleBrand}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Khách hàng" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleVoucher}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <PercentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mã giảm giá" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleGift}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <CardGiftcardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Quà tặng" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleLoai}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FormatListBulletedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Loại" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleHang}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <BrandingWatermarkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Hãng" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleLine}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ClassOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Phiếu đặt" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleOrder}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AttachMoneyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Hoá đơn" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>

                            {/* logout */}
                            <ListItem key="Watch" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={this.handleLogout}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    className="logout-button"
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </div>
                    </List>
                    <Divider />
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                </Box>
            </Box>
        );
    }
}

export default withRouter(MiniDrawer);

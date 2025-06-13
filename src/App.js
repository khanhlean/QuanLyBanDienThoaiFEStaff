import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from '@/components/Auth/Login';
import Menu from './components/Menu/Menu';
import DienThoai from './components/Pages/DienThoai';
import KhachHang from './components/Pages/KhachHang';
import MonHoc from './components/Pages/PhieuDat';
import LopTinChi from './components/Pages/HoaDon';
import Loai from './components/Pages/Loai';
import Hang from './components/Pages/Hang';
import QuaTang from './components/Pages/QuaTang';
import Voucher from './components/Pages/Voucher';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/menu" component={Menu} />
                <Route path="/dienthoai" component={DienThoai} />
                <Route path="/loai" component={Loai} />
                <Route path="/hang" component={Hang} />
                <Route path="/khachhang" component={KhachHang} />
                <Route path="/phieudat" component={MonHoc} />
                <Route path="/hoadon" component={LopTinChi} />
                <Route path="/voucher" component={Voucher} />
                <Route path="/quatang" component={QuaTang} />
            </Switch>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from '@/components/Auth/Login';
import Menu from './components/Menu/Menu';
import DienThoai from './components/Pages/DienThoai';
import SinhVien from './components/Pages/KhachHang';
import MonHoc from './components/Pages/PhieuDat';
import LopTinChi from './components/Pages/HoaDon';
import Loai from './components/Pages/Loai';
import Hang from './components/Pages/Hang';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/menu" component={Menu} />
                <Route path="/dienthoai" component={DienThoai} />
                <Route path="/loai" component={Loai} />
                <Route path="/hang" component={Hang} />
                <Route path="/khachhang" component={SinhVien} />
                <Route path="/phieudat" component={MonHoc} />
                <Route path="/hoadon" component={LopTinChi} />
            </Switch>
        </Router>
    );
}

export default App;

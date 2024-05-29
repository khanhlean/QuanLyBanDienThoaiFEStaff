import SidebarGV from './Sidebar/SidebarGV';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div>
            <SidebarGV />
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="content">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;

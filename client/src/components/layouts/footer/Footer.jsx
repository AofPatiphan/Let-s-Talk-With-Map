import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './footer.css';

function Footer() {
    const { userData } = useContext(UserContext);

    return (
        <>
            <div className="footer">
                <Link to={'/'} className="footerIcon">
                    <i className="bi bi-house"></i>
                </Link>
                <Link to={'/search'} className="footerIcon">
                    <i className="bi bi-map"></i>
                </Link>
                <Link to={'messenger'} className="footerIcon">
                    <i className="bi bi-chat"></i>
                </Link>
                <Link
                    to={`/profile/${userData.username}`}
                    className="footerIcon"
                >
                    <i className="bi bi-person"></i>
                </Link>
            </div>
        </>
    );
}

export default Footer;

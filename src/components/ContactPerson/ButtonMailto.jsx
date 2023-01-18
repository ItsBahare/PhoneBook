import React from "react";
import { Link } from "react-router-dom";
import './PhoneBook.css'

const ButtonMailto = ({ mailto, label }) => {
    return (
        <Link
        className="link"
            to='#'
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};

export default ButtonMailto;
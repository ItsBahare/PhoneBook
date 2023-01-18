import React from "react";
import { Link } from "react-router-dom";
import"./PhoneBook.css";

const ButtonTel = ({ tel, label }) => {
    return (
        <Link
        className="link"
            to='#'
            onClick={(e) => {
                window.location.href = tel;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};

export default ButtonTel;
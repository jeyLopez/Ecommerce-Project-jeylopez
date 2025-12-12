
import React from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

export const Card = ({ id, name, price, image, isFavorite, onToggleFavorite, onAddToCart }) => {


    return (
        <div className="card border-0" style={{ maxWidth: "320px" }}>
            <Link
                to={`/product/${id}`}
                className="text-decoration-none text-dark"
            >
                <div
                    className="position-relative"
                    style={{
                        height: "220px",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={"https://picsum.photos/600/400"}
                        alt={name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />


                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onToggleFavorite) onToggleFavorite();
                        }}
                        className="border-0 bg-transparent p-0"
                        style={{
                            position: "absolute",
                            top: "0.5rem",
                            right: "0.5rem",
                            fontSize: "1.2rem",
                        }}
                    >
                        <i
                            className={
                                isFavorite
                                    ? "fa-solid fa-heart text-danger"
                                    : "fa-regular fa-heart text-white"
                            }
                        ></i>
                    </button>
                </div>

                <div className="card-body px-0">
                    <h6 className="mb-1">{name}</h6>
                    <p className="mb-0 fw-semibold">{price}</p>
                </div>
            </Link>

            <button type="button" onClick={(e) => {
                e.preventDefault(); e.stopPropagation(); if (onAddToCart) onAddToCart({ id, name, price, image });
            }} className="btn btn-dark w-25 mt-2"><MdAddShoppingCart className="" color="white" /></button>
        </div>
    );
};
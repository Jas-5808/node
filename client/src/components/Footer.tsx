import React from "react";
import cn from "./mainCss.module.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination';


const Footer = () => {
    const handleSocialClick = async (link) => {
        try {
            const response = await fetch(`http://localhost:3000/api/click`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при записи клика');
            }

            const result = await response.json();
            console.log(`Клик по ${link} записан:`, result);
        } catch (error) {
            console.error('Ошибка при записи клика:', error);
        }
    };

    return (
        <>
            <footer className={cn.footer}>
                <div className="container">
                    <div className={cn.footer_content}>
                        <h4>Copyright © 2024 Iftixor Dental Clinic</h4>

                        <ul>
                            <li>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleSocialClick('instagram')}
                                >
                                    <img src="icons/instagram.png" alt="Instagram" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleSocialClick('facebook')}
                                >
                                    <img src="icons/facebook.png" alt="Facebook" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleSocialClick('telegram')}
                                >
                                    <img src="icons/telegram.png" alt="Telegram" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
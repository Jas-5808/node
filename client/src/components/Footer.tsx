import React from "react";
import cn from "./mainCss.module.scss";

const Footer = () => {
    const handleSocialClick = async (link) => {
        try {
            const response = await fetch(`https://dentalclinic.uz/api/click`, {
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
                        <h4>Copyright © 2025 Dental Clinic</h4>

                        <ul>
                            <li>
                                <a
                                    href="https://www.instagram.com/dr.kamoliddin.uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
                                    href="https://t.me/dr_komoliddin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleSocialClick('telegram')}
                                >
                                    <img src="icons/telegram.png" alt="Telegram" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleSocialClick('youtube')}
                                >
                                    <img src="icons/youtube.png" alt="YouTube" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+998777371118"
                                    onClick={() => handleSocialClick('phone')}
                                >
                                    <img src="icons/phone-icon.png" alt="Позвонить" />
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
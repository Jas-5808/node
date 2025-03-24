import React, { useEffect, useState } from "react";
import cn from "./mainCss.module.scss";
import { useTranslation } from 'react-i18next';

const Header = () =>{
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const languages = [
        { name: "Russia", flag: "./icons/Russia.png", code: "ru" },
        { name: "Uzbekistan", flag: "./icons/Uzbekistan.png", code: "uz" },
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("language") || "ru";
        return languages.find(lang => lang.code === savedLanguage) || languages[0];
    });

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage.code);
    }, [selectedLanguage, i18n]);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        i18n.changeLanguage(language.code);
        localStorage.setItem("language", language.code);
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault(); 
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" }); 
        }
    };
    return (
        <>
            <header className={cn.header}>
                <div className="container">
                    <div className={cn.header_content}>
                        <div className={cn.h_content}>
                            <div className={cn.logo}>
                                <div
                                    className={`${cn.burger} ${isMenuOpen ? cn.active : ''}`}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <span></span>
                                </div>
                                <img src="./img/Dentalclinic.png" alt="logo" />
                            
                            </div>
                            <ul className={`${cn.list} ${isMenuOpen ? cn.active : ''}`}>
                                <li><a href="#home" onClick={(e) => handleScroll(e, "home")}>{t('Главная')}</a></li>
                                <li><a href="#services" onClick={(e) => handleScroll(e, "services")}>{t('Услуги')}</a></li>
                                <li><a href="#about" onClick={(e) => handleScroll(e, "about")}>{t('О нас')}</a></li>
                                <li><a href="#contacts" onClick={(e) => handleScroll(e, "contacts")}>{t('Контакты')}</a></li>
                                <li><a href="#location" onClick={(e) => handleScroll(e, "location")}>{t('Локация')}</a></li>
                            </ul>
                        </div>

                        <div className={cn.header_info}>
                            <div className={cn.language}>
                                <div className={cn.language__trigger}>
                                    <img src={selectedLanguage.flag} alt={selectedLanguage.name} />
                                </div>
                                <div className={cn.language__dropdown}>
                                    {languages.map((lang) => (
                                        <div
                                            key={lang.name}
                                            className={cn.language__item}
                                            onClick={() => handleLanguageChange(lang)}
                                        >
                                            <img src={lang.flag} alt={lang.name} />
                                            <span>{lang.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <a href="#bids" onClick={(e) => handleScroll(e, "bids")}>
                                <button>{t('Оставить заявку')}</button>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
    
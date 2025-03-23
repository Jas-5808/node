import { NavLink } from "react-router-dom";
import cn from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination';

export function MainPage(){
    const { t } = useTranslation();
    const [phone, setPhone] = useState("");

    const handleInputChange = (e) => {
      let value = e.target.value.replace(/\D/g, ""); 
  
      if (value.length > 0 && !value.startsWith("998")) {
        value = "998" + value;
      }
  
      if (value.length > 12) value = value.slice(0, 12);
  
      let formatted = "";
      if (value.length > 0) formatted = `+998 `;
      if (value.length > 3) formatted += `(${value.slice(3, 5)}`;
      if (value.length > 5) formatted += `) ${value.slice(5, 8)}`;
      if (value.length > 8) formatted += `-${value.slice(8, 10)}`;
      if (value.length > 10) formatted += `-${value.slice(10, 12)}`;
  
      setPhone(formatted);
    };

    const services = [
        { title: t('Лечение зубов'), desc: t('Качественное и безболезненное решение для здоровья полости рта') },
        { title: 'Лечение зубов', desc: 'Качественное и безболезненное решение для здоровья' },
        { title: 'Лечение зубов', desc: 'Качественное и безболезненное решение для здоровья полости рта' },
        { title: 'Лечение зубов', desc: 'Качественное и безболезненное решение для здоровья полости рта' },
        { title: 'Лечение зубов', desc: 'Качественное и безболезненное решение для здоровья полости рта' },
        { title: 'Лечение зубов', desc: 'Качественное и безболезненное решение для здоровья полости рта' },
        { title: 'Лечение зубов', desc: 'Качественное и безболезненное решение для здоровья полости рта' },
        { title: 'Лечение зубов', desc: 'Качественное и безболезненное решение для здоровья полости рта' },
    ];

    const reviewsData = [
        {
            name: "Dinara Yusubboeva",
            text: t("Очень понравилось, врачи компетентные и внимательные, работают быстро и профессионально. Спасибо за советы!"),
            rating: 5,
            photo: "./img/user2.jpg", 
        },
        {
            name: "Мухиддит Рихсибоев",
            text: t("Очень хорошая стомоталогия Квалифицированные врачи😊 Остальным тоже могу порекомендовать😎"),
            rating: 5,
            photo: "./img/user3.jpg",
        },
        {
            name: "Мадина Юсупова",
            text: t("Приятные цены и высокий уровень обслуживания. Рекомендую всем!"),
            rating: 5,
            photo: "./img/user1.jpg",
        },
        {
            name: "Максим Волков",
            text: t("Очень довольна результатом имплантации. Уютная атмосфера и внимательный персонал."),
            rating: 4,
            photo: "./img/user4.jpg",
        },
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? "./icons/star.svg" : "./icons/star2.svg"}
                    alt={i <= rating ? "Filled star" : "Empty star"}
                    className={cn.star}
                />
            );
        }
        return stars;
    };

    return(
        <>
            <div className={cn.section}>
                <div className="container">
                    <div id="home" className={cn.section_content}>
                        <div className={cn.bg_color}></div>
                        <div className={cn.bg_color2}></div>
                        <div className={cn.section_title}>
                            <div className={cn.section_text}>
                                <h3>{t('Стоматологическая')}</h3>
                                <h1>{t('КЛИНИКА')}</h1>
                                <p>{t('Полный спектр стоматологических услуг: профилактика, лечение, имплантация. Современные технологии и индивидуальный подход.')}</p>
                            </div>
                            <div className={cn.section_link}>
                                <a><img src="./icons/tell.png" alt="" />94 656-85-82</a>
                                <a><img src="./icons/location.png" alt="" />{t('Яккасаройский, ул. Бобура, 87Б/1')}</a>
                            </div>
                            
                        </div>
                        <div className={cn.section_img}>
                            <div className={cn.play}>
                                <img src="./icons/play.svg" alt="play" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cn.few_info}>
                    <div className="container">
                        <div className={cn.few_info_content}>
                            <div className={cn.few_info_card}>
                                <h3>15+</h3>
                                <p>{t('лет успешной работы')}</p>
                            </div>
                            <div className={cn.few_info_card}>
                                <h3>5K+</h3>
                                <p>{t('довольных пациентов')}</p>
                            </div>
                            <div className={cn.few_info_card}>
                                <h3>100%</h3>
                                <p>{t('Опытных специалистов')}</p>
                            </div>
                            <div className={cn.few_info_card}>
                                <h3>50+</h3>
                                <p>{t('видов услуг')}</p>
                            </div>
                        </div>
                        
                    </div>

                </div>

                <div id="services" className="container">
                    <div className={cn.our_services}>
                        <h2>{t('Наши услуги')}</h2>

                        <div className={cn.services_cards}>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={15} 
                                slidesPerView="auto" 
                                centeredSlides={true}
                                navigation
                                pagination={{ clickable: true }}
                                className={cn.swiper}
                            >
                                {services.map((service, index) => (
                                    <SwiperSlide key={index} className={cn.swiper_slide}>
                                        <div className={cn.services_card}>
                                            <div className={cn.ser_card_text}>
                                                <img src="./icons/dental-care.png" alt={service.title} />
                                                <h3>{service.title}</h3>
                                                <div className={cn.line}></div>
                                                <p>{service.desc}</p>
                                            </div>
                                            <a href="#">{t('ЗАПИСАТЬСЯ')}</a>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className={cn.desktop_cards}>
                                {services.map((service, index) => (
                                    <div key={index} className={cn.services_card}>
                                        <div className={cn.ser_card_text}>
                                            <img src="./icons/dental-care.png" alt={service.title} />
                                            <h3>{service.title}</h3>
                                            <div className={cn.line}></div>
                                            <p>{service.desc}</p>
                                        </div>
                                        <a href="#">{t('ЗАПИСАТЬСЯ')}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="about" className={cn.aboutUs}>
                    <div className="container">
                        <div className={cn.bg_color3}></div>
                        <div className={cn.dots}><img src="./icons/Dots.png" alt="" /></div>
                        <div className={cn.abuotUs_content}>
                            <div className={cn.aboutUs_img}>
                                <div className={cn.about_img}><p>{t('О нас')}</p></div>
                            </div>

                            <div className={cn.aboutUs_title}>
                                <div className={cn.line}></div>
                                <h3>{t('О нашей клинике')}</h3>
                                <p>{t('Наша клиника предлагает полный уход за зубами и деснами: от профилактики до сложных процедур. Мы используем передовое оборудование и методики для качественного и комфортного обслуживания. Опытная команда стоматологов и техников гарантирует здоровую и красивую улыбку каждому пациенту.')}</p>
                                    
                                <a href="#">{t('Подробнее')}<img src="./icons/arrow.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="bids" className={cn.signUp}>
                    <div className="container">
                        <div className={cn.signUp_content}>
                            <div className={cn.signUp_title}>
                                <h3>{t('Заявка')}</h3>
                                <form action="">
                                    <input type="text" placeholder={t('Ваше имя')} required/>
                                    <input 
                                    type="tel"
                                    value={phone}
                                    onChange={handleInputChange}
                                    placeholder="+998 (__) ___-__-__"
                                    required
                                    />

                                    <button>{t('Отправить')}</button>
                                </form>
                            </div>
                            
                            <div className={cn.signUp_img}>
                                <div className={cn.bg_color4}></div>
                                <div className={cn.s_img}>
                                    <img src="./icons/bid.png" alt="" />
                                    <h3>{t('Запишитесь сейчас')}</h3>
                                </div>
                            </div>

                        </div> 
                    </div>
                </div>

                <div className={cn.reviews}>
                    <div className="container">
                        <h2>{t('Отзывы о нас')}</h2>
                        <div className={cn.reviews_content}>
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]} 
                                spaceBetween={32}
                                slidesPerView={3}
                                navigation
                                pagination={{ clickable: true }}
                                loop={true} 
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false, 
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1440: { slidesPerView: 3 },
                                }}
                                className={cn.swiper}
                            >
                                {reviewsData.map((review, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={cn.review_card}>
                                            <div className={cn.review_text_wrapper}>
                                                <p className={cn.review_text}>{review.text}</p>
                                            </div>
                                            <div className={cn.review_stars}>{renderStars(review.rating)}</div>
                                            <div className={cn.review_info}>
                                                <span className={cn.review_name}>{review.name}</span>
                                                <img src={review.photo} alt={review.name} className={cn.review_photo} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

                <div id="location" class={cn.filials__map}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.005121775583!2d69.3774787!3d41.3522424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5adc6d7da57%3A0x19b2409d0f8fadd1!2sM-Clinic!5e0!3m2!1sru!2s!4v1742482416453!5m2!1sru!2s"></iframe>
                </div>

                <div id="contacts" className={cn.contact}>
                    <div className="container">
                        <ul>
                            <li>
                                <p><img src="icons/tell.png" alt="" /> {t('Звонить по номеру')}:</p>
                                <a href="#">+998 94 656-85-82</a>
                            </li>
                            <li>
                                <p><img src="icons/email.png" alt="" /> {t('Электронная почта')}:</p>
                                <a href="#">info@iftixordental.uz</a>
                            </li>
                            <li>
                                <p><img src="icons/clock.png" alt="" /> {t('Время работы')}:</p>
                                <span> {t('Пн. – Вс')} {t('с 9:00 до 18:00')}</span>
                            </li>
                            <li>
                                <p><img src="icons/location.png" alt="" /> {t('Наш адрес')}:</p>
                                <span>{t('г. Ташкент, Яккасаройский р-н, ул. Бобура, 87Б/1')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
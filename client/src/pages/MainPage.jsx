import { NavLink } from "react-router-dom";
import cn from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination';
import hmImage from '../../public/img/hm.png';
import aboutImg from '../../public/img/clinic.png';



export function MainPage() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); 


    const services = [
        { title: t('Лечение зубов'), desc: t('Качественное и безболезненное решение для здоровья полости рта'), img: "./icons/oral-health.png" },
        { title: t('Имплантация зубов'), desc: t('Восстановите улыбку с помощью современных технологий'), img: "./icons/teeth.png" },
        { title: t('Виниры'), desc: t('Виниры – это эффективное решение для красивой и ровной улыбки.'), img: "./icons/dental-veneer.png" },
        { title: t('Реставрация зубов'), desc: t('Возвращение красоты и функциональности улыбки'), img: "./icons/teeth-restoration.png" },
        { title: t('Детская стоматология'), desc: t('Лечение зубов ребенка с самого раннего возраста'), img: "./icons/baby-teeth.png" },
        { title: t('Отбеливание зубов'), desc: t('Процедура улучшения цвета зубов и устранения изменений цвета'), img: "./icons/tooth-whitening.png" },
        { title: t('Коронки'), desc: t('Восстановления поврежденных зубов и улучшения их внешнего вида.'), img: "./icons/dental-crown.png" },
        { title: t('Ортодонтия'), desc: t('Восстановление зубов, придание им естественного вида и прочности.'), img: "./icons/braces.png" },
    ];

    const reviewsData = [
        {
            name: "Dinara Yusubboeva",
            text: t("Menga juda yoqdi, shifokorlar malakali va ehtiyotkor, tez va professional ishlaydilar. Maslahat uchun rahmat!"),
            rating: 5,
            photo: "./img/user.jpg", 
        },
        {
            name: "Мухиддит Рихсибоев",
            text: t("Очень хорошая стомоталогия Квалифицированные врачи😊 Остальным тоже могу порекомендовать😎"),
            rating: 5,
            photo: "./img/user.jpg",
        },
        {
            name: "Мадина Юсупова",
            text: t("Ajoyib narxlar va yuqori darajadagi xizmat. Men hammaga tavsiya qilaman!"),
            rating: 5,
            photo: "./img/user.jpg",
        },
        {
            name: "Максим Волков",
            text: t("Очень довольна результатом имплантации. Уютная атмосфера и внимательный персонал."),
            rating: 4,
            photo: "./img/user.jpg",
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            
            const response = await fetch(`http://localhost:3000/api/call`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка при отправке заявки');
            }

            const result = await response.json();
            setSubmitStatus('success');
            setFormData({ name: '', phone: '' });
        } catch (error) {
            console.error('Ошибка:', error);
            setSubmitStatus('error');

        } finally {
            setIsSubmitting(false);
        }
    };
    const handleCallAndScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        window.location.href = "tel:+998946568582"; 
    };
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <>
            <div className={cn.section}>
                <div className="container">
                    <div id="home" className={cn.section_content}>
                        <div className={cn.bg_color}></div>
                        <div className={cn.bg_color2}></div>
                        <div className={cn.section_title}>
                            <div className={cn.section_text}>
                                <img src="./img/Dentalclinic.png" alt="logo" />
                                <h1>{t('Стоматологическая')}</h1>
                                <h3>{t('КЛИНИКА')} 24/7</h3>
                                <p>{t('Полный спектр стоматологических услуг: профилактика, лечение, имплантация. Современные технологии и индивидуальный подход.')}</p>
                            </div>
                            <div className={cn.section_link}>
                                <span>
                                    <img src="./icons/tell.png" alt="" />
                                    <button>
                                        <a href="#" onClick={(e) => handleCallAndScroll(e, "contacts")}>
                                            {t('Звонить по номеру')}
                                        </a>
                                    </button>
                                </span>
                                <span>
                                    <img src="./icons/location.png" alt="" />
                                    <button>
                                        <a href="https://goo.su/amJPUi">{t('Где мы находимся')}</a>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className={cn.section_img} style={{ backgroundImage: `url(${hmImage})` }}></div>
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
                                                <img src={service.img} alt={service.title} />
                                                <h3>{service.title}</h3>
                                                <div className={cn.line}></div>
                                                <p>{service.desc}</p>
                                            </div>
                                            <a href="#" onClick={(e) => handleScroll(e, "bids")}>{t('ЗАПИСАТЬСЯ')}</a>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className={cn.desktop_cards}>
                                {services.map((service, index) => (
                                    <div key={index} className={cn.services_card}>
                                        <div className={cn.ser_card_text}>
                                            <img src={service.img} alt={service.title} />
                                            <h3>{service.title}</h3>
                                            <div className={cn.line}></div>
                                            <p>{service.desc}</p>
                                        </div>
                                        <a href="#" onClick={(e) => handleScroll(e, "bids")}>{t('ЗАПИСАТЬСЯ')}</a>
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
                                <div className={cn.about_img} style={{ backgroundImage: `url(${aboutImg})` }}><p>{t('О нас')}</p></div>
                            </div>
                            <div className={cn.aboutUs_title}>
                                <div className={cn.line}></div>
                                <h3>{t('О нашей клинике')}</h3>
                                <p>{t('это современный медицинский центр, где каждый пациент получает квалифицированную помощь без выходных. Мы предлагаем широкий спектр услуг, включая круглосуточный приём стоматолога. В любое время суток вы можете обратиться за консультацией, лечением или экстренной помощью – мы всегда готовы помочь.')}</p>
                                <a href="https://www.instagram.com/olllayor?igsh=MWcxYjZ2OWw3dm1zcg==">{t('Подробнее')}<img src="./icons/arrow.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="bids" className={cn.signUp}>
                    <div className="container">
                        <div className={cn.signUp_content}>
                            <div className={cn.signUp_title}>
                                <h3>{t('Заявка')}</h3>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t('Ваше имя')}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required

                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder={t("Телефон номер")}
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? t('Отправка...') : t('Отправить')}
                                    </button>
                                </form>
                                {submitStatus === 'success' && (
                                    <p style={{ color: 'green' }}>{t('Заявка успешно отправлена!')}</p>
                                )}
                                {submitStatus === 'error' && (
                                    <p style={{ color: 'red' }}>{t('Ошибка при отправке заявки.')}</p>
                                )}
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

                <div id="location" className={cn.filials__map}>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.855457497325!2d69.2813006!3d41.377224999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bee3975b20d%3A0xc163529244cbdca0!2z0KHRgtC-0LzQsNGC0L7Qu9C-0LPQuNGPIDI0INGH0LDRgdCwIC0g0LvQtdGH0LXQvdC40LUg0Lgg0YPQtNCw0LvQtdC90LjQtSDQt9GD0LHQvtCyINC70Y7QsdC-0Lkg0YHQu9C-0LbQvdC-0YHRgtC4!5e0!3m2!1sru!2s!4v1742735757994!5m2!1sru!2s"></iframe>
                </div>

                <div id="contacts" className={cn.contact}>
                    <div className="container">
                        <ul>
                            <li>
                                <p><img src="icons/tell.png" alt="" /> {t('Звонить по номеру')}:</p>
                                <a href="tel:+998946568582">+998 94 656-85-82</a> 
                            </li>
                            <li>
                                <p><img src="icons/email.png" alt="" /> {t('Электронная почта')}:</p>
                                <a href="mailto:info@iftixordental.uz">info@iftixordental.uz</a>
                            </li>
                            <li>
                                <p><img src="icons/clock.png" alt="" /> {t('Время работы')}:</p>
                                <span>{t('Пн. – Вс')} {t('с 9:00 до 18:00')}</span>
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
    );
}
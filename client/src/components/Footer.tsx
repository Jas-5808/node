import React from "react";
import cn from "./mainCss.module.scss";

const Footer = () =>{

    return (
        <>
           <footer className={cn.footer}>
               <div className="container">
                    <div className={cn.footer_content}>
                        <h4>Copyright © 2024 Iftixor Dental Clinic</h4>

                        <ul>
                            <li><a href="#"><img src="icons/instagram.png" alt="" /></a></li>
                            <li><a href="#"><img src="icons/facebook.png" alt="" /></a></li>
                            <li><a href="#"><img src="icons/telegram.png" alt="" /></a></li>
                        </ul>
                    </div>
               </div>
           </footer>
        </>
    )
}

export default Footer;
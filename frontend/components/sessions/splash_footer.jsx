import React from 'react';

const SplashFooter = () => {
    return (
    <div className="splash-footer">
        <div></div>
        <div></div>
        <a href="https://github.com/georgeliu96" className="github-link footer-link splash-container" target="_blank">
            <img className="splash-icon" src="https://image.flaticon.com/icons/svg/25/25231.svg"/>
            <div className="splash-overlay">
                <b className="github-label footer-label">Github</b>
            </div>
        </a>        

        <a href="https://www.linkedin.com/in/george-liu-740340183/" className="linkedin-link footer-link splash-container" target="_blank">
            <img className="splash-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1024px-Linkedin.svg.png"/>
            <div className="splash-overlay">
                <b className="linkedin-label footer-label">LinkedIn</b>
            </div>
        </a>

        <a href="https://george-liu.com/" className="site-link footer-link splash-container" target="_blank">
            <img src={window.personal} className="splash-icon"/>
            <div className="splash-overlay">
                <b className="footer-label">Portfolio</b>
            </div>
        </a>        


        <div></div>        
        <div></div>        
    </div>
    )
}

export default SplashFooter
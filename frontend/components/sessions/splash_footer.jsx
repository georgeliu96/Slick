import React from 'react';

const SplashFooter = () => {
    return (
    <div className="splash-footer">
        <div></div>
        <div></div>
        <a href="https://github.com/saphknight" className="github-link footer-link"><img className="github-icon" src="https://image.flaticon.com/icons/svg/25/25231.svg"/><b className="github-label footer-label">Github</b></a>
        <a href="https://www.linkedin.com/in/george-liu-740340183/" className="linkedin-link footer-link"><img className="linkedin-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1024px-Linkedin.svg.png"/><b className="linkedin-label footer-label">LinkedIn</b></a>
        <a href="https://saphknight.github.io/" className="site-link footer-link"><img src={window.personal} className="personal-icon"/><b className="site-label footer-label">Personal Site</b></a>
        <div></div>        
        <div></div>        
    </div>
    )
}

export default SplashFooter
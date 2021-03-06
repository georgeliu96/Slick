import React from 'react';

const MessageFooter = () => {
    return (
    <div className="message-footer">
        <a href="https://github.com/georgeliu96" className="message-link message-footer-link splash-container" target="_blank">
            <img className="splash-icon" src="https://image.flaticon.com/icons/svg/25/25231.svg"/>
            <div className="splash-overlay">
                <b className="github-label message-footer-label">Github</b>
            </div>
        </a>

        <a href="https://www.linkedin.com/in/george-liu-740340183/" className="linkedin-link message-footer-link splash-container" target="_blank">
            <img className="splash-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1024px-Linkedin.svg.png"/>
            <div className="splash-overlay">            
                <b className="linkedin-label message-footer-label">LinkedIn</b>
            </div>

        </a>   
        <a href="https://george-liu.com/" className="site-link message-footer-link splash-container" target="_blank">
            <img src={window.personal} className="splash-icon"/>
            <div className="splash-overlay">            
                <b className="site-label message-footer-label">Portfolio</b>
            </div>
        </a>
    </div>
    )
}

export default MessageFooter
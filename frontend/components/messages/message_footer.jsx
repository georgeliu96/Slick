import React from 'react';

const MessageFooter = () => {
    return (
    <div className="message-footer">
        <a href="https://github.com/saphknight" className="github-link message-footer-link">
            <img className="github-icon" src="https://image.flaticon.com/icons/svg/25/25231.svg"/>
            <b className="github-label message-footer-label">Github</b>
        </a>
        <a href="https://www.linkedin.com/in/george-liu-740340183/" className="linkedin-link message-footer-link">
            <img className="linkedin-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1024px-Linkedin.svg.png"/>
            <b className="linkedin-label message-footer-label">LinkedIn</b>
        </a>   
    </div>
    )
}

export default MessageFooter
import timeSince from '../../services/timeSince';
import './message.css';

export default function Message({ own, message }) {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img className="messageImg" src={message.profileUrl} alt="" />
                <p className="messageText">{message.message}</p>
            </div>
            <div className="messageBottom">
                {' '}
                <strong>{timeSince(message.time)}</strong>
            </div>
        </div>
    );
}

import './IconButton.css';
import Icon from '@mdi/react';
import { useState } from 'react';

interface IconButtonProps {
  title: string;
  icon: string;
  iconColor: string;
  buttonClick?: () => unknown;
}

export default function IconButton(props: IconButtonProps) {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <div onMouseEnter={() => setShowTitle(true)} onMouseLeave={() => setShowTitle(false)}>
      <div className="icon-btn-wrapper">
        <button className="icon-btn">
          <Icon size={'48px'} path={props.icon} color={props.iconColor} />
        </button>
      </div>

      {showTitle && <div className="icon-btn-title w-full text-center text-sm">{props.title}</div>}
    </div>
  );
}

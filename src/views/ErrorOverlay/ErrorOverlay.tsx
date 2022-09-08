import { useState } from 'react';
import Popover from 'react-bootstrap/Popover';
import styles from "./ErrorOverlay.module.css";

const ErrorOverlay = (props: { text: string }) => {
  const [ isVisible, setIsVisible ] = useState(true);

  if(!isVisible) { return null }  
  
    return (
        <div className={styles.container} onClick={() => setIsVisible(false)}>
          <Popover id="popover-basic" onClick={e => e.stopPropagation()}>
            <Popover.Header as="h3">Error</Popover.Header>
            <Popover.Body>
              {props.text}
            </Popover.Body>
          </Popover>
        </div>
    )
}

export default ErrorOverlay
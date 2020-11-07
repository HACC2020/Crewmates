import React from 'react';
// import Popper from '@material-ui/core/Popper';
import { Popper as MuiPopper} from '@material-ui/core';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support


const Popper = ({parentComponent, componentToPopover}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const id = open ? 'spring-popper' : undefined;
    
    const parentEl = parentComponent;

    return (
        <div onMouseEnter={handleClick} onMouseLeave={handleClick}>
        {parentEl}
        <MuiPopper placement="left"
                disablePortal={false} 
                id={id} 
                open={open} 
                anchorEl={anchorEl} 
                transition>
            {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
                {componentToPopover}
            </Fade>
            )}
        </MuiPopper>  
        </div>
    );
};

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });

export default Popper;

import { FaUserCircle, FaBars } from "react-icons/fa";
import Link from "next/link";
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';




const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                <div style={{ "color": "#b5c6e0" }} className="p-2  text-center text-xl font-serif font-medium"> <Link href="/"><a>Homepage</a></Link></div>
                <div style={{ "color": "#b5c6e0" }} className="p-2  text-center text-xl font-serif font-medium">Courses</div>
                <div style={{ "color": "#b5c6e0" }} className="p-2  text-center text-xl font-serif font-medium"> <Link href="/freeCourses"><a>Free Courses</a></Link></div>
                <div style={{ "color": "#b5c6e0" }} className="p-2  text-center text-xl font-serif font-medium"> <Link href="/videoChat"><a>Chat room</a></Link></div>
                <div style={{ "color": "#b5c6e0" }} className="p-2  text-center text-xl font-serif font-medium"> <Link href="/about"><a>About</a></Link></div>


            </List>

        </div>
    );

    return (


        <div style={{ "color": "#b5c6e0" }} >  {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                >
                    {list(anchor)}
                </SwipeableDrawer>
            </React.Fragment>
        ))} </div>

    );
}


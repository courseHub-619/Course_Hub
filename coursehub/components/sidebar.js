// import { FaUserCircle, FaBars } from "react-icons/fa";
// import Link from "next/link";
// import React from "react";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import Button from "@material-ui/core/Button";
// import List from "@material-ui/core/List";

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: "auto",
//   },
// });

// export default function SwipeableTemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === "top" || anchor === "bottom",
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         <div
//           style={{ color: "#5F9EA0" }}
//           className="p-2  text-center text-xl font-serif font-medium"
//         >
//           {" "}
//           <Link href="/">
//             <a>Homepage</a>
//           </Link>
//         </div>
//         <div
//           style={{ color: "#5F9EA0" }}
//           className="p-2  text-center text-xl font-serif font-medium"
//         >
//           Courses
//         </div>
//         <div
//           style={{ color: "#5F9EA0" }}
//           className="p-2  text-center text-xl font-serif font-medium"
//         >
//           {" "}
//           <Link href="/freeCourses">
//             <a>Free Courses</a>
//           </Link>
//         </div>
//         <div
//           style={{ color: "#5F9EA0" }}
//           className="p-2  text-center text-xl font-serif font-medium"
//         >
//           {" "}
//           <Link href="/videoChat">
//             <a>Chat room</a>
//           </Link>
//         </div>
//         <div
//           style={{ color: "#5F9EA0" }}
//           className="p-2  text-center text-xl font-serif font-medium"
//         >
//           {" "}
//           <Link href="/about">
//             <a>About</a>
//           </Link>
//         </div>
//       </List>
//     </div>
//   );

//   return (
//     <div style={{ color: "#b5c6e0" }} className="">
//       {" "}
//       {["left"].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <SwipeableDrawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {list(anchor)}
//           </SwipeableDrawer>
//         </React.Fragment>
//       ))}{" "}
//     </div>
//   );
// }

import React from "react";
/* You'll need to install @reach/portal which simplify creating portal*/
import Portal from "@reach/portal";
const DrawerPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 text-gray-500 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        type="button"
        onClick={toggle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <Drawer isOpen={isOpen} toggle={toggle} position="left">
        <DrawerHeader>
          {" "}
          <div class="w-1/2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/coursehub-619.appspot.com/o/posts%2Flogo%20(1).png?alt=media&token=f67f7d72-e742-4fa9-a2d7-1a0e659ff737"
              class="mx-auto w-18 h-16 "
            />
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div class="mt-10 mb-4">
            <ul class="ml-4">
              <li class="mb-2 px-4 py-4 text-gray-900 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <a href="#">
                  <span class="ml-2">profile</span>
                </a>
              </li>
              <li class="mb-2 px-4 py-4 text-gray-900 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
                <span>
                  {/* <svg class="fill-current h-5 w-5 " viewBox="0 0 24 24">
                    <path
                      d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                        4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                        4h4v-4h-4M4 8h4V4H4v4z"
                    ></path>
                  </svg> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <a href="#">
                  <span class="ml-2">Homepage</span>
                </a>
              </li>
              <li class="mb-2 px-4 py-4 text-gray-900 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
                <a href="#">
                  <span class="ml-2">Courses</span>
                </a>
              </li>
              <li class="mb-2 px-4 py-4 text-gray-900 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>
                <a href="#">
                  <span class="ml-2">Free Courses</span>
                </a>
              </li>
              <li class="mb-2 px-4 py-4 text-gray-900 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <a href="#">
                  <span class="ml-2">Chat room</span>
                </a>
              </li>
              <li class="mb-2 px-4 py-4 text-gray-900 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <a href="#">
                  <span class="ml-2">About us</span>
                </a>
              </li>
              <li class="mb-2 px-4 py-4 text-gray-900 flex flex-row object-bottom  border-gray-300 hover:text-black align end  hover:bg-gray-300  hover:font-bold rounded ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <a href="#">
                  <span class="ml-2">Log out</span>
                </a>
              </li>
            </ul>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <button
            onClick={toggle}
            className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Confirm
          </button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};
/* Logic */
const style = {
  orientation: {
    left: `flex md:w-58 lg:w-58 h-full left-0 mx-0 my-0  absolute focus:outline-none `,
  },
  animation: {
    left: "animate-drawer-left ",
  },
  body: `flex-shrink bg-gray-100 flex-grow p-4 `,
  headerTitle: `text-2xl md:text-3xl font-light`,
  content: `relative flex flex-col bg-white pointer-events-auto`,
  header: `items-start bg-gray-100 justify-between p-4 border-b border-gray-300`,
  container: `fixed top-0 left-0 z-40 w-full h-full m-0 overflow-hidden`,
  overlay: `fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50`,
  footer: `flex bg-gray-100 justify-center p-3 border-t border-gray-300`,
};
function Drawer({ children, isOpen, toggle }) {
  const ref = React.useRef(null);
  // close drawer on click outside
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!isOpen) return;
        toggle(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, ref, toggle]);
  // close drawer when you click on "ESC" key
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        toggle(false);
      }
    };
    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [isOpen, toggle]);
  // hide scrollbar and prevent body from moving when drawer is open
  //put focus on drawer dialogue
  React.useEffect(() => {
    if (!isOpen) return;
    ref.current?.focus();
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      html.style.overflow = "";
      html.style.paddingRight = "";
    };
  }, [isOpen]);
  return (
    <Portal>
      {isOpen && (
        <>
          <div className={style.overlay} />
          <div className={style.container}>
            <div
              aria-modal={true}
              className={style.orientation.left}
              ref={ref}
              role="dialogue"
              tabIndex={-1}
            >
              <div className={`${style.animation.left} ${style.content}`}>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </Portal>
  );
}
function DrawerHeader({ children }) {
  return (
    <div className={style.header}>
      <h4 className={style.headerTitle}>{children}</h4>
    </div>
  );
}
function DrawerBody({ children }) {
  return <div className={style.body}>{children}</div>;
}
function DrawerFooter({ children }) {
  return <div className={style.footer}>{children}</div>;
}

export default DrawerPage;

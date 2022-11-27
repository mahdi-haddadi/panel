import { lazy } from "react";
import { SidebarProvider } from "../components/sidebar/context/SidebarContext";
import Sidebar from "../components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import Container from "../components/container/Container";

const Main = lazy(() => import("./../screens/main/Main"));
const AddAdmin = lazy(() => import("../screens/manageAdmin/AddAdmin"));
const Admins = lazy(() => import("../screens/manageAdmin/Admins"));
const Pages = lazy(() => import("../screens/pages/Pages"));
const AddNewPages = lazy(() => import("../screens/pages/AddNewPage"));
const Blogs = lazy(() => import("../screens/blogs/Blogs"));
const AddNewBlog = lazy(() => import("../screens/blogs/AddNewBlog"));
const Chats = lazy(() => import("../screens/chat/Chat"));
const NotFound = lazy(() => import("../screens/404/NotFound"));

const MainLayout = () => {
  const {
    state: isOpenSidebar,
    toggle: toggleSidebar,
    close: closeSidebar,
    open: openSidebar,
  } = useToggle(true);
  return (
    <SidebarProvider
      values={{
        isOpenSidebar,
        toggleSidebar,
        closeSidebar,
        openSidebar,
      }}
    >
      <Sidebar />
      <Container>
        <Routes>
          {/* main */}
          <Route path="/" element={<Main />} />
          {/* admin */}
          <Route path="/admins" element={<Admins />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          {/* page */}
          <Route path="/pages" element={<Pages />} />
          <Route path="/add-new-page" element={<AddNewPages />} />
          {/* blog */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add-new-blog" element={<AddNewBlog />} />
          {/* chat */}
          <Route path="/chats" element={<Chats />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </SidebarProvider>
  );
};

export default MainLayout;

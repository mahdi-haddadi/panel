import {
  AiOutlineComment,
  AiOutlineShoppingCart,
  AiOutlineTeam,
  AiOutlineUser,
  AiTwotoneAppstore,
} from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";
import {
  BsFillCalendarRangeFill,
  BsFillFileEarmarkPostFill,
} from "react-icons/bs";
import {
  MdDashboardCustomize,
  MdOutlineAdminPanelSettings,
  MdSell,
  MdShopTwo,
} from "react-icons/md";
import { HiOutlineChat } from "react-icons/hi";
import { TbShoppingCartDiscount } from "react-icons/tb";

export const sidebarData = [
  {
    id: 1,
    category_fa: "پیشخوان",
    category_en: "Dashboard",
    items: [
      {
        id: 2,
        title_fa: "وضعیت",
        title_en: "Status",
        icon: <AiOutlineTeam />,
        sub: null,
        to: "/",
      },
    ],
  },
  {
    id: 2,
    category_fa: "مدیریت",
    category_en: "Management",
    items: [
      {
        id: 1,
        title_fa: "ادمین",
        title_en: "Admin",
        icon: <MdOutlineAdminPanelSettings />,
        sub: [
          {
            id: 1,
            title_fa: "مشاهده ادمین ها",
            title_en: "Admins",
            to: "/admins",
          },
          {
            id: 2,
            title_fa: "اضافه کردن ادمین",
            title_en: "Add Admin",
            to: "/add-admin",
          },
        ],
      },
      {
        id: 2,
        title_fa: "صفحات",
        title_en: "pages",
        icon: <RiPagesLine />,
        sub: [
          {
            id: 1,
            title_fa: "مشاهده صفحات",
            title_en: "Pages",
            to: "/pages",
          },
          {
            id: 2,
            title_fa: "اضافه کردن صفحه",
            title_en: "Add page",
            to: "/add-new-page",
          },
        ],
      },
      {
        id: 3,
        title_fa: "بلاگ",
        title_en: "Blog",
        icon: <BsFillFileEarmarkPostFill />,
        sub: [
          {
            id: 1,
            title_fa: "مشاهده مقالات",
            title_en: "Blogs",
            to: "/blogs",
          },
          {
            id: 2,
            title_fa: "مقاله جدید",
            title_en: "Add Blog",
            to: "/add-new-blog",
          },
        ],
      },
      {
        id: 4,
        title_fa: "نظرات",
        title_en: "Comments",
        icon: <AiOutlineComment />,
        sub: [
          {
            id: 1,
            title_fa: "بررسی نظرات",
            title_en: "Comments",
            to: "/comments",
          },
        ],
      },
      {
        id: 5,
        title_fa: "محصولات",
        title_en: "Products",
        icon: <AiOutlineShoppingCart />,
        sub: [
          {
            id: 1,
            title_fa: "مشاهده محصولات",
            title_en: "Add Goods",
            to: "/products",
          },
          {
            id: 2,
            title_fa: "اضافه کردن محصول",
            title_en: "Add Product",
            to: "/add-product",
          },
        ],
      },
      {
        id: 6,
        title_fa: "فروش",
        title_en: "Sell",
        icon: <MdSell />,
      },
      {
        id: 7,
        title_fa: "چت",
        title_en: "Chat",
        icon: <HiOutlineChat />,
        to:'/chats'
      },
    ],
  },
  {
    id: 3,
    category_fa: "دیجیتال مارکتینگ",
    category_en: "Digital Marketing",
    items: [
      {
        id: 1,
        title_fa: "مارکتینگ",
        title_en: "Marketing",
        icon: <TbShoppingCartDiscount />,
      },
      {
        id: 2,
        title_fa: "باشگاه مشتریان",
        title_en: "Customers Club",
        icon: <MdDashboardCustomize />,
      },
      {
        id: 3,
        title_fa: "سئو",
        title_en: "SEO",
        icon: <MdShopTwo />,
      },
    ],
  },
  {
    id: 4,
    category_fa: "Cms",
    category_en: "CMS builder",
    items: [
      {
        id: 1,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
      {
        id: 2,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
      {
        id: 3,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
      {
        id: 4,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
      {
        id: 5,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
      {
        id: 6,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
      {
        id: 7,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
      {
        id: 8,
        title_fa: "اپ ساز",
        title_en: "App Builder",
        icon: <AiTwotoneAppstore />,
      },
    ],
  },
];

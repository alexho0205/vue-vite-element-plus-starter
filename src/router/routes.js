const routes = [
    {
        path: "/",
        name: "home",
        title: "首頁",
        component: () => import("@/views/home.vue"),
    },
    {
        path: "/",
        name: "page1",
        title: "page1",
        component: () => import("@/views/page1.vue"),
    },
    {
        path: "/",
        name: "page2",
        title: "page2",
        component: () => import("@/views/page2.vue"),
    },
];

export default routes;
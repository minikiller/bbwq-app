import Vue from "vue";
import Router from "vue-router";
import Lang from "@/components/Lang";
import HelloWorld from "@/components/HelloWorld";
import HomePage from "@/views/home/HomePage";
import LoginPage from "@/views/login/LoginPage";
import Card from "@/components/Card";
// import RegisterPage from "@/views/register/RegisterPage";
// import PlayPage from "@/views/play/PlayPage";
// import KifuPage from "@/views/kifu/KifuPage";
// import CreateGamePage from "@/views/creategame/CreateGamePage";
// import ProfilePage from "@/views/profile/ProfilePage";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import Login from "@/views/login/LoginPage";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { name: "login", path: "/login", component: LoginPage },
    { name: "home", path: "/", component: HomePage },
    // { name: "register",path: "/register", component: RegisterPage },
    // { name: "play",path: "/play/:game_id", component: PlayPage, props: true },
    // { name: "game",path: "/creategame", component: CreateGamePage },
    // { name: "kifu",path: "/kifu", component: KifuPage },
    // { name: "profile",path: "/profile", component: ProfilePage },
    { name: "lang", path: "/lang", component: Lang },
    { name: "card", path: "/card", component: Card },

    // otherwise redirect to home
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register","card"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  } else {
    NProgress.start();
    next();
  }

  // next();
});

// router.beforeEach((to, from, next) => {
//   if (to.path == "/login") {
//     sessionStorage.removeItem("username");
//   }
//   let user = sessionStorage.getItem("username");
//   if (!user && to.path != "/login") {
//     next({ path: "/login" });
//   } else {
//     NProgress.start();
//     next();
//   }
// });

router.afterEach(transition => {
  NProgress.done();
});

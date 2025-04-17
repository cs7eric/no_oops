export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "no_oops",
  description: "欢迎来到 cccs7's no_oops",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Project",
      href: "/project",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Resume",
      href: "/resume",
    },
    {
      label: "About",
      href: "/about",
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Resume",
      href: "/resume",
    },
    {
      label: "Settings",
      href: "/settings",
    }
  ],
  links: {
    github: "https://github.com/cs7eric",
    twitter: "https://x.com/cs7eric",
    blog: "https://cs7eric.github.io/",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

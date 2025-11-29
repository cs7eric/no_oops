import { Button } from "@heroui/button";
import { Link as UILink } from "@heroui/link";
import { NavLink } from "react-router-dom";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  HeartFilledIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NavLink
            className="flex justify-start items-center gap-1"
            to="/"
          >
            <Logo />
            <p className="font-bold text-inherit">no_oops</p>
          </NavLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NavLink
                className={({ isActive }) => clsx(
                  linkStyles({ color: "foreground" }),
                  isActive && "text-primary font-medium"
                )}
                to={item.href}
              >
                {item.label}
              </NavLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <UILink isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </UILink>
          <UILink isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </UILink>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={UILink}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <UILink isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </UILink>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                to={item.href}
                className={clsx(
                  "text-lg",
                  index === 2
                    ? "text-primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "text-danger"
                      : "text-foreground"
                )}
              >
                {item.label}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

"use client";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import NextLink from "next/link";

export default function MobileMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="text-lg font-semibold">Learn More</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* <NextLink href={"/howsquireworks"}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="text-lg font-semibold">How Squire Works</span>
              </NavigationMenuLink>
            </NextLink>
            <NextLink href={"/testimonials"}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="text-lg font-semibold">Testimonials</span>
              </NavigationMenuLink>
            </NextLink>
            <NextLink href={"/pricing"}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="text-lg font-semibold">Pricing</span>
              </NavigationMenuLink>
            </NextLink> */}
            <NextLink href={"/about"}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="text-lg font-semibold">About us</span>
              </NavigationMenuLink>
            </NextLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

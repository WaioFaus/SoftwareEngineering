"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: "Overview",
      active: pathname === `/dashboard/main`,
    },
    {
      href: `/dashboard/billboards`,
      label: "Billboards",
      active: pathname === `/dashboard/billboards`,
    },
    {
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/sizes`,
      label: "Sizes",
      active: pathname === `/dashboard/sizes`,
    },
    {
      href: `/dashboard/colors`,
      label: "Colors",
      active: pathname === `/dashboard/colors`,
    },
    {
      href: `/dashboard/products`,
      label: "Products",
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/orders`,
      label: "Orders",
      active: pathname === `/dashboard/orders`,
    },
    {
      href: `/dashboard/messages`,
      label: "Messages",
      active: pathname === `/dashboard/messages`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

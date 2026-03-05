import { cn } from "@/lib/utils";
import type React from "react";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import {
  CpuIcon,
  UsersIcon,
  TrendingUpIcon,
  LayoutIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

type ItemType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

const icons = [<LayoutIcon key="layout" />, <UsersIcon key="users" />, <CpuIcon key="cpu" />, <TrendingUpIcon key="trending" />];

export async function AboutItems() {
  const t = await getTranslations("AboutItems");
  const rawItems = t.raw("items") as Array<{ title: string; description: string }>;
  const items: ItemType[] = rawItems.map((item, i) => ({
    ...item,
    icon: icons[i],
  }));

  return (
    <div className="mx-auto w-full max-w-5xl place-content-center space-y-12">
      <div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
        <FullWidthDivider position="top" />
        {items.map((item) => (
          <ItemCard item={item} key={item.title} />
        ))}
        <FullWidthDivider position="bottom" />
      </div>
    </div>
  );
}

export function ItemCard({
  item,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  item: ItemType;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden bg-background p-4 md:p-6",
        "before:absolute before:inset-0 before:bg-linear-to-br before:from-muted before:to-background before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 flex items-center pt-4 pb-6",
          "[&_svg]:size-5 [&_svg]:text-primary",
        )}
      >
        {item.icon}
      </div>

      <div className="relative z-10 space-y-2">
        <h3 className="font-medium text-foreground text-lg">{item.title}</h3>
        <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

type BlockProps = React.ComponentProps<"div"> & {
	decorIcons?: boolean;
	dividers?: boolean;
};

function Block({
	children,
	className,
	decorIcons = false,
	dividers = false,
	...props
}: BlockProps) {
	return (
		<div
			data-slot="block"
			className={cn("relative", className)}
			{...props}
		>
			{decorIcons && (
				<>
					<DecorIcon className="size-4" position="top-left" />
					<DecorIcon className="size-4" position="top-right" />
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />
				</>
			)}
			{dividers && <FullWidthDivider position="top" />}
			{children}
			{dividers && <FullWidthDivider position="bottom" />}
		</div>
	);
}

export { Block };

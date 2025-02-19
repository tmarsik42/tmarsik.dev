<script lang="ts">
    import { NavigationMenu } from "bits-ui";
    import {
        FolderGit2,
        House,
        MessageSquareMore,
        UserSearch,
        type Icon as IconType,
        Sun
    } from "lucide-svelte";

    type NavItemProps = {
        title: string;
        href: string;
        icon: typeof IconType;
    };

    const navItems: NavItemProps[] = [
        {
            title: "Home",
            href: "/",
            icon: House
        },
        {
            title: "About me",
            href: "/about-me",
            icon: UserSearch
        },
        {
            title: "Projects",
            href: "/projects",
            icon: FolderGit2
        },
        {
            title: "Contact",
            href: "/contact",
            icon: MessageSquareMore
        }
    ];
</script>

{#snippet NavItem({ title, href, icon: Icon }: NavItemProps)}
    <NavigationMenu.Item class="inline-flex cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-200 ">
        <NavigationMenu.Link {href} class="inline-flex gap-2">
            <Icon />
            <span> {title} </span>
        </NavigationMenu.Link>
    </NavigationMenu.Item>
{/snippet}

<header
    class="sticky top-0 z-10 flex w-full items-center justify-center border-b-1 border-gray-400"
>
    <span>TM</span>
    <NavigationMenu.Root>
        <NavigationMenu.List class="group flex list-none items-center justify-center gap-4 py-2">
            {#each navItems as item}
                {@render NavItem(item)}
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
    <Sun />
</header>

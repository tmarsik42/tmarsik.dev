<script lang="ts">
    import { NavigationMenu } from "bits-ui";

    type NavItemProps = { title: string; href: string };

    const navItems: NavItemProps[] = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "About me",
            href: "/about-me"
        },
        {
            title: "Projects",
            href: "/projects"
        }
    ];
</script>

{#snippet NavItem({ title, href }: NavItemProps)}
    <NavigationMenu.Item>
        <NavigationMenu.Link {href}>
            <span> {title} </span>
        </NavigationMenu.Link>
    </NavigationMenu.Item>
{/snippet}

<header>
    <NavigationMenu.Root>
        <NavigationMenu.List>
            {#each navItems as item}
                {@render NavItem(item)}
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
</header>

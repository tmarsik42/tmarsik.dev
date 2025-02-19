<script>
    import profile from "$lib/assets/profile.jpeg";

    const technologies = [
        "Frontend dev",
        "Svelte",
        "SvelteKit",
        "GraphQL",
        "REST API",
        "Node.js",
        "Git"
    ];
</script>

<style>
    @media print {
        div.cv {
            width: 100%;
            margin: 0;
            padding: 20px;
        }

        section {
            page-break-inside: avoid;
        }
    }
</style>

<div class="cv prose flex min-h-screen max-w-[80ch]">
    <aside class="hidden w-1/3 bg-gray-900 p-6 text-white sm:block">
        <div class="mb-8 flex flex-col justify-center">
            <img src={profile} class="self-center rounded-full" alt="profile" width="100" />
            <a class="font-light text-gray-100" href="mailto:tad.marsik@gmail.com"
                >tad.marsik@gmail.com</a
            >
            <a class="font-light text-gray-100" href="tel:776727167"> 776 727 167 </a>
            <a class="font-light text-gray-100" href="https://www.linkedin.com/in/tmarsik-dev">
                LinkedIn
            </a>
            <a class="font-light text-gray-100" href="https://github.com/tmarsik42"> GitHub </a>
        </div>

        <div>
            <h2 class="text-gray-100">Technologies</h2>
            <ul>
                {#each technologies as technology}
                    <li>{technology}</li>
                {/each}
            </ul>
        </div>
    </aside>

    <main class="flex-1 bg-gray-100 p-8">
        <h1 class="mb-2">Tadeáš Maršík</h1>
        <p class="mt-1 mb-1">Frontend Developer in IT Services & Consulting</p>
        <p class="my-1 mt-1">Ústí nad Labem, Czechia</p>

        <section class="mt-6">
            <h2>Summary</h2>
            <p class="mt-2">
                I’m a frontend developer with 5 years of experience building high-performance web
                applications, visually pleasing websites or, well... both-together. My expertise
                includes JavaScript/TypeScript, Svelte/SvelteKit, and data visualization. When I'm
                not coding, you can find me traveling, exploring, skiing down the slopes or gaming.
                I believe a well-balanced life helps me stay creative and energized for new
                challenges.
            </p>

            <h3 class="mt-4">Skills:</h3>
            <ul>
                <li>Website performance optimization</li>
                <li>Responsive design</li>
                <li>Server-side rendering (SSR)</li>
                <li>Data visualization libraries (elk.js, x6, openlayers)</li>
                <li>Version control with Git (Github and Gitlab)</li>
            </ul>
        </section>

        <section class="mt-6">
            <h2>Education</h2>
            <div>
                <b>Prague University of Economics and Business</b>
                <p class="mt-1 mb-1">Bachelor's degree, Information Technology</p>
                <p class="mt-1 mb-1">August 2018 - June 2022</p>
            </div>
        </section>

        <section class="mt-6">
            <h2>Experience</h2>
            <div class="mb-8">
                <b>TETA s.r.o.</b>
                <p class="mt-1 mb-1">Frontend Web Developer</p>
                <p class="mt-1 mb-1">June 2021 - Present (3 years 9 months)</p>
                <ul>
                    <li>Advanced my expertise in frontend development.</li>
                    <li>Used Typescript and Svelte/SvelteKit from day one.</li>
                    <li>Revamped multiple web apps with a modern tech stack.</li>
                    <li>Created complex data visualizations and data management tools.</li>
                    <li>Refined skills in responsive design, SSR, and performance optimization.</li>
                </ul>
            </div>
            <div class="mb-8">
                <b>Prague University of Economics and Business</b>
                <p class="mt-1 mb-1">IT Specialist</p>
                <p class="mt-1 mb-1">January 2019 - January 2020 (1 year 1 month)</p>
            </div>
            <div class="mb-8">
                <b>PROMA REHA, s.r.o</b>
                <p class="mt-1 mb-1">IT intern</p>
                <p class="mt-1 mb-1">June 2017 - August 2017 (3 months)</p>
            </div>
        </section>
    </main>
</div>

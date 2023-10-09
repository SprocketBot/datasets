<svelte:options customElement={{tag: 'spr-copy-button' }}/>

<script lang="ts">
    import "../app.postcss"
    import {Icon} from "@steeze-ui/svelte-icon";
    import {Clipboard} from "@steeze-ui/tabler-icons"

    function onClick(e: MouseEvent) {
        const {currentTarget} = e;

        if(e.composed) {
            const customComponentIdx = e.composedPath().findIndex(x => x instanceof HTMLElement && customElements.get(x?.localName))
            const target = e.composedPath()[customComponentIdx + 1]
            if (!(target instanceof HTMLElement)) return
            if (target.textContent) navigator.clipboard.writeText(target.textContent)
        } else {
            if (!(currentTarget instanceof HTMLElement)) return
            const {previousElementSibling: prev, nextElementSibling: next} = currentTarget;
            if (!prev && !next) return;
            if (prev?.textContent) navigator.clipboard.writeText(prev.textContent)
            else if (next?.textContent) navigator.clipboard.writeText(next.textContent)
        }
    }
</script>

<!-- Needed for tailwind styles to be properly applied -->
<link href="./assets/dist/style.css" rel="stylesheet"/>

<button on:click={onClick} class="bg-transparent border-0 text-success-200 hover:text-success-400 active:text-success-500 hover:scale-105 active:scale-110 transform font-sans absolute top-2 right-2">
    <Icon src={Clipboard} class="w-4"/>
</button>
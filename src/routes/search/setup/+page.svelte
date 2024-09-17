<script lang="ts">
    import { PUBLIC_GOOGLEMAPS_API_KEY } from '$env/static/public';
    import { onMount } from 'svelte';
    import { Loader as GoogleLoader } from '@googlemaps/js-api-loader';
    import Geolocation from 'svelte-geolocation';

    import { Button } from '$lib/components/ui/button';
    import { Label } from '$lib/components/ui/label/index.js';
    import { superForm } from 'sveltekit-superforms';

    let Geocoder: any;

    const { data } = $props();
    const { form } = superForm(data.form);

    const googleLoader = new GoogleLoader({
        apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
    });

    onMount(async () => {
        const pkg = await googleLoader.importLibrary('geocoding');
        Geocoder = new pkg.Geocoder();
    });

    async function processPositionUpdate(
        position: Partial<GeolocationPosition> | undefined,
    ) {
        if (!position?.coords) return;

        const { results } = await Geocoder.geocode({
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
        });

        let cityResult = results.find((result: any) =>
            result.types.includes('locality'),
        );

        if (cityResult) {
            $form.lat = cityResult.geometry.location.lat();
            $form.lng = cityResult.geometry.location.lng();
            $form.displayName = cityResult.formatted_address;
            $form.placeId = cityResult.place_id;
        }
    }
</script>

<Geolocation getPosition on:position={(e) => processPositionUpdate(e.detail)} />

<form method="post" class="space-y-6">
    <input
        type="hidden"
        hidden={true}
        name="placeId"
        bind:value={$form.placeId}
    />
    <input
        type="hidden"
        hidden={true}
        name="displayName"
        bind:value={$form.displayName}
    />
    <input type="hidden" hidden={true} name="lat" bind:value={$form.lat} />
    <input type="hidden" hidden={true} name="lng" bind:value={$form.lng} />

    <p>Looking up your location!</p>
    <div class="">
        <Label>Location</Label>

        <div class="flex flex-row justify-between">
            {#if $form.displayName}
                <p>{$form.displayName}</p>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <!-- <a href="" class=" text-blue-700">(change)</a> -->
            {:else}
                <p>Fetching location...</p>
            {/if}
        </div>
    </div>

    <Button type="submit">Find Something to Eat!</Button>
</form>

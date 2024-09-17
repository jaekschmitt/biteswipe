<script lang="ts">
    import { CardSwiper } from '$lib/components/CardSwiper';
    
    let data = (index: number) => {
        return {
            title: `Card ${index}`,
            description: `Description for card ${index}`,
        }
    }

</script>

<div class="h-screen w-screen">
    <CardSwiper cardData={data} />
</div>




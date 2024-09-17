<script>
    import '../app.css';

    const { children } = $props();
</script>

<div class="h-screen w-screen">    
        {@render children()}    
</div>
<script lang="ts">
	import { goto } from '$app/navigation';
  import '$lib/style.css';
  try {
    goto('/navbar/accueil');
  } catch (e) {
    console.log(e);
  }
</script>
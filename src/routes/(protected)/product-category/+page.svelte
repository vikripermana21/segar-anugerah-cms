<script lang="ts">
	import api from '@/http/axios.js';

	const res = api.get('/product-category');
	console.log(res);
</script>

<div>This is product category</div>

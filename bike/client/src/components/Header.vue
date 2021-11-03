<template>
  <div>
    <front-header v-if="navsel === 'front'" />
    
  </div>
</template>
<script>
import FrontHeader from "@/components/FrontHeader.vue";

export default {
  props: ["navsel"],
  components: {
    FrontHeader,
   
  },
};
</script>
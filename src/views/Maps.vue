<template>
    <div>
        <child :message="message"></child>
    </div>
</template>
<script>
import child from '@/components/core/Child.vue'
export default {
    components: {child},
    data() {
        return {
            message: 'Hello Vue!!'
        }
    }
}
</script>
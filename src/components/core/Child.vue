<template>
    <div>
        <p>{{ message }}</p>
    </div>
</template>
<script>
export default {
  props: {
    message: String
  },
    // created: () => {
    //   console.log(this.message)
    // }
}
</script>
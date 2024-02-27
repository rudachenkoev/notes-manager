<script>
export default {
  name: 'Button',
  props: {
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
    variant: {
      type: String,
      default: 'elevated',
      validator: value => ['elevated', 'outlined', 'flat'].includes(value)
    }
  }
}
</script>

<template>
 <button :class="['custom-button', variant, icon && 'icon']">
   <i v-if="icon" :class="icon"></i>
   <template v-else>{{ label }}</template>
 </button>
</template>

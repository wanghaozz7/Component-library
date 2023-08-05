<template>
  <component :is="'switch-' + type" @change="handleChange" :defaulfValue="defaultValue" />
</template>

<script setup name="Switch">
const emits = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  type: {
    type: String,
    default: 'dog'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'mini'
  }
})

const handleChange = e => {
  emits('update:modelValue', e)
  emits('change', e)
}

</script>


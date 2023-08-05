<template>
  <component :is="'switch-' + type" @change="handleChange" :defaulfValue="defaultValue" :width="width" :height="height" />
</template>

<script setup name="Switch">
const emits = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  type: {
    type: String,
    default: 'normal'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 60
  },
  height: {
    type: Number,
    default: 30
  }
})

const handleChange = e => {
  emits('update:modelValue', e)
  emits('change', e)
}

</script>


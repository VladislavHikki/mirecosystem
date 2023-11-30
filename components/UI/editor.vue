<template>
  <div>
    <template v-if="loading">
      <ProgressSpinner />
    </template>
    <template v-else>
      <ckeditor :editor="ClassicEditor" :config="editorConfig" v-model="editorHtml"></ckeditor>
    </template>
  </div>
</template>
<script setup>
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import url from '@/store/config';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const editorConfig = ref({
  language: 'ru',
  link: {
    addTargetToExternalLinks: true,
  },
  mediaEmbed: {
    previewsInData: true,
  },
  image: {
    insert: {
      type: "inline",
    }
  },

  ckfinder: {
    uploadUrl: url,
  }
});



let loading = ref(true);
onMounted(() => {
  if (process.client) loading.value = false;
});

const editorHtml = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

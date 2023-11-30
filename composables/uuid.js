import { uuid } from 'vue-uuid';

export default function () {
  const str = '2geza-' + uuid.v4();
  return str;
}

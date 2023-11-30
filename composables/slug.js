import slugify from 'slugify';

export default function slug(value) {
    return slugify(value, {
        lower: true,
        strict: true,
    });
}
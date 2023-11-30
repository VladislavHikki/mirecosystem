<template>
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="none" />
    <path
      d="M2.71129 25.4133C2.71129 23.7565 4.05443 22.4133 5.71129 22.4133H35.7606C37.4174 22.4133 38.7606 23.7565 38.7606 25.4133V33.9013C38.7606 36.1104 36.9697 37.9013 34.7606 37.9013H6.71129C4.50215 37.9013 2.71129 36.1104 2.71129 33.9013V25.4133Z"
      :fill="color"
    />
    <path d="M7.6073 15.553L12.7008 15.4054L6.68663 26.7096L2.71129 24.5946L7.6073 15.553Z" :fill="color" />
    <path d="M33.8646 15.553L28.771 15.4054L34.7852 26.7096L38.7606 24.5946L33.8646 15.553Z" :fill="color" />
    <circle cx="29.6301" cy="31.2707" r="2.41722" fill="white" />
    <rect x="18.8668" y="2.0414" width="3.52199" height="11.9206" :fill="color" />
    <path d="M20.7359 17.1453L15.6035 10.2876L25.8684 10.2876L20.7359 17.1453Z" :fill="color" />
  </svg>
</template>

<script>
export default {
  props: {
    color: String,
  },
};
</script>

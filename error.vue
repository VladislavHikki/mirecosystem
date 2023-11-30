<template>
    <div class="error">
        <div class="logo">
            <IconsLogo style="height: 150px; width: 150px;" />
            МИР
            <div class="error_status">
                Ошибка {{  error?.statusCode }}
            </div>
            <div v-if="error?.statusCode != 404"  class="data">
                {{ error.message }}
            </div>
        </div>
        <NuxtLink to="/">
            <Button label="На главную" />
        </NuxtLink>
    </div>
</template>

<script setup>
    const error = useError();
</script>

<style lang="scss" scoped>
    .error {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;
        height: 100dvh;

        .logo {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            font-size: 32px;
            color: black;
            font-weight: bold;
        }
    }
</style>
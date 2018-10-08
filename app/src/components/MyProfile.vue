<template>
    <div class="column is-4">
        <div class="card">
            <header class="card-header">
                <span class="card-header-title">
                    Mijn profiel
                </span>
            </header>
            <div class="card-content">
                <ul class="userprofile-list">
                    <li class="has-text-weight-bold">{{ user.name }}</li>
                    <li>Email: {{ user.email }}</li>
                    <li>Rol: {{ user.role }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-profile',
    props: ['user'],
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
.userprofile-list {
    list-style: none;
    padding: 0;

    li {
        padding: 10px 0;
        border-bottom: 1px solid whitesmoke;
        
        &:last-child {
            border-bottom: 0;
            padding: 10px 0 0 0;
        }
    }
}
</style>
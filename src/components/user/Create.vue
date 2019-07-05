<template>
    <div class="container mt-5">
        <div class="col-12 text-right">
            <router-link class="nav-link" to="/users"><i class="fas fa-arrow-circle-left fa-2x"></i></router-link>
        </div>
        <form id="create-user" @submit.prevent="save" v-if="Object.keys(users).length > 0 || !loading" v-bind:class="loading?'preloader':''">
            <img v-if="loading" src="/images/preloader.gif">
            <div class="form-group text-left">
                <label for="name">Name</label>
                <input type="name" class="form-control" v-model="user.name" placeholder="Name">
            </div>
            <div class="form-group text-left">
                <label for="last_name">Last</label>
                <input type="last_name" class="form-control" v-model="user.last_name" placeholder="Last">
            </div>
            <div class="form-group text-left">
                <label for="email">Email address</label>
                <input type="email" class="form-control" v-model="user.email" placeholder="E-mail">
            </div>
            <button type="submit" class="btn btn-primary" v-bind:disable="loading">{{ user.id?'Edit':'Save' }}</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'User',
    data: () => ({
        id: null
    }),
    computed: {
        users() {
            return this.$store.getters['user/users'];
        },
        user: {
            get() {
                return this.id?this.users.filter(user => user.id == this.id)[0]:{}
            },
            set() {}
        },
        loading() {
            return this.$store.getters['loading']
        }
    },
    methods: {
        save() {
            this.$store.dispatch('user/save', this.user)
            .then(() => {
                this.$notify({
                    title: 'Success',
                    message: this.user.id?'User edit':'User add',
                    type: 'success'
                })
            })
            .catch(() => {
                this.$notify({
                    title: 'Warning',
                    message: 'Error adding user',
                    type: 'warning'
                })
            })
        }
    },
    created() {
        this.users.length==0?this.$store.dispatch('user/all'):'';
        this.id = this.$router.currentRoute.params.id?this.$router.currentRoute.params.id:null;
    }
}
</script>
<style>
    .preloader {
        opacity: 0.5;
        position: relative;
    }

    .preloader img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>

